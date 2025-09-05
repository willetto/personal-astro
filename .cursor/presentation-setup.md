### Sanity Presentation Tool + Astro: Step-by-step Plan (SSR Preview + Static Site)

This plan enables Sanity Presentation (Visual Editing) for this Astro project while keeping the production site static. We will:

- Add the Sanity Astro integration to power Visual Editing overlays
- Configure a secure SSR-only preview domain for Presentation
- Keep the main site fully static
- Add a document location resolver for deep-linking from Studio

References:

- Sanity guide: [Build your blog with Astro and Sanity](https://www.sanity.io/guides/sanity-astro-blog#e6fc3f4816ca)
- Plugin docs: [sanity-astro: enabling visual editing](https://www.sanity.io/plugins/sanity-astro#enabling-visual-editing)
- Visual Editing: [Configuring the Presentation tool](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool)
- Visual Editing: [Fetching content for Visual Editing](https://www.sanity.io/docs/visual-editing/fetching-content-for-visual-editing)
- Tutorial: [Sanity + Astro Visual Editor](https://islandwebdesign.net/blog/sanity-and-astro-visual-editor-tutorial/)

---

## 0) Goals and architecture

- Main site: static build and deploy (no drafts, no overlays)
- Preview site: SSR runtime for Presentation overlays (drafts + stega), separate URL
  - Local: static at `http://localhost:4321`, SSR preview also at `http://localhost:4321` during `astro dev` (dev runs SSR), Studio runs on its own port
  - Prod: two URLs, e.g. `https://www.example.com` (static) and `https://preview.example.com` (SSR)

Key toggles:

- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` = `true` on SSR preview only; `false` for static site
- `SANITY_API_READ_TOKEN` required on SSR preview to access drafts and enable stega

---

## 1) Frontend: install dependencies

Run in `frontend/`:

```bash
pnpm add @sanity/astro @astrojs/react
```

We need the Sanity-Astro integration for Visual Editing and React to embed future Studio (optional) and for the VisualEditing component support.

---

## 2) Frontend: update `astro.config.mjs` to add Sanity integration

Edit `frontend/astro.config.mjs`:

1. Add imports

```diff
 import { defineConfig, envField } from "astro/config";
 import tailwindcss from "@tailwindcss/vite";
+import sanity from "@sanity/astro";
+import react from "@astrojs/react";
```

2. Add the Sanity and React integrations. Note: Astro cannot read `.env` into this config at runtime for the integration options, so paste the values from your Sanity project (you can also inline them from deployment env if your platform injects at build). Replace the placeholders below.

```diff
 export default defineConfig({
   devToolbar: {
     enabled: true,
   },
   prefetch: true,
   trailingSlash: "never",
   vite: {
     plugins: [tailwindcss()],
     css: {
       devSourcemap: true,
     },
   },
   markdown: {
     drafts: true,
     shikiConfig: {
       theme: "css-variables",
     },
   },
   shikiConfig: {
     wrap: true,
     skipInline: false,
     drafts: true,
   },
   site: SITE_URL || "http://localhost:4321",
   image: {
     domains: ["cdn.sanity.io"],
     remotePatterns: [{ protocol: "https" }],
   },
-  integrations: [sitemap(), mdx()],
+  integrations: [
+    sitemap(),
+    mdx(),
+    sanity({
+      projectId: "<your-project-id>",
+      dataset: "<your-dataset>",
+      useCdn: false,
+      apiVersion: "2025-01-28"
+      // studioBasePath: "/studio" // optional: only if you want to embed Studio into the frontend
+    }),
+    react(),
+  ],
   env: {
     schema: {
       SITE_URL: envField.string({
         context: "client",
         access: "public",
         default: "http://localhost:4321",
       }),
       SANITY_STUDIO_PROJECT_ID: envField.string({
         context: "client",
         access: "public",
       }),
       SANITY_STUDIO_DATASET: envField.string({
         context: "client",
         access: "public",
         default: "production",
       }),
     },
   },
 });
```

Note: Keep existing `SANITY_STUDIO_*` env schema for compatibility with current code. The Sanity integration above uses pasted IDs for reliability in config. See: [sanity-astro docs](https://www.sanity.io/plugins/sanity-astro#enabling-visual-editing) and [guide](https://www.sanity.io/guides/sanity-astro-blog#e6fc3f4816ca).

---

## 3) Frontend: add Visual Editing env vars

Create or update `frontend/.env` and your prod environment:

```bash
# Always present
PUBLIC_SANITY_PROJECT_ID=<your-project-id>
PUBLIC_SANITY_DATASET=<your-dataset>

# SSR preview ONLY
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true
SANITY_API_READ_TOKEN=<viewer-or-read-token-with-draft-read>

# Static site ONLY
# PUBLIC_SANITY_VISUAL_EDITING_ENABLED=false
# SANITY_API_READ_TOKEN unset
```

- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` must be `true` only where SSR is active
- `SANITY_API_READ_TOKEN` is required to fetch drafts and enable Stega

Docs: [Fetching content for Visual Editing](https://www.sanity.io/docs/visual-editing/fetching-content-for-visual-editing)

---

## 4) Frontend: add a Visual Editing-aware fetch helper

Create `frontend/src/data/sanity/loadQuery.ts`:

```ts
import type { QueryParams } from "@sanity/client";
import { sanityClient } from "sanity:client";

const visualEditingEnabled =
  import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}) {
  if (visualEditingEnabled && !token) {
    throw new Error(
      "SANITY_API_READ_TOKEN is required when visual editing is enabled"
    );
  }

  const perspective = visualEditingEnabled ? "previewDrafts" : "published";

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
      stega: visualEditingEnabled,
      ...(visualEditingEnabled ? { token } : {}),
    }
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}
```

Update any existing Sanity fetches (e.g. `frontend/src/data/sanity/fetch.ts`) to use `loadQuery` when on the preview site so drafts are visible and Stega encoding is present. For the static site, you can keep current published-only fetches via `@sanity/client`.

---

## 5) Frontend: include VisualEditing overlay only when enabled

Add a light wrapper component so overlays render only on preview:

Create `frontend/src/components/VisualEditingWrapper.astro`:

```astro
---
import { VisualEditing } from "sanity:visual-editing";
const enabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
---
{enabled && <VisualEditing />}
```

Then include this near the end of your main layout(s), e.g. `frontend/src/layouts/BaseLayout.astro`:

```diff
 ---
 // existing imports
+import VisualEditingWrapper from "@/components/VisualEditingWrapper.astro";
 ---
 <html>
   <body>
     <!-- your page content -->
+    <VisualEditingWrapper />
   </body>
 </html>
```

This ensures overlays only appear on the SSR preview where the env flag is set.

Docs: [sanity-astro Visual Editing](https://www.sanity.io/plugins/sanity-astro#enabling-visual-editing)

---

## 6) Studio: add Presentation tool and Document Locations

Install Presentation tool (already available in `sanity` v3). Edit `studio/sanity.config.ts`:

```diff
 import { defineConfig } from "sanity";
 import { structureTool } from "sanity/structure";
 import { visionTool } from "@sanity/vision";
 import { schemaTypes } from "./schema-types";
 import { media } from "sanity-plugin-media";
+import { presentationTool } from "sanity/presentation";

 const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
 const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

 export default defineConfig({
   name: "default",
   title: "Studio",
   projectId,
   dataset,
   plugins: [
     structureTool({
       structure: (S) =>
         S.list()
           .title("Content")
           .items(
             S.documentTypeListItems().filter(
               (listItem) => listItem.getId() !== "media.tag"
             )
           ),
     }),
     visionTool(),
     media(),
+    presentationTool({
+      // Local dev: astro dev serves preview on http://localhost:4321
+      // Prod: point to your SSR preview domain (e.g. https://preview.example.com)
+      previewUrl: typeof location === "undefined" ? undefined : location.origin,
+      // If your Studio is on a different host in prod, set previewUrl to that SSR frontend origin explicitly
+      // previewUrl: "https://preview.example.com",
+    }),
   ],
   schema: {
     types: schemaTypes,
   },
 });
```

Create a simple Document Locations resolver to link content to routes. For this project, many Sanity documents correspond to homepage sections, so we’ll start by mapping them to `/`:

Create `studio/src/resolve.ts`:

```ts
import { defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    hero1: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    hero2: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    feature1: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    feature2: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    feature3: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    feature4: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    feature5: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    feature6: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
    feature7: defineLocations({
      select: { _id: "_id" },
      resolve: () => ({ locations: [{ title: "Homepage", href: "/" }] }),
    }),
  },
};
```

Wire it into `studio/sanity.config.ts`:

```diff
 import { media } from "sanity-plugin-media";
 import { presentationTool } from "sanity/presentation";
+import { resolve } from "./src/resolve";

 // ...
     media(),
-    presentationTool({
-      previewUrl: typeof location === "undefined" ? undefined : location.origin,
-    }),
+    presentationTool({
+      previewUrl: typeof location === "undefined" ? undefined : location.origin,
+      resolve,
+    }),
```

Docs: [Configuring Presentation tool](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool)

---

## 7) Sanity CORS: allow preview origin

In Sanity Manage, add CORS origins for:

- Local: `http://localhost:4321`
- Prod Preview: `https://preview.example.com`

Allow credentials on preview if you use tokens from the browser (the overlay uses stega, but browser requests still need to be permitted).

---

## 8) SSR vs Static outputs (two URLs)

Astro dev is SSR, so locally Presentation works by default when the env flag is on. For production, deploy two variants of the frontend:

- Static site (main): default Astro static build
- SSR preview (Presentation): Astro server output + Node adapter

Install Node adapter in `frontend/`:

```bash
pnpm add -D @astrojs/node
```

Update `frontend/astro.config.mjs` to support conditional output and adapter (preview only):

```diff
 import { defineConfig, envField } from "astro/config";
 import tailwindcss from "@tailwindcss/vite";
 import sanity from "@sanity/astro";
 import react from "@astrojs/react";
+import node from "@astrojs/node";

 const SITE_URL = process.env.SITE_URL;

 export default defineConfig({
+  output: process.env.ASTRO_PREVIEW_SSR === "true" ? "server" : "static",
+  adapter: process.env.ASTRO_PREVIEW_SSR === "true" ? node({ mode: "standalone" }) : undefined,
   // ... rest unchanged
 });
```

Build commands:

```bash
# Static site (no overlays)
pnpm --filter @lexington/brightlight build

# SSR preview build (enable overlays)
ASTRO_PREVIEW_SSR=true PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true pnpm --filter @lexington/brightlight build
```

Deploy the static build to `www.example.com` and the SSR build to `preview.example.com`.

---

## 9) Fetch usage in pages

Where you currently fetch with `@sanity/client` (e.g. `frontend/src/data/sanity/fetch.ts`), swap to `loadQuery` when on preview to return draft content and source maps. For example:

```ts
import { loadQuery } from "@/data/sanity/loadQuery";
import { HERO_FIELDS } from "@/data/sanity/groq";

export async function getHomepageHero() {
  const query = `*[_type in ["hero1","hero2"]][0]{ ${HERO_FIELDS} }`;
  const { data } = await loadQuery({ query });
  return data;
}
```

Keep your current published-only fetches for the static site, or gate usage by `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`.

---

## 10) Local Development

1. Start Studio:

```bash
cd studio && pnpm dev
```

2. Start Frontend (SSR dev):

```bash
cd frontend && pnpm dev
```

3. Visit Studio Presentation at `/presentation` and set its address bar to a route in your site (e.g., `/`). The preview iframes your frontend `http://localhost:4321` and adds overlays.

Troubleshooting checklist:

- Presentation panel shows overlays only if `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`
- Ensure `SANITY_API_READ_TOKEN` is set in frontend env during preview
- Ensure CORS contains `http://localhost:4321`

---

## 11) Production Deployment

- Deploy static site as usual (no token, `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=false`)
- Deploy SSR preview separately with:
  - `ASTRO_PREVIEW_SSR=true`
  - `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`
  - `SANITY_API_READ_TOKEN` set
  - Point Studio Presentation `previewUrl` at the SSR preview origin

Security:

- Use a dedicated read token with minimal scopes for preview
- Consider IP allowlisting or auth on the SSR preview domain

---

## 12) Why SSR is required for Presentation

Visual Editing overlays rely on draft-aware fetches and Stega encoding. These require runtime configuration (token, `previewDrafts` perspective) that a purely static build can’t provide. Hence the separate SSR preview domain while keeping production static. Docs: [Visual Editing fetching](https://www.sanity.io/docs/visual-editing/fetching-content-for-visual-editing).

---

## Appendix: Minimal diff checklist

- frontend
  - add deps: `@sanity/astro`, `@astrojs/react`, `@astrojs/node` (dev)
  - config: add `sanity()` and `react()` integrations; conditional `output` + `adapter` for preview
  - env: add `PUBLIC_SANITY_*`, `SANITY_API_READ_TOKEN`
  - code: add `src/data/sanity/loadQuery.ts` and `src/components/VisualEditingWrapper.astro`; include wrapper in layout(s)
- studio
  - config: add `presentationTool({ previewUrl, resolve })`
  - code: add `src/resolve.ts` with locations mapping
  - CORS: add preview origins
