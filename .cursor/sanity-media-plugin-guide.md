# Sanity Studio Media Plugin Guide

This guide covers the setup, configuration, and usage of the Sanity Media Plugin for enhanced media management in your Sanity Studio.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Schema Updates](#schema-updates)
- [Using the Media Tool](#using-the-media-tool)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The Sanity Media Plugin (`sanity-plugin-media`) provides an enhanced media management experience in Sanity Studio, offering:

- Advanced media library with search and filtering
- Bulk upload capabilities
- Image metadata management
- Better organization with tags and collections
- Improved asset selection interface

## Installation

### 1. Install the Plugin

```bash
# Using npm
npm install sanity-plugin-media

# Using pnpm
pnpm add sanity-plugin-media

# Using yarn
yarn add sanity-plugin-media
```

### 2. Verify Installation

Check your [`package.json`](../studio/package.json:24) to ensure the plugin is installed:

```json
{
  "dependencies": {
    "sanity-plugin-media": "^4.0.0"
  }
}
```

## Configuration

### 1. Add Plugin to Sanity Config

Update your [`sanity.config.ts`](../studio/sanity.config.ts:1) file to include the media plugin:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schema-types";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Studio",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    media() // Add the media plugin here
  ],
  schema: {
    types: schemaTypes,
  },
});
```

### 2. Environment Variables

Ensure your environment variables are properly configured:

```bash
# .env.local or .env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Schema Updates

### 1. Import Media Asset Source

In your schema files, import the [`mediaAssetSource`](../studio/schema-types/case-study.ts:3):

```typescript
import { mediaAssetSource } from "sanity-plugin-media";
```

### 2. Configure Image Fields

Update your image fields to use the media plugin as a source:

#### Basic Image Field

```typescript
defineField({
  name: "featuredImage",
  title: "Featured Image",
  type: "image",
  options: {
    hotspot: true,
    sources: [mediaAssetSource], // Enable media plugin for this field
  },
  fields: [
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (rule) => rule.required(),
    },
  ],
})
```

#### Image Array/Gallery

```typescript
defineField({
  name: "galleryImages",
  title: "Gallery Images",
  type: "array",
  of: [
    {
      type: "image",
      options: {
        hotspot: true,
        sources: [mediaAssetSource], // Enable media plugin for gallery items
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
    },
  ],
})
```

#### File Upload with Restrictions

```typescript
defineField({
  name: "favicon",
  title: "Favicon",
  type: "image",
  options: {
    accept: "image/svg+xml,image/png", // Restrict file types
    sources: [mediaAssetSource],
  },
})
```

### 3. Example Schema Implementation

Here's a complete example from the [`case-study.ts`](../studio/schema-types/case-study.ts:84) schema:

```typescript
import { defineField, defineType } from "sanity";
import { mediaAssetSource } from "sanity-plugin-media";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  fields: [
    // ... other fields
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
        sources: [mediaAssetSource],
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      description: "Main image used for the case study header and listings",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            sources: [mediaAssetSource],
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});
```

## Using the Media Tool

### 1. Accessing the Media Library

Once configured, the Media tool will appear in your Studio's main navigation. You can access it by:

1. Opening your Sanity Studio
2. Looking for the "Media" tab in the main navigation
3. Clicking on it to open the media library

### 2. Uploading Media

#### Single Upload
1. Click the "Upload" button in the media library
2. Select your file(s) from your computer
3. Add metadata (alt text, tags, etc.)
4. Click "Upload"

#### Bulk Upload
1. Drag and drop multiple files into the media library
2. The plugin will process all files simultaneously
3. Add metadata to each file as needed

### 3. Organizing Media

#### Adding Tags
1. Select an image in the media library
2. Click "Edit" or the pencil icon
3. Add relevant tags in the "Tags" field
4. Save your changes

#### Using Collections
1. Create collections to group related media
2. Assign media to collections for better organization
3. Filter by collections in the media library

### 4. Selecting Media in Documents

When editing a document with image fields configured to use the media plugin:

1. Click on an image field
2. Choose "Select from Media Library" (instead of "Upload")
3. Browse, search, or filter your existing media
4. Select the desired image
5. Configure hotspot and crop if needed

### 5. Search and Filter

The media library provides powerful search and filtering options:

- **Search by filename**: Type in the search bar
- **Filter by file type**: Use the file type filters
- **Filter by tags**: Select specific tags to narrow results
- **Sort options**: Sort by date, name, or size

## Best Practices

### 1. Image Optimization

- Upload images in appropriate formats (WebP, JPEG, PNG)
- Consider file sizes for web performance
- Use descriptive filenames before uploading

### 2. Metadata Management

- Always add alt text for accessibility
- Use consistent tagging conventions
- Add descriptive captions when relevant

### 3. Organization

- Create a logical tagging system
- Use collections for project-based organization
- Regularly clean up unused media

### 4. Schema Configuration

```typescript
// Good: Always include alt text validation
fields: [
  {
    name: "alt",
    title: "Alt Text",
    type: "string",
    validation: (rule) => rule.required(),
  },
]

// Good: Use hotspot for responsive images
options: {
  hotspot: true,
  sources: [mediaAssetSource],
}

// Good: Restrict file types when appropriate
options: {
  accept: "image/svg+xml,image/png",
  sources: [mediaAssetSource],
}
```

### 5. Performance Considerations

- Regularly audit and remove unused media
- Use appropriate image dimensions
- Consider CDN configuration for production

## Troubleshooting

### Common Issues

#### 1. Media Plugin Not Appearing

**Problem**: The Media tab doesn't appear in Studio navigation.

**Solutions**:
- Verify the plugin is installed: `pnpm list sanity-plugin-media`
- Check that [`media()`](../studio/sanity.config.ts:15) is added to the plugins array
- Restart your development server
- Clear browser cache

#### 2. Upload Failures

**Problem**: Files fail to upload to the media library.

**Solutions**:
- Check file size limits (Sanity has a 200MB limit)
- Verify file format is supported
- Check network connection
- Ensure proper project permissions

#### 3. Media Not Showing in Fields

**Problem**: Media library doesn't appear when selecting images in document fields.

**Solutions**:
- Verify [`mediaAssetSource`](../studio/schema-types/case-study.ts:89) is added to field options
- Check that the import statement is correct
- Restart the Studio development server

#### 4. Permission Issues

**Problem**: Cannot upload or manage media.

**Solutions**:
- Check Sanity project permissions
- Verify API tokens have correct permissions
- Contact project administrator

### Debug Steps

1. **Check Console**: Open browser developer tools and look for error messages
2. **Verify Configuration**: Double-check [`sanity.config.ts`](../studio/sanity.config.ts:1) setup
3. **Test Basic Upload**: Try uploading through the default Sanity image field
4. **Check Network**: Verify API calls are reaching Sanity servers

### Getting Help

- **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **Plugin Repository**: [GitHub Issues](https://github.com/sanity-io/sanity-plugin-media)
- **Community**: [Sanity Community Slack](https://slack.sanity.io)

## Version Compatibility

This guide is written for:
- `sanity-plugin-media`: ^4.0.0
- `sanity`: ^3.85.1

Always check the [plugin's changelog](https://github.com/sanity-io/sanity-plugin-media/releases) for version-specific updates and breaking changes.

---

*Last updated: December 2024*