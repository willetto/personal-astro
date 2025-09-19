# Sanity + Astro: Dynamic Slug Routing Guide

This guide shows how to connect a Sanity document type to Astro dynamic routes, supporting both prefixed routes (e.g., `/posts/[...slug].astro`) and root-level routes (e.g., `/[...slug].astro`) where each Sanity document renders directly at the domain root.

You can adapt this to any document type. Replace bracketed placeholders with your own values: `[DOC_TYPE]`, `[ROUTE_PREFIX]`, `[PROJECT_ROOT]`.

## References

- Astro routing: [getStaticPaths() docs](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
- Sanity + Astro integration: [Sanity guide](https://www.sanity.io/guides/sanity-astro-blog#7e50d8602669)

---

## Prerequisites

- An Astro project with a front-end workspace at `[FRONTEND_ROOT]` (e.g., `frontend/`)
- A Sanity Studio with schemas at `[STUDIO_ROOT]` (e.g., `studio/`)
- Environment variables for Sanity: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`

---

## Approach 1: Root-Level Dynamic Routing

This approach renders Sanity pages directly at the domain root (e.g., `/about`, `/contact`) while keeping a static home page.

### 1) Define a Sanity schema with sections

Create `[STUDIO_ROOT]/schema-types/[DOC_TYPE].ts`:

```ts
import { defineField, defineType } from "sanity";

export const [DOC_TYPE] = defineType({
  name: "[DOC_TYPE]",
  title: "[DOC_TYPE_TITLE]",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "hero1" },
        { type: "hero2" },
        { type: "feature1" },
        { type: "caseStudyListings" },
        { type: "contactForm" },
        // Add your section types here
      ],
      description: "Structured sections that render on the frontend.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
```

**Slug best practice:** Store plain segments like `about` or `contact`. Do NOT include leading slashes or prefixes.

### 2) Configure Sanity client and types

In `[FRONTEND_ROOT]/src/data/sanity/index.ts`, add page types:

```ts
export type PageListItem = {
  _id: string;
  title: string;
  slug: string;
};

export type PageDetail = {
  _id: string;
  title: string;
  slug: string;
  sections?: Section[];
};
```

### 3) Add GROQ queries

In `[FRONTEND_ROOT]/src/data/sanity/groq.ts`:

```ts
export const PAGE_LIST_QUERY = `
  *[_type == "[DOC_TYPE]"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const PAGE_BY_SLUG_QUERY = `
  *[_type == "[DOC_TYPE]" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    sections[] {
      // Include all your section fields here
      _type,
      // ... other section fields
    }
  }
`;
```

### 4) Add fetch functions

In `[FRONTEND_ROOT]/src/data/sanity/fetch.ts`:

```ts
import { PAGE_LIST_QUERY, PAGE_BY_SLUG_QUERY } from "./groq";
import type { PageListItem, PageDetail } from ".";

export async function fetchAllPages(): Promise<PageListItem[]> {
  try {
    const result = await sanityClient.fetch<PageListItem[]>(PAGE_LIST_QUERY);
    return Array.isArray(result) ? result : [];
  } catch (err) {
    console.error("fetchAllPages failed", err);
    return [];
  }
}

export async function fetchPageBySlug(slug: string): Promise<PageDetail | null> {
  try {
    const page = await sanityClient.fetch<PageDetail | null>(
      PAGE_BY_SLUG_QUERY,
      { slug }
    );
    return page ?? null;
  } catch (err) {
    console.error("fetchPageBySlug failed", err);
    return null;
  }
}
```

### 5) Create root-level dynamic route

Create `[FRONTEND_ROOT]/src/pages/[...slug].astro`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { fetchAllPages, fetchPageBySlug } from "@/data/sanity/fetch";
import type { PageDetail, Section } from "@/data/sanity";

// Import your section components
import Hero1 from "@/components/headers/Hero1.astro";
import Hero2 from "@/components/headers/Hero2.astro";
import Feature1 from "@/components/features/Feature1.astro";
// ... other imports

export async function getStaticPaths() {
  const pages = await fetchAllPages();

  // Exclude home slugs so index.astro handles "/"
  const HOME_SLUGS = new Set(["", "/", "home", "index", "root"]);

  const paths = pages
    .filter((p) => {
      const s = String(p?.slug ?? "");
      return !HOME_SLUGS.has(s);
    })
    .map((p) => ({ params: { slug: String(p.slug) } }));

  return paths;
}

const { slug } = Astro.params;
const pageSlug = String(slug);
const page: PageDetail | null = await fetchPageBySlug(pageSlug);

if (!page) {
  return Astro.redirect("/404");
}
---

<BaseLayout>
  {page.sections && page.sections.length > 0 ? (
    <>
      {page.sections.map((section: Section) => {
        // Explicitly render each section type to avoid hydration issues
        if (section._type === "hero1") {
          return <Hero1 feature={section as import("@/data/sanity").Hero} />;
        }
        if (section._type === "hero2") {
          return <Hero2 feature={section as import("@/data/sanity").Hero} />;
        }
        if (section._type === "feature1") {
          return <Feature1 feature={section as import("@/data/sanity").Feature1Section} />;
        }
        // Add other section types...
        return null;
      })}
    </>
  ) : (
    <div class="wrapper py-16 text-center">
      <h1 class="text-4xl font-bold">No content found for this page.</h1>
      <p class="mt-4 text-lg">Please add sections in Sanity Studio.</p>
    </div>
  )}
</BaseLayout>
```

### 6) Keep static home page

Your existing `[FRONTEND_ROOT]/src/pages/index.astro` remains unchanged and handles the home route (`/`).

---

## Approach 2: Prefixed Dynamic Routing

This approach renders pages under a prefix (e.g., `/posts/my-post`).

### Create prefixed dynamic route

Create `[FRONTEND_ROOT]/src/pages/[ROUTE_PREFIX]/[...slug].astro`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { fetchAll[DocTypePlural], fetch[DocType]BySlug } from "@/data/sanity/fetch";

export async function getStaticPaths() {
  const items = await fetchAll[DocTypePlural]();
  return items.map((item) => ({ params: { slug: String(item.slug) } }));
}

const params = Astro.params;
const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug || "";
const doc = await fetch[DocType]BySlug(slug);
---

<BaseLayout>
  {doc ? (
    <article>
      <h1>{doc.title}</h1>
      <!-- Render your content here -->
    </article>
  ) : (
    <div>Not found</div>
  )}
</BaseLayout>
```

---

## Handling Hydrated Components (Svelte/React/Vue)

**⚠️ Critical:** Avoid dynamic component hydration with variables, as it causes `NoMatchingImport` errors.

### ❌ Don't do this:
```astro
{sections.map((section) => {
  const Component = sectionComponents[section._type];
  return <Component client:load />; // This will fail!
})}
```

### ✅ Do this instead:
```astro
{sections.map((section) => {
  // Explicit handling for hydrated components
  if (section._type === "heroSvelte") {
    return (
      <Wrapper variant="carousel">
        <HeroSvelte client:load />
      </Wrapper>
    );
  }
  if (section._type === "skillsReact") {
    return <SkillsReact client:load />;
  }
  
  // Static Astro components can use dynamic mapping
  const Component = astroComponents[section._type];
  return Component ? <Component feature={section} /> : null;
})}
```

---

## Common Issues & Solutions

### NoMatchingImport Error
- **Cause:** Using dynamic component variables with client directives
- **Solution:** Render hydrated components explicitly, not through variables

### Invalid getStaticPaths Parameter
- **Symptom:** `Expected string, received object`
- **Solution:** Always return strings: `{ params: { slug: String(item.slug) } }`

### 404 on Valid Slugs
- **Causes:**
  - Document not published in correct dataset
  - Slug contains leading slash or prefix
  - `getStaticPaths()` not returning the slug
- **Solutions:**
  - Verify document is published
  - Store plain slugs (e.g., `about`, not `/about`)
  - Debug `fetchAllPages()` output

### Home Page Conflicts
- **Issue:** Root dynamic route conflicts with `index.astro`
- **Solution:** Filter home slugs in `getStaticPaths()` as shown above

### Stale Content During Builds
- **Cause:** `useCdn: true` returns cached content
- **Solution:** Set `useCdn: false` in build environments

---

## Example: Pages with Root-Level Routing

Concrete implementation for a `page` schema with root-level routing:

### Files Structure:
```
studio/schema-types/page.ts
frontend/src/data/sanity/
├── index.ts (types)
├── groq.ts (queries)  
└── fetch.ts (functions)
frontend/src/pages/
├── index.astro (home page)
└── [...slug].astro (dynamic pages)
```

### 1. Schema (`studio/schema-types/page.ts`):
```ts
export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title", 
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "hero1" },
        { type: "feature1" },
        { type: "contactForm" },
      ],
    }),
  ],
});
```

### 2. Types (`frontend/src/data/sanity/index.ts`):
```ts
export type PageListItem = {
  _id: string;
  title: string;
  slug: string;
};

export type PageDetail = {
  _id: string;
  title: string;
  slug: string;
  sections?: Section[];
};
```

### 3. Queries (`frontend/src/data/sanity/groq.ts`):
```ts
export const PAGE_LIST_QUERY = `
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const PAGE_BY_SLUG_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    sections[] {
      _type,
      // Include all section fields
    }
  }
`;
```

### 4. Functions (`frontend/src/data/sanity/fetch.ts`):
```ts
export async function fetchAllPages(): Promise<PageListItem[]> {
  const result = await sanityClient.fetch<PageListItem[]>(PAGE_LIST_QUERY);
  return Array.isArray(result) ? result : [];
}

export async function fetchPageBySlug(slug: string): Promise<PageDetail | null> {
  const result = await sanityClient.fetch<PageDetail | null>(
    PAGE_BY_SLUG_QUERY,
    { slug }
  );
  return result ?? null;
}
```

### 5. Dynamic Route (`frontend/src/pages/[...slug].astro`):
```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { fetchAllPages, fetchPageBySlug } from "@/data/sanity/fetch";
import Hero1 from "@/components/headers/Hero1.astro";
import Feature1 from "@/components/features/Feature1.astro";
import ContactForm from "@/components/forms/ContactForm.astro";

export async function getStaticPaths() {
  const pages = await fetchAllPages();
  const HOME_SLUGS = new Set(["", "/", "home", "index", "root"]);
  
  return pages
    .filter((p) => !HOME_SLUGS.has(String(p?.slug ?? "")))
    .map((p) => ({ params: { slug: String(p.slug) } }));
}

const { slug } = Astro.params;
const page = await fetchPageBySlug(String(slug));

if (!page) {
  return Astro.redirect("/404");
}
---

<BaseLayout>
  {page.sections?.map((section) => {
    if (section._type === "hero1") {
      return <Hero1 feature={section} />;
    }
    if (section._type === "feature1") {
      return <Feature1 feature={section} />;
    }
    if (section._type === "contactForm") {
      return <ContactForm feature={section} />;
    }
    return null;
  })}
</BaseLayout>
```

---

## Quick Checklist

- [ ] Slug in Sanity is a plain segment (e.g., `about`)
- [ ] `getStaticPaths()` returns `{ params: { slug: String(item.slug) } }`
- [ ] Environment variables set: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`
- [ ] Queries return expected items before build
- [ ] Hydrated components rendered explicitly, not through variables
- [ ] Home slugs filtered out for root-level routing
- [ ] Documents published in correct dataset

---

## Advanced: Nested Paths

For nested paths like `/category/subcategory/page`, store the full path in the slug field:

```ts
// In Sanity: slug.current = "category/subcategory/page"
// Renders at: /category/subcategory/page
```

The `[...slug].astro` route automatically handles nested segments.
