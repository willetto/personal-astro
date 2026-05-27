import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

const YOUTUBE_URL_RE =
  /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#].*)?$/;

export const youtube = defineType({
  name: "youtube",
  title: "YouTube",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      description:
        "Paste a youtube.com/watch, youtu.be, /shorts, or /embed link.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            !value || YOUTUBE_URL_RE.test(value)
              ? true
              : "Must be a valid YouTube URL",
          ),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "url", subtitle: "caption" },
    prepare: ({ title, subtitle }) => ({
      title: subtitle || "YouTube video",
      subtitle: title,
    }),
  },
});
