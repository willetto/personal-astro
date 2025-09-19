import { defineField, defineType } from "sanity";

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
        { type: "homeHeroSvelte" },
        { type: "fruitLabelSkills" },
        { type: "hero1" },
        { type: "hero2" },
        { type: "feature1" },
        { type: "caseStudyListings" },
        { type: "contactForm" }, // Add the new contactForm section
      ],
      description:
        "Structured sections that render on the frontend. Add hero sections, features, and case study listings here.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
