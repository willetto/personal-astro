import { defineField, defineType } from "sanity";

export const homeHeroSvelte = defineType({
  name: "homeHeroSvelte",
  title: "Home Page Hero (Svelte)",
  type: "object",
  fields: [
    defineField({
      name: "info",
      title: "Info",
      type: "string",
      readOnly: true,
      description:
        "This block renders the Home Page Hero (Svelte) component. It has no configurable inputs. This read-only field exists to satisfy Sanity's minimum field requirement.",
      initialValue:
        "Renders the Home Page Hero (Svelte) on the frontend. No inputs.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page Hero (Svelte)" } as { title: string };
    },
  },
});
