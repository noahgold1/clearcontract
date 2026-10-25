import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ClearContract. A contract clause struck through in red, with what it actually means written underneath in plain English.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Carbon-copy palette, same values the site uses. */
const INK = "#16171B";
const BOND = "#F5F4EF";
const CANARY = "#F0DE4E";
const REDLINE = "#D62E22";

/**
 * The share card does the demo rather than describing it: one real clause,
 * struck, and the plain-English version underneath. Satori only does flex,
 * so the strike is an absolutely positioned bar inside a fixed-width,
 * nowrap row — the text is sized to fill that row, which keeps the bar
 * sitting on the words instead of overhanging them.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BOND,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Canary gutter stripe, the one bit of color the site leans on. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "18px",
            height: "100%",
            background: CANARY,
            display: "flex",
          }}
        />

        {/* Masthead */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              background: CANARY,
              borderRadius: "7px",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            ClearContract
          </div>
        </div>

        {/* The demo */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "rgba(22,23,27,0.45)",
              letterSpacing: "0.16em",
              marginBottom: "14px",
              display: "flex",
            }}
          >
            WHAT IT SAYS
          </div>

          {/* alignItems:flex-start lets the row shrink to the text, so the
              bar below can span exactly the words via left/right instead of
              a hardcoded width that stops short of the last letter. */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "40px",
            }}
          >
            <div style={{ position: "relative", display: "flex" }}>
              <div
                style={{
                  fontSize: "29px",
                  color: "rgba(22,23,27,0.62)",
                  whiteSpace: "nowrap",
                  display: "flex",
                }}
              >
                Company may terminate this Agreement at its sole and absolute discretion.
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "-7px",
                  right: "-7px",
                  top: "16px",
                  height: "5px",
                  background: REDLINE,
                  display: "flex",
                }}
              />
            </div>
          </div>

          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "rgba(22,23,27,0.45)",
              letterSpacing: "0.16em",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            WHAT IT MEANS
          </div>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 800,
              color: INK,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>They can end it whenever</div>
            <div style={{ display: "flex" }}>they want. No reason needed.</div>
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `2px solid ${INK}`,
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "21px",
              color: "rgba(22,23,27,0.72)",
              display: "flex",
            }}
          >
            Every clause in a contract, in plain English.
          </div>
          <div
            style={{
              fontSize: "21px",
              fontWeight: 700,
              color: INK,
              display: "flex",
            }}
          >
            clrct.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
