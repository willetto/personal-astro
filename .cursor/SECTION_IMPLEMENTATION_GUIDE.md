# Interactive Section Migration Guide (Sanity + Astro)

This guide transforms static Astro sections into dynamic, CMS-managed sections using Sanity. Instead of following a template, this guide asks strategic questions to help you make the right schema design decisions during migration.

## 🎯 Migration Philosophy

**Ask First, Build Second**: Every hardcoded element should prompt a question about how it should be managed in the CMS. This guide helps you identify these elements and make informed decisions.

---

## 🔍 Step 1: Section Analysis & Discovery

Before touching any code, analyze the existing section to understand its structure and content patterns.

### 🤔 Discovery Questions to Ask

**Start by examining the Astro component file:**

1. **"What hardcoded content do I see?"**
   - Look for hardcoded strings, arrays, objects
   - Identify static text, labels, descriptions
   - Note any embedded data structures

2. **"What content varies between instances?"**
   - Headers, subheadings, descriptions
   - CTA labels and links
   - Images, icons, or media
   - Lists or repeating elements

3. **"What content should be editable by content creators?"**
   - Marketing copy that changes frequently
   - CTAs that need A/B testing
   - Feature lists that evolve
   - Contact information or links

### 🔍 Hardcoded Data Pattern Detection

**When you find hardcoded arrays or objects, ask:**

```typescript
// Example from Feature1.astro lines 36-82
const data = [
  {
    icon: "Filters",
    category: "ACH", 
    text: "Initiate ACH transactions..."
  },
  // ... more items
]
```

**Critical Questions:**
- **"Should each item be individually editable?"** → Separate documents vs array fields
- **"Will content creators add/remove items?"** → Dynamic arrays vs fixed structure  
- **"Do items need different layouts or types?"** → Union types vs single object type
- **"Should items be reusable across sections?"** → References vs embedded objects

### 🎨 Icon Handling Decision Tree

**When you encounter icon references:**

```astro
{section.icon === "Filters" && <Filters size="base" />}
```

**Ask these questions:**
1. **"Should users select from existing icons or upload custom ones?"**
   - **Existing icons**: Create a string field with predefined options from [`frontend/src/components/foundations/icons/`](frontend/src/components/foundations/icons/)
   - **Custom uploads**: Use image field with SVG/PNG support
   - **Both**: Use a union type with icon selection OR image upload

2. **"How many icons are available?"** (Currently ~70 icons available)
   - **Few icons**: Radio buttons or dropdown
   - **Many icons**: Searchable dropdown or autocomplete

**Implementation Patterns:**
```typescript
// Option 1: Icon library selection
defineField({
  name: "icon",
  title: "Icon",
  type: "string",
  options: {
    list: [
      { title: "Filters", value: "Filters" },
      { title: "Wave Square", value: "WaveSquare" },
      // ... all available icons
    ]
  }
})

// Option 2: Custom upload
defineField({
  name: "iconImage", 
  title: "Custom Icon",
  type: "image",
  options: { accept: "image/svg+xml,image/png" }
})

// Option 3: Hybrid approach
defineField({
  name: "iconType",
  title: "Icon Type", 
  type: "string",
  options: {
    list: [
      { title: "Library Icon", value: "library" },
      { title: "Custom Upload", value: "upload" }
    ]
  }
})
```

---

## 🏗️ Step 2: Interactive Schema Design

### 🤔 Content Structure Questions

**For each content element, ask:**

1. **"Is this a simple text field or rich content?"**
   - **Simple**: Use `string` or `text` 
   - **Rich**: Use `array` with portable text (but project prefers `text` for subheadings)

2. **"Should this have length limits?"**
   - Headers: Usually 60-80 characters for SEO
   - Descriptions: 150-300 characters for readability
   - Add validation rules accordingly

3. **"Is this required or optional?"**
   - Critical content: Add `validation: (rule) => rule.required()`
   - Optional enhancements: Leave optional with good defaults

### 🔄 Repeating Content Patterns

**When you find repeating elements (like feature cards), ask:**

1. **"What's the minimum/maximum number of items?"**
   ```typescript
   validation: (rule) => rule.min(1).max(8)
   ```

2. **"Should items have consistent structure?"**
   - **Yes**: Single object type in array
   - **No**: Union type with multiple layouts

