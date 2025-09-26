import { page } from "./page";
import { portableText } from "./portable-text";
import { siteSettings } from "./site-settings";
import { caseStudy } from "./case-study";
import { hero1 } from "./sections/hero1";
import { hero2 } from "./sections/hero2";
import { feature1 } from "./sections/feature1";
import { homeHeroSvelte } from "./sections/homeHeroSvelte";
import { fruitLabelSkills } from "./sections/fruitLabelSkills";
import { caseStudyListings } from "./sections/caseStudyListings";
import { cta } from "./elements/cta";
import { navItem } from "./elements/navItem";
import { contactForm } from "./sections/contactForm"; // Import the new contactForm schema
import { svelteComponent } from "./sections/svelteComponent";
import { testimonial1 } from "./sections/testimonial1";

export const schemaTypes = [
  siteSettings,
  page,
  portableText,
  caseStudy,
  // Elements
  cta,
  navItem,
  // Sections
  hero1,
  hero2,
  feature1,
  homeHeroSvelte,
  fruitLabelSkills,
  caseStudyListings,
  contactForm, // Add the new contactForm schema
  svelteComponent,
  testimonial1,
];
