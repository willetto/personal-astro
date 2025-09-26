/**
 * Convert line breaks in text to HTML <br> tags
 * This allows Sanity text fields with line breaks to render properly in HTML
 */
export function convertLineBreaksToHtml(text: string | undefined | null): string {
  if (!text) return '';
  
  // Convert \n and \r\n to <br> tags
  return text
    .replace(/\r\n/g, '<br>')
    .replace(/\n/g, '<br>')
    .replace(/\r/g, '<br>');
}

/**
 * Preserve line breaks using CSS white-space property
 * Alternative approach that doesn't require HTML conversion
 */
export function preserveLineBreaks(text: string | undefined | null): string {
  if (!text) return '';
  return text;
}
