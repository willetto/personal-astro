export function normalizeTag(tag: string): string {
  return String(tag || "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type TagOption = {
  label: string;
  slug: string;
};

export function uniqueTagOptions(tags: string[]): TagOption[] {
  const map = new Map<string, string>();

  for (const rawTag of tags) {
    const label = String(rawTag || "").trim();
    const slug = normalizeTag(label);
    if (!slug || map.has(slug)) continue;
    map.set(slug, label);
  }

  return Array.from(map.entries()).map(([slug, label]) => ({ slug, label }));
}
