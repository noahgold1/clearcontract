/**
 * PDF text extraction.
 *
 * Uses unpdf, which ships a current pdf.js. The previous library (pdf-parse
 * 1.1.x) bundles a 2018 pdf.js that throws "bad XRef entry" on PDFs with
 * compressed cross-reference streams, which most modern exporters produce.
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  let text = "";

  try {
    const { extractText, getDocumentProxy } = await import("unpdf");
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const result = await extractText(pdf, { mergePages: true });
    text = (Array.isArray(result.text) ? result.text.join("\n") : result.text).trim();
  } catch (err) {
    const detail = err instanceof Error ? ` (${err.message})` : "";
    throw new Error(
      `That PDF could not be read${detail}. If it is a scan or a photo of a page, use the Photo option instead, or paste the text.`
    );
  }

  if (!text) {
    throw new Error(
      "No extractable text found in this PDF. It is probably a scan, so use the Photo option instead, or paste the text."
    );
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
