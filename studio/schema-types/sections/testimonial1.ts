import { defineField, defineType } from "sanity";

export const testimonial1 = defineType({
  name: "testimonial1",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(500),
      description: "The testimonial quote (max 500 characters)"
    }),
    defineField({
      name: "customerName",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().max(100),
      description: "Name of the person giving the testimonial"
    }),
    defineField({
      name: "companyName",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required().max(100)
    }),
    defineField({
      name: "alignment",
      title: "Text Alignment",
      type: "string",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "center",
      description: "How to align the testimonial content"
    }),
    defineField({
      name: "showBorders",
      title: "Show top and bottom borders",
      type: "boolean",
      initialValue: false,
      description: "Toggle to show top and bottom borders for this section."
    }),
    defineField({
      name: "customerUrl",
      title: "Customer URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
      description: "Optional link for the customer name"
    }),
    defineField({
      name: "companyUrl",
      title: "Company URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
      description: "Optional link for the company name"
    }),
  ],
  preview: {
    select: { 
      title: "customerName", 
      subtitle: "companyName",
      description: "quote"
    },
    prepare({ title, subtitle, description }) {
      return {
        title: title || "Testimonial",
        subtitle: subtitle ? `${subtitle}` : "",
        media: undefined // No icon needed for simple testimonial
      };
    },
  },
});