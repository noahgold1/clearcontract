/**
 * Server-side PDF text extraction using pdf-parse.
 * Only call from API routes or Server Components — never from client code.
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import to keep this server-side only
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  const text = data.text.trim();
  if (!text) {
    throw new Error("No extractable text found in this PDF. It may be a scanned image.");
  }
  return text;
}

export function truncateToTokenLimit(text: string, maxChars = 80000): string {
  if (text.length <= maxChars) return text;
  return (
    text.slice(0, maxChars) +
    "\n\n[Contract truncated due to length. Analysis covers the first portion.]"
  );
}
