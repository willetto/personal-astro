import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schema-types";
import StudioIcon from "./components/StudioIcon";
import CustomLayout from "./components/CustomLayout";
import icon from "../static/self_icon.png";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Personal Site Content",
  projectId,
  dataset,

  // Workspace icon shown in the Studio UI (sidebar/workspace selector)
  icon: StudioIcon,

  plugins: [structureTool(), visionTool(), media()],
  schema: {
    types: schemaTypes,
  },
});
