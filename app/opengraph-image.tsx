import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ClearContract — AI Contract Analyzer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(99,102,241,0.4)",
            background: "rgba(99,102,241,0.1)",
            color: "#a5b4fc",
            fontSize: "16px",
            fontWeight: 600,
            padding: "8px 20px",
            borderRadius: "100px",
            marginBottom: "32px",
            letterSpacing: "0.05em",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#818cf8",
            }}
          />
          Powered by Claude AI
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          Know exactly what
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "28px",
            background: "linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 45%, #7c3aed 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          you're signing
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: "24px",
            color: "#71717a",
            textAlign: "center",
            maxWidth: "680px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}
        >
          AI-powered contract analysis. Plain-English clause breakdowns, risk flags, and insights — in seconds.
        </div>

        {/* Pills row */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Freelancer", "Employee", "Business", "Tenant"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#a1a1aa",
                fontSize: "14px",
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: "8px",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            right: "40px",
            color: "#3f3f46",
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: "monospace",
          }}
        >
          clearcontract-two.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
