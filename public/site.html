"use client";
/* ============================================================================
   ClearContract landing page. Everything is in this one file on purpose:
   styles, content, and components, so it drops in with no other changes.

   Save as: app/page.tsx        (keep a copy of your old one first)

   Nothing else to install. Every class is cc- prefixed and scoped under
   .cc-root, so it cannot collide with Tailwind, globals.css, or your
   existing components. Your Navbar and Footer still work: put them around
   <div className="cc-root"> below.
   ============================================================================ */
import { useCallback, useEffect, useRef, useState } from "react";

const CC_CSS = `/* ClearContract landing theme.
   Every class is cc- prefixed and everything lives under .cc-root, so this
   cannot collide with Tailwind, globals.css, or your existing components.
   Fonts load from Google here for zero setup; move them to next/font later. */
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,700;12..96,75..100,800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;700&family=Newsreader:ital,wght@0,400;1,400&display=swap');

.cc-root{
  --ink:#16171B; --ink-2:#22242A; --ink-3:#33363E;
  --bond:#F5F4EF; --bond-2:#E6E4DB;
  --canary:#F0DE4E; --canary-2:#DCC93A; --pink:#F0B7C3;
  --redline:#D62E22; --redline-d:#A81C13; --redline-lt:#FF7A6B;
  --display:"Bricolage Grotesque",system-ui,sans-serif;
  --sans:"Instrument Sans",system-ui,sans-serif;
  --legal:"Newsreader",Georgia,serif;
  --mono:"JetBrains Mono",ui-monospace,monospace;
  --pad:clamp(20px,5vw,72px);
  --rule:1px solid var(--ink);
  background:var(--bond); color:var(--ink);
  font-family:var(--sans); font-size:17px; line-height:1.55;
  -webkit-font-smoothing:antialiased;
}
.cc-root *{box-sizing:border-box;margin:0;padding:0}
.cc-root a{color:inherit;text-decoration:none}
.cc-root ::selection{background:var(--canary);color:var(--ink)}
.cc-root :focus-visible{outline:3px solid var(--redline);outline-offset:2px}
.cc-reader :focus-visible,.cc-sign :focus-visible,.cc-foot :focus-visible{outline-color:var(--canary)}

/* base pieces the sections rely on */
.cc-wrap{max-width:1240px;margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
.cc-tag{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:700}
.cc-btn{
  display:inline-flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer;
  background:var(--ink);color:var(--bond);border:1px solid var(--ink);
  padding:15px 27px;font-family:var(--sans);font-weight:600;font-size:16px;
  transition:transform .18s,background .2s,border-color .2s
}
.cc-btn:hover:not(:disabled){background:var(--redline);border-color:var(--redline);transform:translate(-2px,-2px)}
.cc-btn:disabled{opacity:.38;cursor:default;transform:none}
.cc-btn .cc-ar{transition:transform .22s}
.cc-btn:hover:not(:disabled) .cc-ar{transform:translateX(4px)}
/* ============================================================
   SIGN : closing, ink
   ============================================================ */
.cc-sign{background:var(--ink);color:var(--bond);padding:clamp(72px,10vw,130px) 0}
.cc-sign h2{font-family:var(--display);font-weight:800;font-size:clamp(38px,8vw,96px);line-height:.97;letter-spacing:-.035em;max-width:19ch}
.cc-sign p{margin-top:22px;font-size:clamp(17px,2vw,20px);opacity:.75;max-width:42ch}
.cc-sign .cc-btn{background:var(--canary);color:var(--ink);border-color:var(--canary);margin-top:34px}
.cc-sign .cc-btn:hover{background:var(--bond);border-color:var(--bond)}
.cc-sign-fine{font-family:var(--mono);font-size:12px;opacity:.55;margin-top:16px}
.cc-sigline{margin-top:clamp(44px,6vw,70px);max-width:520px}
.cc-sigline svg{width:100%;height:auto;display:block}
.cc-sigline path{stroke:var(--canary);stroke-width:2.5;fill:none;stroke-linecap:round;
  stroke-dasharray:1400;stroke-dashoffset:1400;transition:stroke-dashoffset 1.9s cubic-bezier(.33,.9,.4,1)}
.cc-sigline.cc-in path{stroke-dashoffset:0}
.cc-sig-rule{border-top:1px solid var(--ink-3);margin-top:6px;padding-top:9px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.5}


.cc-root a.cc-btn{color:var(--bond)}
.cc-root .cc-sign a.cc-btn{color:var(--ink)}
.cc-root .cc-sign a.cc-btn:hover{color:var(--ink)}

/* ============================================================
   TOKENS : NCR carbon-form palette, shared by both views
   ============================================================ */



a{color:inherit}
[hidden]{display:none!important}
::selection{background:var(--canary);color:var(--ink)}


/* ============================================================
   HERO : canary field
   ============================================================ */
.cc-hero{background:var(--canary);border-bottom:var(--rule);position:relative;overflow:hidden}
.cc-hero-in{padding-top:clamp(44px,7vw,92px);padding-bottom:clamp(40px,6vw,72px);position:relative;z-index:2}
.cc-hero .cc-tag{color:var(--ink);opacity:.72;margin-bottom:22px;display:block}
h1{
  font-family:var(--display);font-weight:800;
  font-size:clamp(46px,10.5vw,132px);line-height:.9;letter-spacing:-.035em;
  max-width:13ch;
}
h1 .cc-ln{display:block;overflow:hidden}
h1 .cc-ln i{display:block;font-style:normal;transform:translateY(105%);transition:transform .82s cubic-bezier(.16,1,.3,1)}
.cc-loaded h1 .cc-ln i{transform:translateY(0)}
.cc-loaded h1 .cc-ln:nth-child(2) i{transition-delay:.09s}
.cc-hero-sub{
  font-size:clamp(17px,2.1vw,21px);max-width:46ch;margin-top:26px;line-height:1.5;
  opacity:0;transform:translateY(14px);transition:opacity .7s .34s,transform .7s .34s
}
.cc-loaded .cc-hero-sub{opacity:1;transform:none}
.cc-hero-act{display:flex;flex-wrap:wrap;align-items:center;gap:18px;margin-top:32px;opacity:0;transform:translateY(14px);transition:opacity .7s .46s,transform .7s .46s}
.cc-loaded .cc-hero-act{opacity:1;transform:none}
.cc-hero-fine{font-family:var(--mono);font-size:12px;letter-spacing:.02em;opacity:.66}

/* ambient: faint clause text washing behind the hero */
.cc-hero-ghost{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  font-family:var(--legal);font-size:15px;line-height:1.75;
  color:var(--ink);opacity:.075;padding:24px var(--pad);
  column-count:3;column-gap:34px;overflow:hidden;
  -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 34%,#000 70%,transparent 100%);
  mask-image:linear-gradient(180deg,transparent 0,#000 34%,#000 70%,transparent 100%);
}
@media(max-width:900px){.cc-hero-ghost{display:none}}


/* ============================================================
   SIGNATURE: the redline card
   ============================================================ */
.cc-rl{
  background:var(--bond);border:1px solid var(--ink);
  box-shadow:7px 7px 0 var(--ink);position:relative;
  padding:clamp(20px,3vw,34px);max-width:820px;
}
.cc-rl-head{display:flex;justify-content:space-between;align-items:center;gap:14px;border-bottom:1px dashed var(--ink);padding-bottom:12px;margin-bottom:20px}
.cc-rl-head .cc-tag{opacity:.62}
.cc-rl-legal{
  font-family:var(--legal);font-size:clamp(16px,2vw,20px);line-height:1.62;
  position:relative;display:inline;
}
.cc-rl-legalwrap{position:relative;transition:opacity .5s;margin-bottom:20px}
.cc-rl-legal,.cc-s-legal{
  background-image:linear-gradient(var(--redline),var(--redline));
  background-repeat:no-repeat;background-position:0 56%;background-size:0 2.5px;
  -webkit-box-decoration-break:clone;box-decoration-break:clone;
  transition:background-size .85s cubic-bezier(.65,0,.35,1);
}
.cc-rl.cc-go .cc-rl-legal{background-size:100% 2.5px}
.cc-rl.cc-go .cc-rl-legalwrap{opacity:.5}
.cc-rl-plain{
  font-size:clamp(18px,2.3vw,24px);font-weight:500;line-height:1.42;letter-spacing:-.015em;
  opacity:0;transform:translateY(12px);transition:opacity .6s .62s,transform .6s .62s;
}
.cc-rl.cc-go .cc-rl-plain{opacity:1;transform:none}
.cc-stamp{
  position:absolute;right:clamp(14px,3vw,26px);bottom:clamp(14px,3vw,26px);
  font-family:var(--mono);font-weight:700;font-size:13px;letter-spacing:.16em;
  border:2.5px solid var(--redline);color:var(--redline);padding:7px 13px;
  transform:rotate(-9deg) scale(2.2);opacity:0;
  transition:transform .42s cubic-bezier(.34,1.56,.64,1) .82s,opacity .18s .82s;
}
.cc-rl.cc-go .cc-stamp{transform:rotate(-9deg) scale(1);opacity:.92}
@media(max-width:640px){.cc-stamp{position:static;display:inline-block;margin-top:16px}}
.cc-hero .cc-rl{margin-top:clamp(40px,6vw,64px)}


/* ============================================================
   READER : ink field, clauses on a horizontal rail
   ============================================================ */
.cc-reader{background:var(--ink);color:var(--bond);padding-bottom:clamp(48px,7vw,88px)}
.cc-reader .cc-tag{color:var(--canary)}
.cc-reader-head{padding-top:clamp(56px,8vw,96px);padding-bottom:8px}
.cc-reader-head h2{font-family:var(--display);font-weight:800;font-size:clamp(32px,5.6vw,68px);line-height:1.03;letter-spacing:-.03em;max-width:17ch;margin-top:16px}
.cc-reader-head p{max-width:52ch;margin-top:18px;opacity:.72;font-size:17px}

.cc-rail{
  position:relative;display:flex;gap:clamp(14px,2vw,24px);
  --cw:min(540px,78vw);
  overflow-x:auto;overscroll-behavior-x:contain;
  scroll-snap-type:x mandatory;
  margin-top:clamp(30px,4vw,48px);padding-bottom:4px;
  padding-right:calc(100% - var(--cw));
  scrollbar-width:none;-ms-overflow-style:none;cursor:grab;
}
.cc-rail::-webkit-scrollbar{display:none}
.cc-rail.cc-drag{scroll-snap-type:none;cursor:grabbing;user-select:none}

.cc-card{
  flex:0 0 var(--cw);scroll-snap-align:start;
  background:var(--ink-2);border:1px solid var(--ink-3);
  padding:clamp(20px,2.6vw,32px);display:flex;flex-direction:column;
}
.cc-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.cc-sec-no{font-family:var(--mono);font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--canary)}
.cc-sec-name{font-family:var(--display);font-weight:700;font-size:clamp(21px,2.6vw,29px);letter-spacing:-.02em;margin-bottom:20px}
.cc-s-legal{font-family:var(--legal);font-size:clamp(15px,1.7vw,17px);line-height:1.62;color:#BFC0C4;
  background-image:linear-gradient(var(--redline-lt),var(--redline-lt))}
.cc-s-legalwrap{margin-bottom:20px;transition:opacity .5s .3s}
.cc-card.cc-on .cc-s-legalwrap{opacity:.62}
.cc-card.cc-on .cc-s-legal{background-size:100% 2.5px;transition-delay:.2s}
.cc-s-plain{font-size:clamp(17px,2vw,22px);font-weight:500;line-height:1.36;letter-spacing:-.016em;
  opacity:0;transform:translateY(10px);transition:opacity .5s .7s,transform .5s .7s}
.cc-card.cc-on .cc-s-plain{opacity:1;transform:none}
.cc-m-note{font-size:14px;line-height:1.5;opacity:0;margin-top:auto;padding-top:20px;
  border-top:1px solid var(--ink-3);transition:opacity .5s .95s}
.cc-card.cc-on .cc-m-note{opacity:.66}
.cc-m-note b{font-weight:600;opacity:1;color:var(--bond)}
.cc-m-badge{display:inline-block;text-transform:uppercase;font-family:var(--mono);font-size:11px;
  font-weight:700;letter-spacing:.15em;padding:5px 10px;border:2px solid}
.cc-m-badge.cc-risk{color:var(--redline-lt);border-color:var(--redline-lt)}
.cc-m-badge.cc-unusual{color:var(--canary);border-color:var(--canary)}
.cc-m-badge.cc-standard{color:#8B8E96;border-color:#4A4D55}

.cc-rail-ctl{display:flex;align-items:center;gap:clamp(10px,1.6vw,18px);margin-top:clamp(22px,3vw,34px)}
.cc-rnav{background:transparent;border:1px solid var(--ink-3);color:var(--bond);
  width:42px;height:42px;flex:0 0 auto;cursor:pointer;font-size:15px;line-height:1;
  display:flex;align-items:center;justify-content:center;
  transition:background .2s,border-color .2s,color .2s,opacity .2s}
.cc-rnav:hover:not(:disabled){background:var(--canary);border-color:var(--canary);color:var(--ink)}
.cc-rnav:disabled{opacity:.28;cursor:default}
.cc-pbar{display:flex;gap:5px;flex:1;min-width:80px}
.cc-pbar i{flex:1;height:3px;background:var(--ink-3);transition:background .35s}
.cc-pbar i.cc-on{background:var(--canary)}
.cc-counter{font-family:var(--mono);font-size:11px;letter-spacing:.14em;opacity:.5;white-space:nowrap}
.cc-counter #counterNow{color:var(--canary);opacity:1}
.cc-rail-hint{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.4;margin-top:14px}


/* ============================================================
   READS-FOR : bond, margin-note layout (no icon cards)
   ============================================================ */
.cc-reads{padding:clamp(64px,9vw,120px) 0;border-bottom:var(--rule)}
.cc-sec-title{font-family:var(--display);font-weight:800;font-size:clamp(32px,5.6vw,68px);line-height:1.03;letter-spacing:-.03em;margin-top:16px;max-width:16ch}
.cc-rows{margin-top:clamp(36px,5vw,60px);border-top:var(--rule)}
.cc-row{
  display:grid;grid-template-columns:64px minmax(0,1.05fr) minmax(0,1.15fr);
  gap:clamp(16px,3vw,40px);padding:clamp(24px,3.4vw,40px) 0;border-bottom:var(--rule);
  opacity:0;transform:translateY(26px);transition:opacity .62s,transform .62s;position:relative
}
.cc-row.cc-in{opacity:1;transform:none}
@media(max-width:820px){.cc-row{grid-template-columns:44px 1fr;}.cc-row-body{grid-column:2}}
.cc-row-no{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--redline-d);padding-top:6px}
.cc-row-h{font-family:var(--display);font-weight:700;font-size:clamp(21px,2.9vw,31px);line-height:1.08;letter-spacing:-.022em}
.cc-row-body{font-size:16px;line-height:1.6;opacity:.82;max-width:46ch}
.cc-row::after{content:"";position:absolute;left:0;bottom:-1px;height:3px;width:0;background:var(--canary);transition:width .5s}
.cc-row:hover::after{width:100%}


/* ============================================================
   LENS : same clause, five readers
   ============================================================ */
.cc-readers{padding:clamp(64px,9vw,120px) 0;border-bottom:var(--rule);background:var(--bond)}
.cc-rd-lead{max-width:54ch;margin-top:20px;font-size:17px;opacity:.82}
.cc-tabs{display:flex;flex-wrap:wrap;gap:0;margin-top:clamp(32px,4vw,48px);border:1px solid var(--ink);width:fit-content;max-width:100%}
.cc-tab{
  font-family:var(--mono);font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  background:transparent;border:0;border-right:1px solid var(--ink);padding:13px 17px;cursor:pointer;
  color:var(--ink);transition:background .2s,color .2s;position:relative
}
.cc-tab:last-child{border-right:0}
.cc-tab:hover{background:var(--bond-2)}
.cc-tab[aria-selected="true"]{background:var(--ink);color:var(--canary)}
@media(max-width:640px){.cc-tabs{border-bottom:0}.cc-tab{flex:1 1 auto;padding:12px 10px;font-size:11px;border-bottom:1px solid var(--ink)}}
.cc-rd-panel{margin-top:28px;max-width:900px;border:1px solid var(--ink);border-top:4px solid var(--ink);background:var(--bond);padding:clamp(20px,3vw,34px);position:relative}
.cc-rd-clause{font-family:var(--legal);font-size:clamp(15px,1.85vw,19px);line-height:1.64;padding-bottom:20px;margin-bottom:20px;border-bottom:1px dashed var(--ink);opacity:.62}
.cc-rd-out{min-height:96px}
.cc-rd-role{font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--redline-d);margin-bottom:10px}
.cc-rd-text{font-size:clamp(18px,2.3vw,25px);font-weight:500;line-height:1.36;letter-spacing:-.016em;min-height:1.36em}
.cc-caret{display:inline-block;width:9px;height:1.05em;background:var(--redline);vertical-align:-.16em;margin-left:2px;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}


/* ============================================================
   FAQ : same disclosure pattern as the analyzer
   ============================================================ */
.cc-faq{padding:clamp(56px,8vw,104px) 0;border-bottom:var(--rule)}
.cc-faq-list{margin-top:clamp(26px,4vw,42px);border-top:var(--rule)}
.cc-qa{border-bottom:var(--rule)}
.cc-qa summary{
  cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:14px;
  padding:22px 0;font-family:var(--display);font-weight:700;
  font-size:clamp(18px,2.4vw,25px);letter-spacing:-.022em;transition:opacity .18s
}
.cc-qa summary::-webkit-details-marker{display:none}
.cc-qa summary:hover{opacity:.66}
.cc-qa-chev{font-family:var(--mono);font-size:15px;opacity:.42;transition:transform .22s;flex:0 0 auto}
.cc-qa[open] .cc-qa-chev{transform:rotate(90deg)}
.cc-qa-a{padding:0 0 26px 30px;max-width:64ch;opacity:.8;font-size:16.5px;line-height:1.62}


/* ============================================================
   NOTICE : the limits, set like a rider clause in the margin
   ============================================================ */
.cc-notice{padding:clamp(56px,8vw,104px) 0;border-bottom:var(--rule)}
.cc-notice-block{
  border-left:3px solid var(--redline);padding-left:clamp(20px,3vw,34px);max-width:58ch;
  opacity:0;transform:translateY(24px);transition:opacity .62s,transform .62s
}
.cc-notice-block.cc-in{opacity:1;transform:none}
.cc-notice h2{font-family:var(--display);font-weight:800;font-size:clamp(25px,4vw,44px);line-height:1.06;letter-spacing:-.028em;margin:14px 0 20px}
.cc-notice p{font-size:clamp(16px,1.9vw,19px);line-height:1.6;opacity:.84}
.cc-notice p + p{margin-top:16px}


/* ============================================================
   SIGNATURE: the redline card
   ============================================================ */
.cc-rl{
  background:var(--bond);border:1px solid var(--ink);
  box-shadow:7px 7px 0 var(--ink);position:relative;
  padding:clamp(20px,3vw,34px);max-width:820px;
}
.cc-rl-head{display:flex;justify-content:space-between;align-items:center;gap:14px;border-bottom:1px dashed var(--ink);padding-bottom:12px;margin-bottom:20px}
.cc-rl-head .cc-tag{opacity:.62}
.cc-rl-legal{
  font-family:var(--legal);font-size:clamp(16px,2vw,20px);line-height:1.62;
  position:relative;display:inline;
}
.cc-rl-legalwrap{position:relative;transition:opacity .5s;margin-bottom:20px}
.cc-rl-legal,.cc-s-legal{
  background-image:linear-gradient(var(--redline),var(--redline));
  background-repeat:no-repeat;background-position:0 56%;background-size:0 2.5px;
  -webkit-box-decoration-break:clone;box-decoration-break:clone;
  transition:background-size .85s cubic-bezier(.65,0,.35,1);
}
.cc-rl.cc-go .cc-rl-legal{background-size:100% 2.5px}
.cc-rl.cc-go .cc-rl-legalwrap{opacity:.5}
.cc-rl-plain{
  font-size:clamp(18px,2.3vw,24px);font-weight:500;line-height:1.42;letter-spacing:-.015em;
  opacity:0;transform:translateY(12px);transition:opacity .6s .62s,transform .6s .62s;
}
.cc-rl.cc-go .cc-rl-plain{opacity:1;transform:none}
.cc-stamp{
  position:absolute;right:clamp(14px,3vw,26px);bottom:clamp(14px,3vw,26px);
  font-family:var(--mono);font-weight:700;font-size:13px;letter-spacing:.16em;
  border:2.5px solid var(--redline);color:var(--redline);padding:7px 13px;
  transform:rotate(-9deg) scale(2.2);opacity:0;
  transition:transform .42s cubic-bezier(.34,1.56,.64,1) .82s,opacity .18s .82s;
}
.cc-rl.cc-go .cc-stamp{transform:rotate(-9deg) scale(1);opacity:.92}
@media(max-width:640px){.cc-stamp{position:static;display:inline-block;margin-top:16px}}
.cc-hero .cc-rl{margin-top:clamp(40px,6vw,64px)}


/* ============================================================
   FOOTER
   ============================================================ */
.cc-foot{background:var(--ink);color:var(--bond);border-top:1px solid var(--ink-3);padding:44px 0 34px}
.cc-foot-in{display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between}
.cc-foot-brand{font-family:var(--display);font-weight:800;font-size:18px;letter-spacing:-.02em}
.cc-foot-brand p{font-size:14px;opacity:.6;margin-top:8px;max-width:30ch;font-family:var(--sans);font-weight:400;letter-spacing:0}
.cc-foot-col h4{font-family:var(--mono);font-size:11px;letter-spacing:.15em;text-transform:uppercase;opacity:.5;margin-bottom:12px;font-weight:700}
.cc-foot-col a{display:block;font-size:14px;opacity:.78;text-decoration:none;padding:4px 0;transition:opacity .2s,color .2s}
.cc-foot-col a:hover{opacity:1;color:var(--canary)}
.cc-foot-base{margin-top:38px;padding-top:20px;border-top:1px solid var(--ink-3);display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;font-family:var(--mono);font-size:11px;opacity:.5}

`;

