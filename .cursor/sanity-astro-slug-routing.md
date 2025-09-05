## Sanity + Astro: Dynamic Slug Routing Guide

This guide shows how to connect a Sanity document type to an Astro dynamic route (e.g., `/[ROUTE_PREFIX]/[...slug].astro`) so that each Sanity document renders at a subroute in Astro.

You can adapt this to any pair like `posts/` with a `post` schema. Replace bracketed placeholders with your own values, e.g. `[DOC_TYPE]`, `[ROUTE_PREFIX]`, `[PROJECT_ROOT]`.

References:

- Astro routing: [getStaticPaths() docs](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
- Sanity + Astro integration patterns: [Sanity guide](https://www.sanity.io/guides/sanity-astro-blog#7e50d8602669)

---

### Prerequisites

- An Astro project with a front-end workspace at `[FRONTEND_ROOT]` (e.g., `frontend/`).
- A Sanity Studio with schemas at `[STUDIO_ROOT]` (e.g., `studio/`).
- Environment variables for Sanity available to the Astro app: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`.

---

### 1) Define a Sanity schema with a slug

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
    // ... add your fields
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
```

Slug best practice:

- Store a plain, segment-only value like `rule29`.
- Do NOT include leading slashes (`/rule29`) or route prefixes (`[ROUTE_PREFIX]/rule29`). Your Astro route provides the prefix.

---

### 2) Configure the Sanity client in Astro

Create or edit `[FRONTEND_ROOT]/src/data/sanity/fetch.ts` (or `[FRONTEND_ROOT]/src/data/sanity/client.ts`):

```ts
import { createClient } from "@sanity/client";

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = "[YYYY-MM-DD]"; // e.g., "2025-08-19"

export const sanityClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
});
```

Notes:

- Consider `useCdn: false` during static builds if you rely on rebuilds to avoid stale content (see Sanity guide).
- Keep `apiVersion` current to match the API behavior you expect.

---

### 3) Write GROQ queries for list and detail by slug

Create `[FRONTEND_ROOT]/src/data/sanity/groq.ts`:

```ts
export const [DOC_TYPE_UPPER]_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current
`;

export const [DOC_TYPE_UPPER]_DETAIL_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  // include other fields you need, e.g. sections
`;

export const [DOC_TYPE_UPPER]_LIST_QUERY = `
  *[_type == "[DOC_TYPE]"] | order(title asc) {
    ${[DOC_TYPE_UPPER]_LIST_FIELDS}
  }
`;

export const [DOC_TYPE_UPPER]_BY_SLUG_QUERY = `
  *[_type == "[DOC_TYPE]" && slug.current == $slug][0] {
    ${[DOC_TYPE_UPPER]_DETAIL_FIELDS}
  }
`;
```

Then add helpers in `[FRONTEND_ROOT]/src/data/sanity/fetch.ts`:

```ts
import {
  [DOC_TYPE_UPPER]_LIST_QUERY,
  [DOC_TYPE_UPPER]_BY_SLUG_QUERY,
} from "./groq";

export type [DocType]ListItem = {
  _id: string;
  title: string;
  slug: string;
};

export type [DocType]Detail = {
  _id: string;
  title: string;
  slug: string;
  // add fields to match your detail query
};

export async function fetchAll[DocTypePlural](): Promise<[DocType]ListItem[]> {
  const result = await sanityClient.fetch<[DocType]ListItem[]>(
    [DOC_TYPE_UPPER]_LIST_QUERY
  );
  return Array.isArray(result) ? result : [];
}

export async function fetch[DocType]BySlug(
  slug: string
): Promise<[DocType]Detail | null> {
  const result = await sanityClient.fetch<[DocType]Detail>(
    [DOC_TYPE_UPPER]_BY_SLUG_QUERY,
    { slug }
  );
  return result ?? null;
}
```

---

### 4) Create the dynamic Astro route

Create `[FRONTEND_ROOT]/src/pages/[ROUTE_PREFIX]/[...slug].astro`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { fetchAll[DocTypePlural], fetch[DocType]BySlug } from "@/data/sanity/fetch";

export async function getStaticPaths() {
  const items = await fetchAll[DocTypePlural]();
  // IMPORTANT: Return a string for the param value
  return items.map((item) => ({ params: { slug: String(item.slug) } }));
}

const params = Astro.params;
const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug || "";
const doc = await fetch[DocType]BySlug(slug);
const notFound = !doc;
---

<BaseLayout>
  {notFound ? (
    <div>Not found</div>
  ) : (
    <article>
      <h1>{doc.title}</h1>
      <!-- Render your fields here -->
    </article>
  )}
</BaseLayout>
```

Why strings for `params`? Astro expects `params` values to be strings (or numbers). Passing arrays/objects will throw an error. See Astro docs.

---

### 5) Optional: a listing page at the route prefix

Create `[FRONTEND_ROOT]/src/pages/[ROUTE_PREFIX].astro` to display a list of documents:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { fetchAll[DocTypePlural] } from "@/data/sanity/fetch";
const items = await fetchAll[DocTypePlural]();
---

<BaseLayout>
  <ul>
    {items.map((i) => (
      <li><a href={`/[ROUTE_PREFIX]/${i.slug}`}>{i.title}</a></li>
    ))}
  </ul>
</BaseLayout>
```

---

### 6) Build & verify

1. Ensure some `[DOC_TYPE]` documents are published in the `[DATASET]` dataset and that their `slug.current` values are plain segments (e.g., `rule29`).
2. Run `pnpm dev` or `npm run dev` in `[FRONTEND_ROOT]` and visit `http://localhost:4321/[ROUTE_PREFIX]/[your-slug]`.
3. If using full builds, ensure the content is published before the build runs.

---

### Common pitfalls and fixes (from real errors)

- Invalid getStaticPaths route parameter:

  - Symptom: `Invalid getStaticPaths route parameter for slug. Expected undefined, a string or a number, received object (/[ROUTE_PREFIX]/[slug])`
  - Cause: Returning an array/object for `params.slug` in `getStaticPaths()`.
  - Fix: Return a string: `({ params: { slug: String(item.slug) } })`. See Astro docs.

- 404: No matching static path found:

  - Symptom: `A getStaticPaths() route pattern was matched, but no matching static path was found for requested path`.
  - Causes:
    - `getStaticPaths()` didn’t return that slug.
    - Sanity document not published or in a different dataset.
    - Slug stored with a leading slash or route prefix (`/rule29`, `[ROUTE_PREFIX]/rule29`) causing mismatches.
  - Fixes:
    - Verify `fetchAll[DocTypePlural]()` returns the slug you expect.
    - Ensure slug is plain like `rule29`.
    - Confirm env vars (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`).

- Slug formatting mismatch:

  - Symptom: Pages don’t resolve or link paths double-up (e.g., `/[ROUTE_PREFIX]/[ROUTE_PREFIX]/rule29`).
  - Cause: Storing slugs with a leading slash or route prefix.
  - Fix: Store plain segment-only slugs in Sanity (e.g., `rule29`).

- Stale content during builds:
  - Cause: `useCdn: true` may return cached content during build.
  - Fix: Set `useCdn: false` in build environments if you depend on rebuilds for freshness.

---

### Example: posts/ with `post` schema

Use these concrete values:

- `[ROUTE_PREFIX]` → `posts`
- `[DOC_TYPE]` → `post`
- `[DOC_TYPE_UPPER]` → `POST`
- `[DocType]` → `Post`
- `[DocTypePlural]` → `Posts`

Files:

1. `studio/schema-types/post.ts` – define slug field as above.

2. `frontend/src/data/sanity/groq.ts`:

```ts
export const POST_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current
`;

export const POST_DETAIL_FIELDS = `
  _id,
  title,
  "slug": slug.current
`;

export const POST_LIST_QUERY = `
  *[_type == "post"] | order(title asc) {
    ${POST_LIST_FIELDS}
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_DETAIL_FIELDS}
  }
`;
```

3. `frontend/src/data/sanity/fetch.ts`:

```ts
import { POST_LIST_QUERY, POST_BY_SLUG_QUERY } from "./groq";

export type PostListItem = { _id: string; title: string; slug: string };
export type PostDetail = { _id: string; title: string; slug: string };

export async function fetchAllPosts(): Promise<PostListItem[]> {
  const result = await sanityClient.fetch<PostListItem[]>(POST_LIST_QUERY);
  return Array.isArray(result) ? result : [];
}

export async function fetchPostBySlug(
  slug: string
): Promise<PostDetail | null> {
  const result = await sanityClient.fetch<PostDetail>(POST_BY_SLUG_QUERY, {
    slug,
  });
  return result ?? null;
}
```

4. `frontend/src/pages/posts/[...slug].astro`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { fetchAllPosts, fetchPostBySlug } from "@/data/sanity/fetch";

export async function getStaticPaths() {
  const items = await fetchAllPosts();
  return items.map((item) => ({ params: { slug: String(item.slug) } }));
}

const slugParam = Astro.params.slug;
const slug = Array.isArray(slugParam) ? slugParam.join("/") : slugParam || "";
const post = await fetchPostBySlug(slug);
---

<BaseLayout>
  {post ? (
    <article>
      <h1>{post.title}</h1>
    </article>
  ) : (
    <div>Not found</div>
  )}
</BaseLayout>
```

5. Optional list page `frontend/src/pages/posts.astro`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import { fetchAllPosts } from "@/data/sanity/fetch";
const items = await fetchAllPosts();
---

<BaseLayout>
  <ul>
    {items.map((i) => (
      <li><a href={`/posts/${i.slug}`}>{i.title}</a></li>
    ))}
  </ul>
</BaseLayout>
```

---

### Quick checklist

- [ ] Slug in Sanity is a plain segment (e.g., `my-post`).
- [ ] `getStaticPaths()` returns `{ params: { slug: String(item.slug) } }`.
- [ ] Env vars set: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`.
- [ ] Queries return expected items before running a build.
- [ ] For nested paths, you can store slugs like `category/my-post` and the route will render at `/[ROUTE_PREFIX]/category/my-post`.