3. **"Do items need ordering controls?"**
   - Arrays are naturally orderable in Sanity Studio

### 🎯 CTA (Call-to-Action) Strategy

**The project standard is two CTAs (primary + secondary). Ask:**

1. **"Are both CTAs always needed?"**
   - Make both optional but provide good defaults
   - Consider conditional visibility

2. **"What link types are needed?"**
   - Internal pages, external links, email, phone
   - File downloads, anchor links

3. **"Should links open in new windows?"**
   - External links: Usually `_blank`
   - Internal navigation: Usually same window
   - Provide target options: `["", "_blank", "_self", "_parent", "_top"]`

### 📐 Layout & Alignment Decisions

**When the original design has specific alignment:**

1. **"Is the section always centered, or should it be configurable?"**
   - **Always centered**: No alignment field needed
   - **Sometimes centered**: Add alignment option `center | left`
   - **Multiple alignments**: Add `center | left | right`

2. **"Should spacing be configurable?"**
   - Project standard: `py-12` for sections
   - Consider if different sections need different spacing

---

## 🛠️ Step 3: Implementation Workflow

### Schema Creation Checklist

```typescript
// Template with decision prompts
export const yourSection = defineType({
  name: "yourSection", // ❓ Does this match your component name?
  title: "Your Section", // ❓ Is this clear for content creators?
  type: "object",
  fields: [
    // ❓ What's the main heading?
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (rule) => rule.required(), // ❓ Is this required?
    }),
    
    // ❓ Is subheading simple text or rich content?
    defineField({
      name: "subheading", 
      title: "Text",
      type: "text", // Project preference: plaintext
      rows: 3,
    }),

    // ❓ Does original design support alignment options?
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
      initialValue: "left", // ❓ What's the default?
    }),

    // ❓ Are there hardcoded arrays that need to become dynamic?
    defineField({
      name: "items", // Replace with your array name
      title: "Items",
      type: "array",
      of: [
        defineField({
          name: "item",
          title: "Item", 
          type: "object",
          fields: [
            // ❓ Icon library or custom upload?
            defineField({
              name: "icon",
              title: "Icon",
              type: "string", // or "image" for uploads
              options: {
                list: [
                  // ❓ Which icons from /icons/ are relevant?
                  { title: "Filters", value: "Filters" },
                  { title: "Wave Square", value: "WaveSquare" },
                  // Add relevant icons
                ]
              }
            }),
            // ❓ What other fields does each item need?
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description", 
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
            prepare({ title, subtitle }) {
              return {
                title: title || "Untitled Item",
                subtitle: subtitle || "",
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(8), // ❓ What are sensible limits?
    }),

    // Standard CTA fields (project requirement: always include both)
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
  ],
  preview: {
    select: { title: "header", subtitle: "primaryCtaLabel" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Your Section",
        subtitle: subtitle ? `CTA: ${subtitle}` : "",
      };
    },
  },
});
```

### GROQ Query Design

**Ask these questions when building your GROQ fragment:**

1. **"What fields does the component actually use?"**
   - Only include fields that render in the component
   - Avoid over-fetching unused data

2. **"Are there nested objects or arrays?"**
   ```typescript
   // For arrays of objects:
   items[] {
     icon,
     title, 
     description
   }
   
   // For image fields:
   image {
     asset,
     alt,
     "assetUrl": asset->url
   }
   ```

3. **"Do I need computed fields?"**
   ```typescript
   // Example: Get alt text from asset
   "assetAltText": asset->altText
   ```

---

## 🎨 Step 4: Component Conversion Strategy

### 🤔 Component Analysis Questions

**Before modifying the Astro component:**

1. **"What are the current hardcoded defaults?"**
   - Extract these as fallback values
   - Ensure component works without CMS data

2. **"How should missing data be handled?"**
   - Empty states vs default content
   - Conditional rendering vs placeholder content

3. **"What Tailwind classes need to be dynamic?"**
   - Alignment classes: `text-center` vs `text-left`
   - Spacing variations
   - Color themes for light/dark mode

### Component Conversion Template