type Mark = "risk" | "unusual" | "standard";

const CLAUSES: {
  no: string; name: string; mark: Mark; legal: string; plain: string; note: string;
}[] = [
  { no: "§ 4.2", name: "Intellectual property", mark: "risk",
    legal: "Contractor hereby irrevocably assigns to Company all right, title and interest in and to any and all Work Product together with all intellectual property rights therein, whether conceived within or outside the scope hereof.",
    plain: "They own everything you make, including side projects on your own time.",
    note: "The phrase doing the damage is <b>outside the scope hereof</b>. Without it this would be a normal work-for-hire clause." },
  { no: "§ 7.1", name: "Indemnification", mark: "risk",
    legal: "Contractor shall indemnify, defend and hold harmless Company, its affiliates, officers and agents from and against any and all claims, losses, liabilities and expenses of whatever nature arising hereunder.",
    plain: "If anyone sues over this work, you pay the legal bills. Not them.",
    note: "It runs one direction. A mutual version would say each party covers claims caused by <b>its own</b> conduct." },
  { no: "§ 8.3", name: "Limitation of liability", mark: "risk",
    legal: "In no event shall Company's aggregate liability exceed the lesser of fees actually paid hereunder during the preceding three (3) months or one hundred dollars ($100.00), regardless of the form of action.",
    plain: "The most they can ever owe you is $100. What you can owe them has no ceiling.",
    note: "Watch the words <b>the lesser of</b>. Three months of fees sounds fair until the hundred dollar floor swallows it." },
  { no: "§ 11.4", name: "Non-compete", mark: "risk",
    legal: "For a period of twenty-four (24) months following termination, Contractor shall not engage in any business competitive with Company within any territory in which Company conducts operations.",
    plain: "You cannot work in your own field for two years, anywhere they operate.",
    note: "No territory is named, so the limit is wherever they happen to do business. That can mean everywhere." },
  { no: "§ 3.1", name: "Payment terms", mark: "unusual",
    legal: "Company shall remit payment of undisputed invoices within ninety (90) days of receipt, provided all deliverables have been accepted by Company in its sole and absolute discretion.",
    plain: "You wait 90 days to get paid, and only if they decide they are happy with the work.",
    note: "<b>Sole and absolute discretion</b> means acceptance is their opinion. Net 30 is the normal number here." },
  { no: "§ 14.2", name: "Arbitration", mark: "unusual",
    legal: "Any dispute arising hereunder shall be resolved exclusively by binding arbitration administered in Company's principal place of business, and the parties waive any right to trial by jury.",
    plain: "You give up your right to sue, and any dispute gets heard in their city.",
    note: "Arbitration clauses are common. The part worth noticing is that the <b>venue is theirs</b>, so travel costs land on you." },
];

