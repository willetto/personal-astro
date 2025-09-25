import { defineField, defineType } from "sanity";

// Import the component configuration from frontend
// Since this is a monorepo, we can reference the frontend config directly
import { getSvelteComponentOptions } from "../../../frontend/src/config/svelte-components";

const SVELTE_COMPONENT_OPTIONS = getSvelteComponentOptions();

export const svelteComponent = defineType({
  name: "svelteComponent",
  title: "Svelte Component",
  type: "object",
  fields: [
    defineField({
      name: "componentType",
      title: "Component Type",
      type: "string",
      options: {
        list: SVELTE_COMPONENT_OPTIONS,
        layout: "dropdown"
      },
      validation: (rule) => rule.required(),
      description: "Select which Svelte component to render"
    }),
    defineField({
      name: "info",
      title: "Component Info",
      type: "string",
      readOnly: true,
      description: "The selected Svelte component will be rendered as-is without additional configuration.",
      initialValue: "Svelte component renders with default settings."
    })
  ],
  preview: {
    select: {
      componentType: "componentType"
    },
    prepare({ componentType }) {
      const selectedComponent = SVELTE_COMPONENT_OPTIONS.find(
        option => option.value === componentType
      );
      
      return {
        title: `Svelte Component: ${selectedComponent?.title || "Not Selected"}`,
        subtitle: "Interactive Svelte component"
      };
    }
  }
});
