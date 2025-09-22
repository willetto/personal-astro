import { createClient } from "@sanity/client";
import type { Section, SiteHead, NavItem, PageDetail, PageListItem } from ".";
import {
  PAGE_BY_SLUG_QUERY,
  HOME_PAGE_WITH_SECTIONS_QUERY,
  FIRST_PAGE_WITH_SECTIONS_QUERY,
  PAGE_LIST_QUERY,
  SITE_SETTINGS_HEAD_QUERY,
  SITE_SETTINGS_FAVICON_QUERY,
  SITE_SETTINGS_NAVIGATION_QUERY,
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
    // console.debug(`[Sanity] ${msg}`, detail ?? "");
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

export async function fetchAllPages(): Promise<PageListItem[]> {
  try {
    debugLog("Attempt to fetch all pages", { projectId, dataset });
    const result = await sanityClient.fetch<PageListItem[]>(PAGE_LIST_QUERY);
    debugLog("Found all pages", { count: result.length });
    return Array.isArray(result) ? result : [];
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("fetchAllPages failed", { message });
    return [];
  }
}

export async function fetchPageBySlug(slug: string): Promise<PageDetail | null> {
  try {
    debugLog("Attempt to fetch page by slug", { slug, projectId, dataset });
    const page = await sanityClient.fetch<PageDetail | null>(
      PAGE_BY_SLUG_QUERY,
      { slug }
    );
    if (page?.sections && Array.isArray(page.sections)) {
      debugLog("Found page by slug with sections", {
        slug,
        count: page.sections.length,
      });
      return page;
    }
    debugLog("No page found for slug", { slug });
    return null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("fetchPageBySlug failed", { message });
    return null;
  }
}

export async function fetchSiteHead(): Promise<SiteHead | null> {
  try {
    debugLog("Fetch site settings (title + favicon)");
    const result = await sanityClient.fetch<SiteHead | null>(
      SITE_SETTINGS_HEAD_QUERY
    );
    // debugLog("Site settings fetched", result);
    return result ?? null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("fetchSiteHead failed", { message });
    return null;
  }
}

export type SiteFavicon = {
  favicon?: {
    asset?: { _ref?: string };
    assetUrl?: string;
    assetMimeType?: string;
    assetExt?: string;
    alt?: string;
  };
};

export async function fetchSiteFavicon(): Promise<SiteFavicon | null> {
  try {
    const result = await sanityClient.fetch<SiteFavicon | null>(
      SITE_SETTINGS_FAVICON_QUERY
    );
    return result ?? null;
  } catch {
    return null;
  }
}

export async function fetchSiteNavigation(): Promise<NavItem[]> {
  try {
    const result = await sanityClient.fetch<
      | {
          navigation?: Array<{
            label?: string;
            style?: "primary" | "secondary";
            page?: { title?: string; slug?: string };
          }>;
        }
      | null
    >(SITE_SETTINGS_NAVIGATION_QUERY);

    const items: NavItem[] = (result?.navigation ?? [])
      .map((entry) => {
        const slug = entry?.page?.slug ?? "";
        const isHome = ["", "home", "index", "root"].includes(slug);
        const href = isHome ? "/" : `/${slug}`;
        const label = entry?.label || entry?.page?.title || "Untitled";
        const style: "primary" | "secondary" =
          entry?.style === "primary" ? "primary" : "secondary";
        return { label, href, style };
      })
      .filter((i) => Boolean(i.href));

    return items;
  } catch {
    return [];
  }
}
