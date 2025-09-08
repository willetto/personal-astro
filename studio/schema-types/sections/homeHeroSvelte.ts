import { defineType } from "sanity";

export const homeHeroSvelte = defineType({
  name: "homeHeroSvelte",
  title: "Home Page Hero (Svelte)",
  type: "object",
  fields: [],
  preview: {
    prepare() {
      return { title: "Home Page Hero (Svelte)" } as { title: string };
    },
  },
});