const READERS: { key: string; label: string; role: string; text: string }[] = [
  { key: "freelancer", label: "Freelancer", role: "Reading as a freelancer",
    text: "Two years is most of a freelance career. If your clients are all in one industry, this clause can shut down your book of business the day the contract ends." },
  { key: "tenant", label: "Tenant", role: "Reading as a tenant",
    text: "This is not a lease clause. If it appears in a rental agreement, it is out of place and worth asking about before anything else in the document." },
  { key: "founder", label: "Founder", role: "Reading as a founder",
    text: "A blanket non-compete with no named territory can spook an acquirer during diligence. It is the kind of thing that shows up in a disclosure schedule later." },
  { key: "employee", label: "Employee", role: "Reading as an employee",
    text: "Enforceability varies a lot by state, and some states will not enforce this at all. Where you live may matter more than what the paragraph says." },
  { key: "general", label: "General", role: "Reading generally",
    text: "You agree not to do similar work for two years after this ends. No specific region is named, so the restriction follows wherever the company operates." },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What can I give it?", a: "Paste the text, upload a PDF, or photograph the page." },
  { q: "How long does it take?", a: "About ten seconds for a contract of normal length." },
  { q: "What do Standard, Unusual, and Risk mean?",
    a: "Standard means the clause uses the usual language and you can move on. Unusual means it is not what you would normally see, so read it again. Risk means the clause takes something from you, and the note beside it says what." },
  { q: "Why does picking a reader change the result?",
    a: "A lease and a freelance contract hide different things. Choosing freelancer, tenant, founder, employee, or general changes what the reading looks for and which clauses get called out first." },
  { q: "Can I keep the result?",
    a: "Yes. Download the marked-up version as a PDF and send it to whoever asked you to sign." },
];

