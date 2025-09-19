import { defineField, defineType } from "sanity";

export const caseStudyListings = defineType({
  name: "caseStudyListings",
  title: "Case Study Listings",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      description: "Optional header text for the case study listings section",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      description: "Optional subheading text below the header",
    }),
    defineField({
      name: "selectedCaseStudies",
      title: "Selected Case Studies",
      type: "array",
      of: [
        defineField({
          name: "caseStudyItem",
          title: "Case Study",
          type: "object",
          fields: [
            defineField({
              name: "caseStudy",
              title: "Case Study",
              type: "reference",
              to: [{ type: "caseStudy" }],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "caseStudy.title",
              subtitle: "caseStudy.clientName",
              media: "caseStudy.featuredImage",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Untitled Case Study",
                subtitle: subtitle ? `Client: ${subtitle}` : "No client specified",
                media,
              };
            },
          },
        }),
      ],
      description: "Select which case studies to display in the grid",
      validation: (rule) => rule.min(1).error("At least one case study must be selected"),
    }),
    defineField({
      name: "showViewAllButton",
      title: "Show 'View All' Button",
      type: "boolean",
      initialValue: false,
      description: "Show a button linking to all case studies page",
    }),
    defineField({
      name: "viewAllButtonText",
      title: "View All Button Text",
      type: "string",
      initialValue: "View All Case Studies",
      hidden: ({ parent }) => !parent?.showViewAllButton,
    }),
    defineField({
      name: "viewAllButtonUrl",
      title: "View All Button URL",
      type: "string",
      initialValue: "/case-studies",
      hidden: ({ parent }) => !parent?.showViewAllButton,
    }),
  ],
  preview: {
    select: {
      header: "header",
      caseStudies: "selectedCaseStudies",
    },
    prepare({ header, caseStudies }) {
      const count = Array.isArray(caseStudies) ? caseStudies.length : 0;
      return {
        title: header || "Case Study Listings",
        subtitle: `${count} case ${count === 1 ? 'study' : 'studies'} selected`,
      };
    },
  },
});