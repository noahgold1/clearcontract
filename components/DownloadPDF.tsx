"use client";

import type { ClauseResult, AudienceMode } from "@/lib/prompts";
import { AUDIENCE_MODES } from "@/lib/prompts";

interface DownloadPDFProps {
  clauses: ClauseResult[];
  mode: AudienceMode;
}

export function DownloadPDF({ clauses, mode }: DownloadPDFProps) {
  async function handleDownload() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const addPage = () => { doc.addPage(); y = margin; };
    const checkPage = (needed: number) => { if (y + needed > pageHeight - margin) addPage(); };

    // Dark header bar
    doc.setFillColor(9, 9, 11);
    doc.rect(0, 0, pageWidth, 32, "F");
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, 3, 32, "F");
    doc.setTextColor(250, 250, 250);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("ClearContract", margin, 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(161, 161, 170);
    doc.text("Contract Analysis Report", margin, 22);
    y = 42;

    // Meta row
    doc.setTextColor(113, 113, 122);
    doc.setFontSize(8.5);
    const modeLabel = AUDIENCE_MODES[mode]?.label ?? mode;
    doc.text(`Audience: ${modeLabel}`, margin, y);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, margin + 80, y);
    y += 5;

    // Divider
    doc.setDrawColor(39, 39, 42);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;

    // Disclaimer
    doc.setFillColor(254, 243, 199, 0.3);
    doc.setFillColor(41, 35, 15);
    doc.setDrawColor(92, 59, 0);
    doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, "FD");
    doc.setTextColor(217, 119, 6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("For informational purposes only. Not legal advice. Consult a qualified attorney for legal matters.", margin + 3, y + 6);
    y += 15;

    // Summary
    const counts = clauses.reduce((acc, c) => { acc[c.status] = (acc[c.status] ?? 0) + 1; return acc; }, {} as Record<string, number>);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(250, 250, 250);
    doc.text(`${clauses.length} Clauses Analyzed`, margin, y);
    y += 7;

    const summaryItems = [
      { label: "Standard", count: counts["standard"] ?? 0, color: [52, 211, 153] as [number, number, number] },
      { label: "Unusual",  count: counts["unusual"]  ?? 0, color: [251, 191, 36] as [number, number, number] },
      { label: "Risk",     count: counts["risk"]     ?? 0, color: [248, 113, 113] as [number, number, number] },
    ];
    let sx = margin;
    for (const { label, count, color } of summaryItems) {
      doc.setFillColor(...color);
      doc.circle(sx + 2.5, y + 2, 2, "F");
      doc.setTextColor(161, 161, 170);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`${count} ${label}`, sx + 6.5, y + 4);
      sx += 38;
    }
    y += 12;

    // Clause cards
    for (const clause of clauses) {
      const bgColors: Record<string, [number,number,number]> = {
        standard: [13, 20, 16],
        unusual:  [20, 16, 10],
        risk:     [20, 11, 11],
      };
      const borderColors: Record<string, [number,number,number]> = {
        standard: [34, 90, 60],
        unusual:  [90, 65, 10],
        risk:     [100, 30, 30],
      };
      const badgeColors: Record<string, [number,number,number]> = {
        standard: [52, 211, 153],
        unusual:  [251, 191, 36],
        risk:     [248, 113, 113],
      };

      const titleLines = doc.splitTextToSize(clause.title, contentWidth - 45);
      const plainLines = doc.splitTextToSize(clause.plain, contentWidth - 6);
      const flagLines  = clause.flag ? doc.splitTextToSize(clause.flag, contentWidth - 14) : [];
      const blockH = 6 + titleLines.length * 5 + 3 + plainLines.length * 4.5 + (flagLines.length ? 5 + flagLines.length * 4.2 : 0) + 5;

      checkPage(blockH);

      doc.setFillColor(...(bgColors[clause.status] ?? bgColors.standard));
      doc.setDrawColor(...(borderColors[clause.status] ?? borderColors.standard));
      doc.roundedRect(margin, y, contentWidth, blockH, 2.5, 2.5, "FD");

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(240, 240, 255);
      doc.text(titleLines, margin + 3.5, y + 7);

      // Badge
      const bColor = badgeColors[clause.status] ?? badgeColors.standard;
      const bLabel = clause.status === "standard" ? "Standard" : clause.status === "unusual" ? "Unusual" : "Risk";
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      const bw = doc.getTextWidth(bLabel) + 5;
      doc.setFillColor(...bColor);
      doc.roundedRect(margin + contentWidth - bw - 3, y + 3.5, bw, 5.5, 1.2, 1.2, "F");
      doc.setTextColor(9, 9, 11);
      doc.text(bLabel, margin + contentWidth - bw - 0.5, y + 7.8);

      let cy = y + 7 + titleLines.length * 5;

      // Plain text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(161, 161, 170);
      doc.text(plainLines, margin + 3.5, cy);
      cy += plainLines.length * 4.5;

      // Flag
      if (clause.flag && flagLines.length) {
        cy += 3;
        doc.setFont("helvetica", "bolditalic");
        doc.setFontSize(8);
        doc.setTextColor(...bColor);
        doc.text(`⚑  ${flagLines[0]}`, margin + 5, cy);
        if (flagLines.length > 1) {
          doc.setFont("helvetica", "italic");
          for (let i = 1; i < flagLines.length; i++) { cy += 4.2; doc.text(flagLines[i], margin + 9, cy); }
        }
      }

      y += blockH + 3;
    }

    // Page footers
    const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(9, 9, 11);
      doc.rect(0, pageHeight - 12, pageWidth, 12, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(63, 63, 70);
      doc.text(`ClearContract · For informational purposes only, not legal advice · Page ${i} of ${totalPages}`, margin, pageHeight - 5);
    }

    doc.save(`clearcontract-${mode}-${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] text-zinc-300 text-sm font-medium px-4 py-2 rounded-lg transition-all"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download PDF
    </button>
  );
}