const GHOST =
  "Contractor shall indemnify, defend and hold harmless Company, its affiliates, officers and agents from and against any and all claims, losses, liabilities and expenses of whatever nature arising hereunder. In no event shall Company's aggregate liability exceed the lesser of fees actually paid hereunder during the preceding three (3) months or one hundred dollars ($100.00), regardless of the form of action. This Agreement shall automatically renew for successive twelve (12) month terms unless either party delivers written notice of non-renewal not less than ninety (90) days prior to expiration. Company shall remit payment of undisputed invoices within ninety (90) days of receipt, provided all deliverables have been accepted by Company in its sole and absolute discretion. Any dispute arising hereunder shall be resolved exclusively by binding arbitration administered in Company's principal place of business, and the parties waive any right to trial by jury.";

function CcHero({ appHref = "/app" }: { appHref?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [go, setGo] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const a = requestAnimationFrame(() => setLoaded(true));
    const t = window.setTimeout(() => setGo(true), reduce ? 0 : 1150);
    return () => { cancelAnimationFrame(a); clearTimeout(t); };
  }, []);

  /* a highlighter that follows the cursor over the fine print */
  useEffect(() => {
    const hero = heroRef.current, ghost = ghostRef.current;
    if (!hero || !ghost) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const move = (ev: PointerEvent) => {
      const b = hero.getBoundingClientRect();
      const mask = `radial-gradient(160px circle at ${ev.clientX - b.left}px ${ev.clientY - b.top}px, #000 0%, #000 42%, rgba(0,0,0,.18) 100%)`;
      ghost.style.webkitMaskImage = mask;
      ghost.style.maskImage = mask;
      ghost.style.opacity = ".2";
    };
    const leave = () => {
      ghost.style.webkitMaskImage = "none";
      ghost.style.maskImage = "none";
      ghost.style.opacity = "";
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => { hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <section className={"cc-hero" + (loaded ? " cc-loaded" : "")} ref={heroRef as never}>
      <div className="cc-hero-ghost" aria-hidden="true" ref={ghostRef}>{GHOST}</div>
      <div className="cc-wrap cc-hero-in">
        <span className="cc-tag">§ &nbsp;Contract analysis, in plain English</span>
        <h1>
          <span className="cc-ln"><i>Nobody reads</i></span>
          <span className="cc-ln"><i>page four.</i></span>
        </h1>
        <p className="cc-hero-sub">
          That is where they put the clause about owning your side projects. Paste any
          contract and get every line back in words you already use, with the parts that
          cost you money marked in red.
        </p>
        <div className="cc-hero-act">
          <a className="cc-btn" href={appHref}>Analyze a contract <span className="cc-ar">&rarr;</span></a>
          <span className="cc-hero-fine">Free to use. No card.</span>
        </div>

        <div className={"cc-rl" + (go ? " cc-go" : "")}>
          <div className="cc-rl-head">
            <span className="cc-tag">Section 4.2 &nbsp;/&nbsp; Intellectual property</span>
            <span className="cc-tag">Freelance agreement</span>
          </div>
          <div className="cc-rl-legalwrap">
            <span className="cc-rl-legal">
              Contractor hereby irrevocably assigns to Company all right, title and interest
              in and to any and all Work Product together with all intellectual property
              rights therein, whether conceived within or outside the scope hereof.
            </span>
          </div>
          <p className="cc-rl-plain">
            They own everything you make, including side projects you build on your own time.
          </p>
          <span className="cc-stamp">Risk</span>
        </div>
      </div>
    </section>
  );
}

function CcRail() {
  const rail = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => CLAUSES.map(() => false));
  const [armed, setArmed] = useState(false);

  const cards = () =>
    Array.from(rail.current?.querySelectorAll<HTMLElement>(".cc-card") ?? []);

  const activeIndex = useCallback(() => {
    const r = rail.current;
    if (!r) return 0;
    const cs = cards();
    if (!cs.length) return 0;
    const max = r.scrollWidth - r.clientWidth;
    if (max > 0 && max - r.scrollLeft < 4) return cs.length - 1;
    const base = cs[0].offsetLeft;
    let best = 0, bd = Infinity;
    cs.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - base - r.scrollLeft);
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }, []);

  const goTo = useCallback((i: number) => {
    const r = rail.current; if (!r) return;
    const cs = cards(); if (!cs.length) return;
    const n = Math.max(0, Math.min(cs.length - 1, i));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    r.scrollTo({ left: cs[n].offsetLeft - cs[0].offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }, []);

  /* mark up each clause once it reaches the rail, but only after the
     section itself is on screen so nothing animates unseen */
  useEffect(() => {
    const r = rail.current; if (!r) return;
    const section = r.closest(".cc-reader");
    if (!section) { setArmed(true); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setArmed(true); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const r = rail.current; if (!r || !armed) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = cards().indexOf(e.target as HTMLElement);
        if (i >= 0) setSeen((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v))));
        io.unobserve(e.target);
      });
    }, { root: r, threshold: 0.6 });
    cards().forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    const r = rail.current; if (!r) return;
    let tick = false;
    const on = () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => { setActive(activeIndex()); tick = false; });
    };
    r.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => { r.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [activeIndex]);

  /* most mice have no horizontal wheel, so let people drag */
  useEffect(() => {
    const r = rail.current; if (!r) return;
    let down = false, sx = 0, sl = 0, moved = 0;
    const dn = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = 0; sx = e.clientX; sl = r.scrollLeft; r.classList.add("cc-drag");
    };
    const mv = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      moved = Math.max(moved, Math.abs(dx));
      r.scrollLeft = sl - dx;
    };
    const end = () => { if (!down) return; down = false; r.classList.remove("cc-drag"); goTo(activeIndex()); };
    const clk = (e: MouseEvent) => { if (moved > 6) e.preventDefault(); };
    r.addEventListener("pointerdown", dn);
    r.addEventListener("pointermove", mv);
    r.addEventListener("pointerup", end);
    r.addEventListener("pointercancel", end);
    r.addEventListener("pointerleave", end);
    r.addEventListener("click", clk, true);
    return () => {
      r.removeEventListener("pointerdown", dn); r.removeEventListener("pointermove", mv);
      r.removeEventListener("pointerup", end); r.removeEventListener("pointercancel", end);
      r.removeEventListener("pointerleave", end); r.removeEventListener("click", clk, true);
    };
  }, [activeIndex, goTo]);

  return (
    <section className="cc-reader">
      <div className="cc-wrap cc-reader-head">
        <span className="cc-tag">The markup</span>
        <h2>Twelve clauses in a standard freelance contract. Five of them cost you something.</h2>
        <p>Six of them are here. The serif is what the contract says. The line under it is what it means.</p>
      </div>

      <div className="cc-wrap">
        <div
          className="cc-rail"
          ref={rail}
          tabIndex={0}
          role="region"
          aria-label="Contract clauses, scrolls sideways"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIndex() + 1); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(activeIndex() - 1); }
          }}
        >
          {CLAUSES.map((c, i) => (
            <article className={"cc-card" + (seen[i] ? " cc-on" : "")} key={c.no}>
              <div className="cc-card-top">
                <span className="cc-sec-no">{c.no}</span>
                <span className={"cc-m-badge cc-" + c.mark}>{c.mark}</span>
              </div>
              <h3 className="cc-sec-name">{c.name}</h3>
              <div className="cc-s-legalwrap"><span className="cc-s-legal">{c.legal}</span></div>
              <p className="cc-s-plain">{c.plain}</p>
              <p className="cc-m-note" dangerouslySetInnerHTML={{ __html: c.note }} />
            </article>
          ))}
        </div>

        <div className="cc-rail-ctl">
          <button className="cc-rnav" type="button" aria-label="Previous clause"
                  disabled={active === 0} onClick={() => goTo(activeIndex() - 1)}>&larr;</button>
          <button className="cc-rnav" type="button" aria-label="Next clause"
                  disabled={active === CLAUSES.length - 1} onClick={() => goTo(activeIndex() + 1)}>&rarr;</button>
          <div className="cc-pbar" aria-hidden="true">
            {CLAUSES.map((c, i) => <i key={c.no} className={i === active ? "cc-on" : undefined} />)}
          </div>
          <div className="cc-counter">
            <span>{String(active + 1).padStart(2, "0")}</span> / {String(CLAUSES.length).padStart(2, "0")}
          </div>
        </div>
        <p className="cc-rail-hint">Drag sideways or use the arrows</p>
      </div>
    </section>
  );
}

