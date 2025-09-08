export type LinkTarget = "" | "_blank" | "_self" | "_parent" | "_top";

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
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  features?: Feature1Item[];
};

export type HomeHeroSvelteSection = {
  _type: "homeHeroSvelte";
};

export type FruitLabelSkillsSection = {
  _type: "fruitLabelSkills";
};

export type Section =
  | Hero
  | Feature1Section
  | HomeHeroSvelteSection
  | FruitLabelSkillsSection;

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
