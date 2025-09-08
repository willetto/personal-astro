import { defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: EarthGlobeIcon,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Global Site Settings",
        subtitle: title || "Untitled",
      };
    },
  },
  fields: [
    defineField({
      name: "favicon",
      title: "Favicon",
      description:
        "Upload an SVG or PNG favicon. Prefer square images; SVG recommended.",
      type: "image",
      options: {
        accept: "image/svg+xml,image/png",
      },
    }),
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description: "Title used for <title> and basic SEO defaults.",
      validation: (rule) => rule.required(),
    }),
  ],
});
