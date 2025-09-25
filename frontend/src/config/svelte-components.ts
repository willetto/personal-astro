/**
 * Centralized configuration for available Svelte components
 * Edit this file to add/remove/modify available Svelte components
 */

export interface SvelteComponentConfig {
  key: string;
  title: string;
  path: string;
}

export const AVAILABLE_SVELTE_COMPONENTS: SvelteComponentConfig[] = [
  {
    key: "heroHome", 
    title: "Hero Home",
    path: "hero-home.svelte"
  },
  {
    key: "infolkSlider",
    title: "Infolk Slider", 
    path: "InfolkSlider/InfolkSlider.svelte"
  }
];

/**
 * Get component config by key
 */
export function getSvelteComponentConfig(key: string): SvelteComponentConfig | undefined {
  return AVAILABLE_SVELTE_COMPONENTS.find(component => component.key === key);
}

/**
 * Get all component options for Sanity dropdown
 */
export function getSvelteComponentOptions() {
  return AVAILABLE_SVELTE_COMPONENTS.map(component => ({
    title: component.title,
    value: component.key
  }));
}
