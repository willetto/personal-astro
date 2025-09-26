export type LinkTarget = "" | "_blank" | "_self" | "_parent" | "_top";

export type Cta = {
  label?: string;
  href?: string;
  target?: LinkTarget;
  variant?: "default" | "muted";
};

export type Hero = {
  _type: "hero1" | "hero2";
  header?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  gradientFromColor?: string;
  gradientToColor?: string;
  heroImages?: Array<{
    asset?: { _ref?: string };
    alt?: string;
    assetUrl?: string;
  }>;
};

export type Feature1Item = {
  icon?: string;
  category?: string;
  text?: string;
};

export type Feature1Section = {
  _type: "feature1";
  header?: string;
  subheading?: string;
  ctas?: Cta[];
  features?: Feature1Item[];
};

export type HomeHeroSvelteSection = {
  _type: "homeHeroSvelte";
};

export type FruitLabelSkillsSection = {
  _type: "fruitLabelSkills";
};

export type CaseStudyTextSection = {
  _type: "textSection";
  title?: string;
  content: Array<{
    _type: "block";
    children: Array<{
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _key: string;
      _type: string;
      href?: string;
    }>;
    style?: string;
  }>;
};

export type CaseStudyImageSection = {
  _type: "imageSection";
  asset: {
    _id: string;
    url: string;
    altText?: string;
  };
};

export type CaseStudySvelteSection = {
  _type: "svelteComponent";
  componentType: string;
};

export type CaseStudySection = CaseStudyTextSection | CaseStudyImageSection | CaseStudySvelteSection;

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  clientName?: string;
  projectDate?: string;
  featuredImage: {
    asset: { _ref: string };
    alt: string;
  };
  galleryImages?: Array<{
    asset: { _ref: string };
    alt: string;
    caption?: string;
  }>;
  sections?: Array<CaseStudySection>;
  technologies?: string[];
  tags?: string[];
  websiteUrl?: string;
  githubUrl?: string;
};

export type CaseStudyListingsSection = {
  _type: "caseStudyListings";
  header?: string;
  subheading?: string;
  selectedCaseStudies: Array<{
    caseStudy: CaseStudy;
  }>;
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  viewAllButtonUrl?: string;
};

export type ContactFormSection = {
  _type: "contactForm";
  headline?: string;
  description?: string;
  tagline?: string;
  taglineIcon?: string;
  supportLinks?: Array<{
    label: string;
    icon: string;
    href?: string;
  }>;
};

export type Testimonial1Section = {
  _type: "testimonial1";
  quote?: string;
  customerName?: string;
  companyName?: string;
  alignment?: "center" | "left";
  showBorders?: boolean;
  customerUrl?: string;
  companyUrl?: string;
};

export type Section =
  | Hero
  | Feature1Section
  | HomeHeroSvelteSection
  | FruitLabelSkillsSection
  | CaseStudyListingsSection
  | ContactFormSection
  | Testimonial1Section; // Add this line

export type PageListItem = {
  _id: string;
  title: string;
  slug: string;
};

export type PageDetail = {
  _id: string;
  title: string;
  slug: string;
  sections?: Section[];
};

export type SiteHead = {
  title?: string;
  favicon?: {
    asset?: { _ref?: string };
    assetUrl?: string;
    assetMimeType?: string;
    assetExt?: string;
    alt?: string;
  };
};

// Navigation types
export type NavStyle = "primary" | "secondary";

export type NavItem = {
  label: string;
  href: string;
  style: NavStyle;
};

export type SiteNavigation = {
  navigation?: NavItem[];
};
