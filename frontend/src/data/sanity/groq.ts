export const HERO_FIELDS = `
  _type,
  header,
  subheading,
  primaryCtaLabel,
  primaryCtaHref,
  primaryCtaTarget,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaTarget
`;

export const FEATURE1_FIELDS = `
  _type,
  header,
  subheading,
  primaryCtaLabel,
  primaryCtaHref,
  primaryCtaTarget,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaTarget,
  features[] {
    icon,
    category,
    text
  }
`;

export const ALL_SECTION_FIELDS = `
  ${HERO_FIELDS},
  ${FEATURE1_FIELDS}
`;

export const PAGE_BY_SLUG_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    sections[] {
      ${ALL_SECTION_FIELDS}
    }
  }
`;

export const HOME_PAGE_WITH_SECTIONS_QUERY = `
  *[_type == "page" && slug.current in $slugs][0] {
    _id,
    title,
    "slug": slug.current,
    sections[] {
      ${ALL_SECTION_FIELDS}
    }
  }
`;

export const FIRST_PAGE_WITH_SECTIONS_QUERY = `
  *[_type == "page" && defined(sections) && count(sections) > 0][0] {
    _id,
    title,
    "slug": slug.current,
    sections[] {
      ${ALL_SECTION_FIELDS}
    }
  }
`;

export const PAGE_LIST_QUERY = `
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

// Site Settings (title + favicon)
export const SITE_SETTINGS_FAVICON_FIELDS = `
  favicon {
    asset,
    "assetUrl": asset->url,
    "assetMimeType": asset->mimeType,
    "assetExt": asset->extension,
    alt
  }
`;

export const SITE_SETTINGS_HEAD_QUERY = `
  *[_type == "siteSettings"][0] {
    siteTitle,
    ${SITE_SETTINGS_FAVICON_FIELDS}
  }
`;
