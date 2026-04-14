"use client";

import type { ClauseResult } from "@/lib/prompts";
import type { AudienceMode } from "@/lib/prompts";
import { AUDIENCE_MODES } from "@/lib/prompts";

interface DownloadPDFProps {
  clauses: ClauseResult[];
  mode: AudienceMode;
}

export function DownloadPDF({ clauses, mode }: DownloadPDFProps) {
  async function handleDownload() {
    // Dynamic import keeps jspdf out of the initial bundle
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const addPage = () => {
      doc.addPage();
      y = margin;
    };

    const checkPage = (needed: number) => {
      if (y + needed > pageHeight - margin) addPage();
    };

    // Header
    doc.setFillColor(37, 99, 235); // blue-600
    doc.rect(0, 0, pageWidth, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("ClearContract — Analysis Report", margin, 17);
    y = 36;

    // Meta
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const modeLabel = AUDIENCE_MODES[mode]?.label ?? mode;
    doc.text(`Audience: ${modeLabel}`, margin, y);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, y);
    y += 6;

    // Disclaimer
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(217, 119, 6);
    doc.roundedRect(margin, y, contentWidth, 10, 2, 2, "FD");
    doc.setTextColor(146, 64, 14);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(
      "For informational purposes only. Not legal advice. Consult a qualified attorney for legal matters.",
      margin + 3,
      y + 6.5
    );
    y += 16;

    // Summary counts
    const counts = clauses.reduce(
      (acc, c) => {
        acc[c.status] = (acc[c.status] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Summary", margin, y);
    y += 6;

    const summaryItems = [
      { label: "Standard", count: counts["standard"] ?? 0, color: [34, 197, 94] as [number, number, number] },
      { label: "Unusual", count: counts["unusual"] ?? 0, color: [234, 179, 8] as [number, number, number] },
      { label: "Risk", count: counts["risk"] ?? 0, color: [239, 68, 68] as [number, number, number] },
    ];

    let sx = margin;
    for (const { label, count, color } of summaryItems) {
      doc.setFillColor(...color);
      doc.circle(sx + 3, y + 2.5, 2, "F");
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`${count} ${label}`, sx + 7, y + 4);
      sx += 40;
    }
    y += 12;

    // Clause cards
    for (const clause of clauses) {
      const statusColors: Record<string, [number, number, number]> = {
        standard: [240, 253, 244],
        unusual: [254, 252, 232],
        risk: [254, 242, 242],
      };
      const borderColors: Record<string, [number, number, number]> = {
        standard: [187, 247, 208],
        unusual: [253, 230, 138],
        risk: [254, 202, 202],
      };
      const badgeColors: Record<string, [number, number, number]> = {
        standard: [34, 197, 94],
        unusual: [234, 179, 8],
        risk: [239, 68, 68],
      };

      // Estimate block height
      const titleLines = doc.splitTextToSize(clause.title, contentWidth - 50);
      const plainLines = doc.splitTextToSize(clause.plain, contentWidth - 6);
      const flagLines = clause.flag ? doc.splitTextToSize(clause.flag, contentWidth - 16) : [];
      const blockH =
        5 +
        titleLines.length * 5 +
        3 +
        plainLines.length * 4.5 +
        (flagLines.length ? 4 + flagLines.length * 4.5 : 0) +
        5;

      checkPage(blockH);

      const bg = statusColors[clause.status] ?? [240, 253, 244];
      const border = borderColors[clause.status] ?? [187, 247, 208];

      doc.setFillColor(...bg);
      doc.setDrawColor(...border);
      doc.roundedRect(margin, y, contentWidth, blockH, 3, 3, "FD");

      // Title
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(titleLines, margin + 3, y + 8);

      // Badge
      const badgeColor = badgeColors[clause.status] ?? [34, 197, 94];
      const badgeLabel =
        clause.status === "standard"
          ? "Standard"
          : clause.status === "unusual"
          ? "Unusual"
          : "Risk";
      doc.setFillColor(...badgeColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      const badgeW = doc.getTextWidth(badgeLabel) + 6;
      doc.roundedRect(
        margin + contentWidth - badgeW - 3,
        y + 4,
        badgeW,
        6,
        1.5,
        1.5,
        "F"
      );
      doc.text(badgeLabel, margin + contentWidth - badgeW, y + 8.5);

      let cy = y + 8 + titleLines.length * 5 + 1;

      // Plain text
      doc.setTextColor(55, 65, 81);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(plainLines, margin + 3, cy);
      cy += plainLines.length * 4.5;

      // Flag
      if (clause.flag && flagLines.length) {
        cy += 2;
        doc.setTextColor(127, 29, 29);
        doc.setFont("helvetica", "bolditalic");
        doc.setFontSize(8.5);
        doc.text(`⚑ ${flagLines[0]}`, margin + 5, cy);
        if (flagLines.length > 1) {
          doc.setFont("helvetica", "italic");
          for (let i = 1; i < flagLines.length; i++) {
            cy += 4;
            doc.text(flagLines[i], margin + 8, cy);
          }
        }
      }

      y += blockH + 3;
    }

    // Footer on last page
    const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        `ClearContract — For informational purposes only, not legal advice. Page ${i} of ${totalPages}`,
        margin,
        pageHeight - 8
      );
    }

    doc.save(`clearcontract-analysis-${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Download PDF
    </button>
  );
}
