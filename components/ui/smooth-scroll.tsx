"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Make in-page anchor links smooth-scroll via Lenis instead of Chrome's
    // native instant jump (which fights the Lenis RAF loop).
    function onAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      history.pushState(null, "", id);
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
