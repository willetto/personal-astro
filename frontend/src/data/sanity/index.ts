export type LinkTarget = "" | "_blank" | "_self" | "_parent" | "_top";

export type Hero = {
  _type: "hero1" | "hero2";
  header?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  primaryCtaTarget?: LinkTarget;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaTarget?: LinkTarget;
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
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  primaryCtaTarget?: LinkTarget;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaTarget?: LinkTarget;
  features?: Feature1Item[];
};

export type Section = Hero | Feature1Section;

export type SiteHead = {
  siteTitle?: string;
  favicon?: {
    asset?: { _ref?: string };
    assetUrl?: string;
    assetMimeType?: string;
    assetExt?: string;
    alt?: string;
  };
};
