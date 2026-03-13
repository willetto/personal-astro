import { codeToHtml } from "shiki";

const LANGUAGE_MAP: Record<string, string> = {
  js: "javascript",
  javascript: "javascript",
  ts: "typescript",
  typescript: "typescript",
  html: "html",
  css: "css",
};

const FALLBACK_LANGUAGE = "typescript";

export async function highlightCode(code: string, language?: string): Promise<string> {
  const normalizedLanguage = LANGUAGE_MAP[String(language || "").toLowerCase()] || FALLBACK_LANGUAGE;

  return codeToHtml(code ?? "", {
    lang: normalizedLanguage,
    theme: "css-variables",
  });
}
