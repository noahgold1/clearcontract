"use client";

import { useState, useRef, useEffect } from "react";
import { ContractCrawler } from "./ContractCrawler";
import { ClauseCard } from "./ClauseCard";
import { DownloadPDF } from "./DownloadPDF";
import { AUDIENCE_MODES, type AudienceMode, type ClauseResult } from "@/lib/prompts";

/* Results are grouped by what a clause costs you rather than listed in
   document order, so the things worth acting on are the things on screen. */
const TIERS = [
  {
    key: "risk" as const,
    label: "Risk",
    blurb: "These cost you money, work, or rights.",
    badge: "text-[#FF7A6B] border-[#FF7A6B]",
  },
  {
    key: "unusual" as const,
    label: "Unusual",
    blurb: "Not standard. Worth reading twice.",
    badge: "text-[#F0DE4E] border-[#F0DE4E]",
  },
  {
    key: "standard" as const,
    label: "Standard",
    blurb: "Ordinary language. Nothing to do here.",
    badge: "text-[#8B8E96] border-[#4A4D55]",
  },
];

const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
  "Eight", "Nine", "Ten", "Eleven", "Twelve"];
function numberWord(n: number) {
  return n < WORDS.length ? WORDS[n] : String(n);
}

type InputMethod = "paste" | "upload" | "photo";
type FilterStatus = "all" | "risk" | "unusual" | "standard";

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111116] p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-3.5 w-2/5 bg-white/[0.07] rounded" />
        <div className="h-5 w-16 bg-white/[0.07] rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-2.5 w-full bg-white/[0.05] rounded" />
        <div className="h-2.5 w-5/6 bg-white/[0.05] rounded" />
        <div className="h-2.5 w-4/6 bg-white/[0.05] rounded" />
      </div>
    </div>
  );
}

