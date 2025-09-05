import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Global Site Settings",
    }),
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description: "Title used for <title> and basic SEO defaults.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: { hotspot: false },
      description:
        "Primary favicon (ICO/PNG). Other sizes can be generated as needed.",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});