```astro
---
// ❓ What type should this component accept?
interface Props { feature?: import("@/data/sanity").YourSectionType }
const { feature } = Astro.props as Props;

// ❓ What are sensible defaults from the original hardcoded values?
const header = feature?.header || "Default Header";
const subheading = feature?.subheading || "Default description";
const isCenter = (feature?.alignment || "left") === "center";

// ❓ How should CTAs be handled?
const primaryLabel = feature?.primaryCtaLabel || "";
const primaryHref = feature?.primaryCtaHref || "#_";
const primaryTarget = feature?.primaryCtaTarget || "";
const primaryRel = primaryTarget === "_blank" ? "noopener noreferrer" : undefined;

const secondaryLabel = feature?.secondaryCtaLabel || "";
const secondaryHref = feature?.secondaryCtaHref || "#_"; 
const secondaryTarget = feature?.secondaryCtaTarget || "";
const secondaryRel = secondaryTarget === "_blank" ? "noopener noreferrer" : undefined;

// ❓ How should hardcoded arrays be replaced?
const items = feature?.items || [
  // Provide sensible defaults from original hardcoded data
  {
    icon: "Filters",
    title: "Default Item",
    description: "Default description"
  }
];
---

<section class="your-section-class">
  <Wrapper variant="standard" class="py-12">
    <div class={isCenter ? "text-center" : "text-left"}>
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

      <!-- ❓ Should CTAs be grouped or separate? -->
      <div class={`flex gap-3 mt-6 ${isCenter ? "justify-center" : ""}`}>
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

      <!-- ❓ How should dynamic arrays be rendered? -->
      {items && items.length > 0 && (
        <ul class="mt-12 grid gap-px bg-base-200 rounded-xl sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <li class="bg-white p-6 rounded-xl">
              <!-- ❓ Icon library or uploaded image? -->
              {item.icon && (
                <div class="flex p-2 bg-yellow-400 rounded-lg w-fit">
                  <!-- Dynamic icon rendering based on your icon strategy -->
                  {item.icon === "Filters" && <Filters size="base" />}
                  {item.icon === "WaveSquare" && <WaveSquare size="base" />}
                  <!-- Add other icon mappings -->
                </div>
              )}
              
              {item.title && (
                <h3 class="mt-4 font-medium text-base-800">{item.title}</h3>
              )}
              {item.description && (
                <p class="mt-2 text-base-500">{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </Wrapper>
</section>
```

---

## 🔗 Step 5: Integration & Registration

### Registration Checklist

1. **GROQ Fragment**: Add to [`frontend/src/data/sanity/groq.ts`](frontend/src/data/sanity/groq.ts)
   ```typescript
   export const YOUR_SECTION_FIELDS = `
     _type,
     header,
     subheading,
     alignment,
     items[] {
       icon,
       title,
       description
     },
     primaryCtaLabel,
     primaryCtaHref,
     primaryCtaTarget,
     secondaryCtaLabel, 
     secondaryCtaHref,
     secondaryCtaTarget
   `;
   
   // Add to ALL_SECTION_FIELDS
   export const ALL_SECTION_FIELDS = `
     ${HERO_FIELDS},
     ${FEATURE1_FIELDS},
     ${YOUR_SECTION_FIELDS}
   `;
   ```

2. **TypeScript Types**: Add to [`frontend/src/data/sanity/index.ts`](frontend/src/data/sanity/index.ts)
   ```typescript
   export type YourSectionItem = {
     icon?: string;
     title?: string;
     description?: string;
   };

   export type YourSectionType = {
     _type: "yourSection";
     header?: string;
     subheading?: string;
     alignment?: "center" | "left";
     items?: YourSectionItem[];
     primaryCtaLabel?: string;
     primaryCtaHref?: string;
     primaryCtaTarget?: LinkTarget;
     secondaryCtaLabel?: string;
     secondaryCtaHref?: string;
     secondaryCtaTarget?: LinkTarget;
   };

   // Add to Section union
   export type Section =
     | Hero
     | Feature1Section
     | YourSectionType; // Add here
   ```

3. **Render Map**: Add to [`frontend/src/pages/index.astro`](frontend/src/pages/index.astro)
   ```typescript
   import YourSectionComponent from "@/components/path/YourSection.astro";

   const sectionComponents = {
     hero1: Hero1,
     feature1: Feature1,
     yourSection: YourSectionComponent, // Key must match schema name
   };
   ```

---

## ✅ Step 6: Quality Assurance Checklist

