import { createClient } from "@sanity/client";
import type { Section, SiteHead } from ".";
import {
  PAGE_BY_SLUG_QUERY,
  HOME_PAGE_WITH_SECTIONS_QUERY,
  FIRST_PAGE_WITH_SECTIONS_QUERY,
  PAGE_LIST_QUERY,
  SITE_SETTINGS_HEAD_QUERY,
} from "./groq";

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = "2025-02-19";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Minimal, safe logs (console is fine in Astro runtime)
const debugLog: (message: string, detail?: unknown) => void = (msg, detail) => {
  try {
    // eslint-disable-next-line no-console
    console.debug(`[Sanity] ${msg}`, detail ?? "");
  } catch {}
};
const errorLog: (message: string, detail?: unknown) => void = (msg, detail) => {
  try {
    // eslint-disable-next-line no-console
    console.error(`[Sanity] ${msg}`, detail ?? "");
  } catch {}
};

export async function fetchHomeSections(): Promise<Section[]> {
  try {
    debugLog("Attempt home page with preferred slugs", { projectId, dataset });
    const preferred = await sanityClient.fetch<{ sections?: Section[] } | null>(
      HOME_PAGE_WITH_SECTIONS_QUERY,
      { slugs: ["", "home", "index", "root"] }
    );
    if (preferred?.sections && Array.isArray(preferred.sections)) {
      debugLog("Found preferred home page with sections", {
        count: preferred.sections.length,
      });
      return preferred.sections as Section[];
    }

    debugLog("Preferred slugs not found, try first page with sections");
    const first = await sanityClient.fetch<{ sections?: Section[] } | null>(
      FIRST_PAGE_WITH_SECTIONS_QUERY
    );
    if (first?.sections && Array.isArray(first.sections)) {
      debugLog("Found first page with sections", {
        count: first.sections.length,
      });
      return first.sections as Section[];
    }

    debugLog("No page with sections found, listing pages for context");
    const pages = await sanityClient.fetch<
      { slug?: string; title?: string }[] | null
    >(PAGE_LIST_QUERY);
    debugLog("Pages present", pages);
    return [];
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("fetchHomeSections failed", { message });
    return [];
  }
}

export async function fetchSiteHead(): Promise<SiteHead | null> {
  try {
    debugLog("Fetch site settings (title + favicon)");
    const result = await sanityClient.fetch<SiteHead | null>(
      SITE_SETTINGS_HEAD_QUERY
    );
    debugLog("Site settings fetched", result);
    return result ?? null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("fetchSiteHead failed", { message });
    return null;
  }
}
