### Section Integration Guide (Sanity + Astro)

This guide describes how to convert any unprocessed Astro section into a CMS-managed section using Sanity, following the patterns already in this repository. Examples use Astro snippets and Tailwind utility classes without `@apply`. Typescript examples avoid `any`.

#### Scope

- Works for any “section” (heros, features, testimonials, CTAs, etc.)
- Focuses on: Sanity schema, GROQ fields, frontend types, Astro component, render mapping, QA
- Applies your preferences:
  - Two CTAs anywhere a CTA appears (primary and secondary)
  - Subheadings are plaintext (textarea) — not Portable Text
  - No background color pickers; support light/dark modes via Tailwind `dark:`
  - Links that open a new window must set `target="_blank"` and `rel="noopener noreferrer"`
  - If the original section is centered, add an alignment option `center | left`; otherwise default to left alignment

### Repository conventions (already implemented)

- Sanity section schemas: `studio/schema-types/sections/`
- GROQ fragments: `frontend/src/data/sanity/groq.ts`
- Section types (TS): `frontend/src/data/sanity/index.ts`
- Rendering map: `frontend/src/pages/index.astro` maps `_type` → component and passes `feature={section}`
- Component prop pattern: each section component accepts one prop `feature?: import("@/data/sanity").YourSectionType`

### High-level workflow

1. Add a Sanity schema for the section in `studio/schema-types/sections/`
2. Add a GROQ fragment for that section and include it in `ALL_SECTION_FIELDS`
3. Add a strict TS type for the section and extend the `Section` union
4. Convert/edit the Astro component to accept `feature` with safe defaults, two CTAs, and alignment
5. Register the component in the render map (`index.astro`)
6. Author content in Studio and QA on the site

---

## 1) Sanity: Section schema

Create `studio/schema-types/sections/<yourSection>.ts` using `defineType`.

Key best practices (from Sanity docs: schema types, validation, preview):

- Use a unique `name` — this becomes the `_type` used by the frontend map
- Add `validation` for required fields
- Provide sensible `initialValue`s for better authoring UX
- Provide a `preview` with a readable title and subtitle

Template:

```ts
import { defineField, defineType } from "sanity";

export const yourSection = defineType({
  name: "yourSection", // must match the frontend render key
  title: "Your Section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Text",
      type: "text", // plaintext per project preference
      rows: 3,
    }),

    // Alignment: include only if the original design is centered; default left otherwise
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "left",
    }),

    // Two CTAs (primary + secondary). Use flat fields for clarity and consistency
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Href",
      type: "string",
    }),
    defineField({
      name: "primaryCtaTarget",
      title: "Primary CTA Target",
      type: "string",
      options: { list: ["", "_blank", "_self", "_parent", "_top"] },
      initialValue: "",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA Href",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaTarget",
      title: "Secondary CTA Target",
      type: "string",
      options: { list: ["", "_blank", "_self", "_parent", "_top"] },
      initialValue: "",
    }),

    // Add any additional fields required by the section (images, lists, badges, etc.)
  ],
  preview: {
    select: { title: "header", subtitle: "primaryCtaLabel" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Your Section",
        subtitle: subtitle ? `CTA: ${subtitle}` : "",
      } as { title: string; subtitle?: string };
    },
  },
});
```

If your `page` schema restricts section types, ensure `yourSection` is allowed in its `sections[]` `of` list.

---

## 2) Frontend: GROQ fragment

In `frontend/src/data/sanity/groq.ts`, add a fields fragment and include it in `ALL_SECTION_FIELDS`. This ensures the site fetches only what the component needs.

```ts
export const YOUR_SECTION_FIELDS = `
  _type,
  header,
  subheading,
  alignment,
  primaryCtaLabel,
  primaryCtaHref,
  primaryCtaTarget,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaTarget
`;

// Then include ${YOUR_SECTION_FIELDS} in ALL_SECTION_FIELDS alongside the others
```

Notes:

- If you add images, select `asset`, `alt`, and optionally `"assetAltText": asset->altText` for better accessibility.

---

## 3) Frontend: Types for the section

Add a strict type in `frontend/src/data/sanity/index.ts` and extend the `Section` union. Avoid `any`.

```ts
export type YourSection = {
  _type: "yourSection";
  header?: string;
  subheading?: string; // plaintext
  alignment?: "center" | "left"; // include only if relevant

  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  primaryCtaTarget?: "" | "_blank" | "_self" | "_parent" | "_top";

  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaTarget?: "" | "_blank" | "_self" | "_parent" | "_top";
};

export type Section =
  | Hero
  | Testimonial1Section
  | Testimonial2Section
  | ContactFormSection
  | Cta1Section
  | ProjectListingsSection
  | YourSection; // add yours
```

---

## 4) Astro: Component conversion

Convert the Astro file (e.g., `frontend/src/components/<group>/<YourSection>.astro`) to accept a single prop named `feature` of your new type. Use safe defaults and support two CTAs, alignment, and light/dark mode.

