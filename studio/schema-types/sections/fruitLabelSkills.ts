import { defineField, defineType } from "sanity";

export const fruitLabelSkills = defineType({
  name: "fruitLabelSkills",
  title: "Fruit Label Skills (Svelte)",
  type: "object",
  fields: [
    defineField({
      name: "info",
      title: "Info",
      type: "string",
      readOnly: true,
      description:
        "This block renders the Fruit Label Skills (Svelte) component. It has no configurable inputs. This read-only field exists to satisfy Sanity's minimum field requirement.",
      initialValue:
        "Renders the Fruit Label Skills (Svelte) on the frontend. No inputs.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Fruit Label Skills (Svelte)" } as { title: string };
    },
  },
});
