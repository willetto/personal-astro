export const HERO_FIELDS = `
  _type,
  header,
  subheading,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  gradientFromColor,
  gradientToColor
`;

export const FEATURE1_FIELDS = `
  _type,
  header,
  subheading,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  features[] {
    icon,
    category,
    text
  }
`;

export const CASE_STUDY_LISTINGS_FIELDS = `
  _type,
  header,
  subheading,
  selectedCaseStudies[] {
    caseStudy-> {
      _id,
      title,
      "slug": slug.current,
      description,
      clientName,
      projectDate,
      featuredImage {
        asset,
        alt
      },
      technologies,
      tags
    }
  },
  showViewAllButton,
  viewAllButtonText,
  viewAllButtonUrl
`;

export const ALL_SECTION_FIELDS = `
  ${HERO_FIELDS},
  ${FEATURE1_FIELDS},
  ${CASE_STUDY_LISTINGS_FIELDS}
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
    title,
    ${SITE_SETTINGS_FAVICON_FIELDS}
  }
`;

// Case Study queries
export const CASE_STUDY_DETAIL_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  clientName,
  projectDate,
  featuredImage {
    asset,
    alt
  },
  galleryImages[] {
    asset,
    alt,
    caption
  },
  challenge,
  solution,
  results,
  technologies,
  tags,
  websiteUrl,
  githubUrl
`;

export const CASE_STUDY_LIST_QUERY = `
  *[_type == "caseStudy"] | order(projectDate desc, title asc) {
    ${CASE_STUDY_DETAIL_FIELDS}
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ${CASE_STUDY_DETAIL_FIELDS}
  }
`;

export const CASE_STUDY_SLUGS_QUERY = `
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const SITE_SETTINGS_FAVICON_QUERY = `
  *[_type == "siteSettings"][0] {
    ${SITE_SETTINGS_FAVICON_FIELDS}
  }
`;
