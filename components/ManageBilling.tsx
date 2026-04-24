"use client";

import { useState } from "react";

export function ManageBilling() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-portal-session", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Unable to open billing portal.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={openPortal}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.2] text-zinc-300 text-xs sm:text-sm font-medium px-3 py-1.5 transition-all disabled:opacity-50"
      >
        {loading ? "Opening…" : "Manage subscription"}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </>
  );
}