function CcReaders() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const panel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = panel.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const full = READERS[i].text;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTyped(full); return; }
    setTyped("");
    let n = 0;
    const id = window.setInterval(() => {
      n += 2;
      if (n >= full.length) { setTyped(full); clearInterval(id); }
      else setTyped(full.slice(0, n));
    }, 14);
    return () => clearInterval(id);
  }, [i, started]);

  return (
    <section className="cc-readers">
      <div className="cc-wrap">
        <span className="cc-tag">Who is reading</span>
        <h2 className="cc-sec-title">The same clause lands differently on different people.</h2>
        <p className="cc-rd-lead">
          A two-year non-compete is an inconvenience to a founder with a signed acquisition
          and a serious problem for someone whose whole trade is one industry. Pick a reader
          and the clause gets read again.
        </p>

        <div className="cc-tabs" role="tablist" aria-label="Reader">
          {READERS.map((r, k) => (
            <button key={r.key} className="cc-tab" role="tab" type="button"
                    aria-selected={k === i} onClick={() => setI(k)}>
              {r.label}
            </button>
          ))}
        </div>

        <div className="cc-rd-panel" ref={panel}>
          <p className="cc-rd-clause">
            For a period of twenty-four (24) months following termination, Contractor shall
            not engage in any business competitive with Company within any territory in which
            Company conducts operations.
          </p>
          <div className="cc-rd-out">
            <div className="cc-rd-role">{READERS[i].role}</div>
            <p className="cc-rd-text">
              {typed}
              {started && typed !== READERS[i].text ? <span className="cc-caret" /> : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const ROWS = [
  { n: "01", h: "Every clause, in about ten seconds",
    b: "Paste the text or drop in the PDF. It reads the whole document and hands back each clause rewritten, not summarized. Nothing gets skipped because it looked boring." },
  { n: "02", h: "Three marks in the margin",
    b: "Standard means it is the usual language and you can move on. Unusual means read it twice. Risk means the clause takes something from you, and the note tells you what." },
  { n: "03", h: "Five ways to read the same page",
    b: "A lease and a freelance contract hide different things. Say whether you are a freelancer, tenant, founder, employee, or none of those, and the reading shifts to what actually threatens you." },
  { n: "04", h: "Something you can send back",
    b: "Download the marked-up version as a PDF and forward it to whoever asked you to sign. Every clause, every note, in one file." },
];

function CcWhatItDoes() {
  return (
    <section className="cc-reads">
      <div className="cc-wrap">
        <span className="cc-tag">What it does</span>
        <h2 className="cc-sec-title">Four things, and it does them on every clause.</h2>
        <div className="cc-rows">
          {ROWS.map((r) => (
            <div className="cc-row cc-in" key={r.n}>
              <div className="cc-row-no">{r.n}</div>
              <div><h3 className="cc-row-h">{r.h}</h3></div>
              <div className="cc-row-body">{r.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CcFaq() {
  return (
    <section className="cc-faq">
      <div className="cc-wrap">
        <span className="cc-tag">Questions</span>
        <h2 className="cc-sec-title">The five people ask most.</h2>
        <div className="cc-faq-list">
          {FAQS.map((f) => (
            <details className="cc-qa" key={f.q}>
              <summary><span className="cc-qa-chev">&rsaquo;</span> {f.q}</summary>
              <p className="cc-qa-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CcNotice() {
  return (
    <section className="cc-notice">
      <div className="cc-wrap">
        <div className="cc-notice-block cc-in">
          <span className="cc-tag">Notice</span>
          <h2>It is not a lawyer.</h2>
          <p>It reads the words and tells you what they mean. It does not know your situation
             or what else you have already signed, and it can miss things.</p>
          <p>Use it to walk into the conversation knowing what to ask. When the contract is big
             enough that being wrong would cost you, take it to a lawyer.</p>
        </div>
      </div>
    </section>
  );
}

function CcClosing({ appHref = "/app" }: { appHref?: string }) {
  return (
    <section className="cc-sign">
      <div className="cc-wrap">
        <h2>You have to sign it eventually.</h2>
        <p>Read it first. Paste the contract and find out what page four says before your name goes on it.</p>
        <a className="cc-btn" href={appHref}>Analyze a contract <span className="cc-ar">&rarr;</span></a>
        <div className="cc-sign-fine">Free to use. No card.</div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="cc-root">
      <style dangerouslySetInnerHTML={{ __html: CC_CSS }} />
      <CcHero appHref="/app" />
      <CcRail />
      <CcWhatItDoes />
      <CcReaders />
      <CcFaq />
      <CcNotice />
      <CcClosing appHref="/app" />
    </div>
  );
}