### 🧪 Testing Questions

**Before considering migration complete:**

1. **"Does the section render without CMS data?"**
   - Test with `feature={undefined}`
   - Verify defaults work properly

2. **"Are all interactive elements functional?"**
   - CTAs link correctly
   - `_blank` links have `rel="noopener noreferrer"`
   - Icons render properly

3. **"Does it work in both light and dark modes?"**
   - Check `dark:` classes are applied
   - Verify contrast and readability

4. **"Can content creators easily author content?"**
   - Test in Sanity Studio
   - Verify preview functionality
   - Check validation rules

5. **"Are there any console errors or TypeScript issues?"**
   - No `Unknown section type` warnings
   - No type errors in development
   - No runtime JavaScript errors

### 🎯 Content Creator Experience

**Test these scenarios in Sanity Studio:**

- [ ] Create section with minimal required fields
- [ ] Add optional fields and verify they render
- [ ] Test with maximum number of array items
- [ ] Try different alignment options
- [ ] Test both CTA configurations
- [ ] Verify preview shows meaningful information

---

## 🚨 Common Migration Pitfalls & Solutions

### ❌ Schema Design Mistakes

1. **Over-engineering schemas**
   - **Problem**: Adding fields that will never be used
   - **Solution**: Start minimal, add fields as needed

2. **Under-engineering schemas**
   - **Problem**: Hardcoding values that should be editable
   - **Solution**: Ask "Will this ever need to change?" for every hardcoded value

3. **Inconsistent naming**
   - **Problem**: Schema field names don't match component props
   - **Solution**: Use consistent naming across schema, GROQ, types, and components

### ❌ Component Conversion Mistakes

1. **Poor default handling**
   - **Problem**: Component breaks when CMS data is missing
   - **Solution**: Always provide sensible defaults

2. **Missing accessibility**
   - **Problem**: Dynamic content lacks proper ARIA labels
   - **Solution**: Generate accessible labels from content

3. **Broken responsive design**
   - **Problem**: Dynamic classes break responsive layouts
   - **Solution**: Test all responsive breakpoints with various content lengths

### ❌ Integration Mistakes

1. **GROQ field mismatches**
   - **Problem**: Component expects fields not included in GROQ query
   - **Solution**: Ensure GROQ includes all fields used by component

2. **Type definition gaps**
   - **Problem**: TypeScript types don't match actual data structure
   - **Solution**: Keep types in sync with schema and GROQ queries

---

## 📚 Decision Reference Guide

### Icon Strategy Decision Matrix

| Scenario | Recommended Approach | Implementation |
|----------|---------------------|----------------|
| Fixed set of brand icons | String field with predefined options | `options: { list: [...] }` |
| Large icon library | String field with search/autocomplete | Custom input component |
| Custom icons needed | Image field with SVG support | `type: "image"` |
| Mixed requirements | Union type or conditional fields | Icon type selector + conditional fields |

### Content Structure Decision Matrix

| Content Type | Field Type | When to Use |
|--------------|------------|-------------|
| Short headings | `string` | < 100 characters, single line |
| Long descriptions | `text` | Multi-line, plain text |
| Rich content | `array` (portable text) | Formatting, links, emphasis needed |
| Repeating items | `array` of objects | Dynamic lists, cards, features |
| Optional sections | Conditional fields | Content that may not always be present |

### CTA Strategy Decision Matrix

| Use Case | Implementation | Notes |
|----------|----------------|-------|
| Always two CTAs | Separate primary/secondary fields | Project standard |
| Variable CTA count | Array of CTA objects | More flexible but complex |
| CTA with icons | Additional icon field per CTA | Consider icon strategy |
| Complex CTAs | Reference to CTA document type | Reusable across sections |

---

## 🎯 Success Metrics

**A successful migration should achieve:**

- ✅ **Zero hardcoded content** in the component
- ✅ **Intuitive content authoring** experience in Sanity Studio  
- ✅ **Robust error handling** with graceful defaults
- ✅ **Type safety** throughout the data flow
- ✅ **Responsive design** maintained across all content variations
- ✅ **Accessibility** preserved or improved
- ✅ **Performance** equivalent to or better than static version

**Remember**: The goal is not just to make content editable, but to create a sustainable, user-friendly content management experience that empowers content creators while maintaining technical excellence.