```astro
---
import Text from "@/components/foundations/elements/Text.astro";
import Wrapper from "@/components/foundations/containers/Wrapper.astro";
import Link from "@/components/foundations/elements/Link.astro";

interface Props { feature?: import("@/data/sanity").YourSection }
const { feature } = Astro.props as Props;

const header = feature?.header || "";
const subheading = feature?.subheading || "";
const isCenter = (feature?.alignment || "left") === "center";

// Primary CTA
const primaryLabel = feature?.primaryCtaLabel || "";
const primaryHref = feature?.primaryCtaHref || "#_";
const primaryTarget = feature?.primaryCtaTarget || "";
const primaryRel = primaryTarget === "_blank" ? "noopener noreferrer" : undefined;

// Secondary CTA
const secondaryLabel = feature?.secondaryCtaLabel || "";
const secondaryHref = feature?.secondaryCtaHref || "#_";
const secondaryTarget = feature?.secondaryCtaTarget || "";
const secondaryRel = secondaryTarget === "_blank" ? "noopener noreferrer" : undefined;
---

<section class="border-t border-base-200 border-dashed">
  <Wrapper variant="standard" class="py-4">
    <div class={"text-left " + (isCenter ? "text-center" : "") }>
      {header && (
        <Text tag="h2" variant="displaySM" class="font-serif font-medium text-base-900 dark:text-white">
          {header}
        </Text>
      )}
      {subheading && (
        <Text tag="p" variant="textBase" class="mt-2 text-base-700 dark:text-base-300">
          {subheading}
        </Text>
      )}

      <div class={"flex gap-3 mt-6 " + (isCenter ? "justify-center" : "") }>
        {primaryLabel && (
          <Link href={primaryHref} variant="default" size="sm" gap="sm" target={primaryTarget} rel={primaryRel}>
            {primaryLabel}
          </Link>
        )}
        {secondaryLabel && (
          <Link href={secondaryHref} variant="muted" size="sm" gap="sm" target={secondaryTarget} rel={secondaryRel}>
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  </Wrapper>

  <!-- Light/Dark example: set background and text appropriately using dark: -->
  <!-- Example container classes: bg-white dark:bg-base-950 text-base-900 dark:text-base-100 -->
</section>
```

Notes:

- Use Tailwind utilities directly (no `@apply`)
- When `target==="_blank"` ensure `rel="noopener noreferrer"`
- Keep defaults minimal and safe; never rely on `any`

---

## 5) Rendering map (pages/index)

In `frontend/src/pages/index.astro`, import the component and add it to the `_type` map. Key must equal the schema `name`.

```ts
// import YourSection component
import YourSectionCmp from "@/components/<group>/YourSection.astro";

// add to sectionComponents
const sectionComponents = {
  // ...existing
  yourSection: YourSectionCmp,
};
```

The page already fetches sections with `${ALL_SECTION_FIELDS}` and renders via:

```tsx
return <Component feature={section} />;
```

---

## 6) Authoring + QA checklist

- In Studio, add your new section to a page’s `sections[]`
- Fill `header`, `subheading` (plaintext), and CTAs
- If relevant, set `alignment` to `center`; otherwise keep left
- Publish the document

Frontend checks:

- Confirm no console warnings like `Unknown section type`
- Verify two CTAs render; `_blank` links open in a new window and have `rel="noopener noreferrer"`
- Check light/dark mode: text remains readable on both (use `dark:` variants)
- Temporarily clear optional fields; defaults should avoid runtime errors

---

## Common pitfalls and how to avoid them

- Missing the section in `ALL_SECTION_FIELDS` → fields arrive as `undefined`
- `_type` mismatch between schema `name` and render map key → component never renders
- Forgetting to extend the `Section` union → weaker typing and poorer DX
- Inconsistent field names between schema, GROQ, types, and component
- Adding background color pickers (not desired); instead, use Tailwind `dark:` to support themes

---

## Example: Converting an existing static section

Assume an original static component with center-aligned content and one CTA. Convert it by:

1. Add schema with `alignment`, `primary*` and `secondary*` CTA fields
2. Add `YOUR_SECTION_FIELDS` and include in `ALL_SECTION_FIELDS`
3. Add `YourSection` type and extend `Section` union
4. Update the Astro component to use `feature` props, safe defaults, two CTAs, alignment, and `dark:` classes
5. Register it in the render map using the same `name` as the schema

---

## References (recommended docs)

- Sanity: schema types, validation, previews — [Sanity schemas](https://www.sanity.io/docs/schema-types)
- GROQ query language and projections — [GROQ](https://www.sanity.io/docs/groq)
- Astro components and props — [Astro components](https://docs.astro.build/en/core-concepts/astro-components/)
- Tailwind CSS dark mode — [Tailwind dark mode](https://tailwindcss.com/docs/dark-mode)

---

## Space for project-specific preferences

- Sections should have the class 'py-12' for vertical padding.