export function ContractAnalyzer() {
  const [inputMethod, setInputMethod] = useState<InputMethod>("paste");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<AudienceMode>("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clauses, setClauses] = useState<ClauseResult[] | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");


  const workingRef = useRef<HTMLDivElement>(null);

  // Bring the reading view on screen when a run starts; the button that
  // starts it sits at the bottom of a long form.
  useEffect(() => {
    if (!loading) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    workingRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [loading]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setPhoto(f);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(f ? URL.createObjectURL(f) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setClauses(null);
    setFilter("all");
    setLoading(true);

    try {
      let res: Response;
      if (inputMethod === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mode", mode);
        res = await fetch("/api/analyze", { method: "POST", body: formData });
      } else if (inputMethod === "photo" && photo) {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("mode", mode);
        res = await fetch("/api/analyze", { method: "POST", body: formData });
      } else {
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, mode }),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setClauses(data.clauses);
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }


  const riskCount = clauses?.filter((c) => c.status === "risk").length ?? 0;
  const unusualCount = clauses?.filter((c) => c.status === "unusual").length ?? 0;
  const standardCount = clauses?.filter((c) => c.status === "standard").length ?? 0;
  const totalCount = clauses?.length ?? 0;

  const filteredClauses = clauses?.filter((c) => filter === "all" || c.status === filter) ?? [];

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const filterTabs: {
    key: FilterStatus;
    label: string;
    count: number;
    color: string;
    active: string;
  }[] = [
    { key: "all", label: "All", count: totalCount, color: "text-zinc-400", active: "bg-white/[0.08] text-white border-white/[0.15]" },
    { key: "risk", label: "Risk", count: riskCount, color: "text-red-400", active: "bg-red-500/10 text-red-300 border-red-500/30" },
    { key: "unusual", label: "Unusual", count: unusualCount, color: "text-amber-400", active: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
    { key: "standard", label: "Standard", count: standardCount, color: "text-emerald-400", active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  ];

  const inputMethodTabs: { key: InputMethod; label: string }[] = [
    { key: "paste", label: "Paste Text" },
    { key: "upload", label: "Upload PDF" },
    { key: "photo", label: "Photo" },
  ];

  const submitDisabled =
    loading ||
    (inputMethod === "paste"
      ? !text.trim()
      : inputMethod === "upload"
      ? !file
      : !photo);

  return (
    <div className="space-y-5">
      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Mode selector */}
        <div className="cc-block">
          <span className="cc-tag cc-block-lab">Who is reading it</span>
          <div className="cc-lenses" role="tablist" aria-label="Reader">
            {(
              Object.entries(AUDIENCE_MODES) as [
                AudienceMode,
                (typeof AUDIENCE_MODES)[AudienceMode]
              ][]
            ).map(([key, info]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => setMode(key)}
                className="cc-lens"
              >
                {info.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input method */}
        <div className="cc-block">
          <span className="cc-tag cc-block-lab">How you want to give it to us</span>
          <div className="cc-modes" role="tablist" aria-label="Input method">
            {inputMethodTabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={inputMethod === key}
                onClick={() => setInputMethod(key)}
                className="cc-mode"
              >
                {label}
              </button>
            ))}
          </div>

          {inputMethod === "paste" && (
            <div className="cc-sheet">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the whole thing here. Section headings help, but it will work without them."
              />
              <div className="cc-sheet-foot">
                {charCount > 0 && <span>{wordCount.toLocaleString()} words</span>}
              </div>
            </div>
          )}

          {inputMethod === "upload" && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-white/[0.1] rounded-xl p-10 text-center cursor-pointer hover:border-white/40 hover:bg-white/[0.03] transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {file ? (
                <div className="space-y-1.5">
                  <div className="text-3xl">📄</div>
                  <p className="font-medium text-zinc-200 text-sm">{file.name}</p>
                  <p className="text-zinc-600 text-xs">
                    {(file.size / 1024).toFixed(1)} KB ·{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl">⬆️</div>
                  <p className="font-medium text-zinc-400 text-sm">Click to upload a PDF</p>
                  <p className="text-zinc-600 text-xs">PDF files only · Max 10MB</p>
                </div>
              )}
            </div>
          )}

          {inputMethod === "photo" && (
            <div
              onClick={() => photoInputRef.current?.click()}
              className="border border-dashed border-white/[0.1] rounded-xl p-10 text-center cursor-pointer hover:border-white/40 hover:bg-white/[0.03] transition-all"
            >
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                // `capture="environment"` hints mobile browsers to open the
                // rear camera directly. Desktop browsers ignore it and open
                // the standard file picker.
                capture="environment"
                className="hidden"
                onChange={handlePhotoChange}
              />
              {photo && photoPreview ? (
                <div className="space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreview}
                    alt="Contract preview"
                    className="max-h-64 mx-auto rounded-lg border border-white/[0.07]"
                  />
                  <p className="text-zinc-500 text-xs">
                    {photo.name} · {(photo.size / 1024).toFixed(1)} KB ·{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhoto(null);
                        if (photoPreview) URL.revokeObjectURL(photoPreview);
                        setPhotoPreview(null);
                        if (photoInputRef.current) photoInputRef.current.value = "";
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl">📸</div>
                  <p className="font-medium text-zinc-400 text-sm">Take or upload a photo</p>
                  <p className="text-zinc-600 text-xs">
                    JPG, PNG, WEBP · Max 10MB · Make sure the text is legible
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="cc-actions">
          <button type="submit" disabled={submitDisabled} className="cc-btn">
            {loading ? "Reading it…" : "Read it"}
            {!loading && <span className="cc-ar">&rarr;</span>}
          </button>
          <span className="cc-note-small">Not legal advice.</span>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="cc-err">
          <p>{error}</p>
        </div>
      )}

      {/* Working */}
      {loading && (
        <div className="cc-working" ref={workingRef}>
          <span className="cc-tag" style={{ opacity: 0.55 }}>
            Reading
          </span>
          <div className="cc-work-now">Going through it clause by clause</div>
          <ContractCrawler
            text={inputMethod === "paste" ? text : undefined}
            imageSrc={inputMethod === "photo" ? photoPreview : null}
            label={
              inputMethod === "upload" && file
                ? file.name
                : inputMethod === "photo" && photo
                ? photo.name
                : "Your contract"
            }
          />
        </div>
      )}

      {/* Results */}
      {clauses && clauses.length > 0 && (
        <div ref={resultsRef}>
          {/* Verdict: the answer before the evidence */}
          <div className="cc-verdict">
            <span className="cc-tag cc-v-meta">
              {clauses.length} clauses &nbsp;/&nbsp; {AUDIENCE_MODES[mode].label}
            </span>
            <h2 className="cc-v-head">
              {riskCount > 0 ? (
                <>
                  <em>{numberWord(riskCount)}</em>{" "}
                  {riskCount === 1 ? "clause takes" : "clauses take"} something from you.
                </>
              ) : unusualCount > 0 ? (
                <>
                  Nothing here is alarming, but {numberWord(unusualCount).toLowerCase()}{" "}
                  {unusualCount === 1 ? "is" : "are"} worth reading twice.
                </>
              ) : (
                <>This one reads clean.</>
              )}
            </h2>
            <div className="cc-v-actions">
              <DownloadPDF clauses={clauses} mode={mode} />
            </div>
          </div>

          {/* Grouped by what it costs you. Risk open, the rest folded away. */}
          {TIERS.map((tier) => {
            const items = clauses.filter((c) => c.status === tier.key);
            if (items.length === 0) return null;
            return (
              <details
                key={tier.key}
                open={tier.key === "risk"}
                className={`cc-group cc-g-${tier.key}`}
              >
                <summary className="cc-g-head">
                  <span className="cc-g-chev">&rsaquo;</span>
                  <span className="cc-g-name">{tier.label}</span>
                  <span className="cc-g-count">{items.length}</span>
                  <span className="cc-g-blurb">{tier.blurb}</span>
                </summary>
                <div className="cc-g-body">
                  {items.map((clause, i) => (
                    <ClauseCard key={`${tier.key}-${i}`} clause={clause} />
                  ))}
                </div>
              </details>
            );
          })}


        </div>
      )}
    </div>
  );
}
