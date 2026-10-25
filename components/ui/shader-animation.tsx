"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Concentric line rings, adapted from the shader-animation component.
 *
 * Changes from the original, all so it can sit behind a hero:
 * - The three color channels are remapped into the site's blue instead of
 *   raw RGB, and the edges fall off to the page color.
 * - `inward` runs the rings toward the center, so the page reads as a
 *   contract being shrunk rather than something spreading out.
 * - Time is wall-clock based, so it moves at the same speed at 60 or 120Hz.
 * - Pauses off-screen and in background tabs; draws one still frame for
 *   reduced-motion users; renders nothing if WebGL is unavailable.
 * - Sized to its container with a ResizeObserver, not to the window.
 */
export function ShaderAnimation({
  className = "",
  inward = true,
}: {
  className?: string;
  inward?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float dir;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = dir * time * 0.05;
        float lineWidth = 0.002;

        vec3 c = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            c[j] += lineWidth * float(i * i) /
              abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        // Remap the RGB fringes into one cool blue family.
        vec3 col = c.r * vec3(0.04, 0.16, 0.42)
                 + c.g * vec3(0.07, 0.33, 0.85)
                 + c.b * vec3(0.22, 0.58, 1.00);
        // Tone-map so overlapping rings glow instead of clipping to white,
        // then keep the whole field dim: it sits behind a headline.
        col = (1.0 - exp(-col * 0.9)) * 0.30;

        // Fall off toward the edges so the rings sit in the page, not on it.
        float vig = smoothstep(1.9, 0.35, length(uv));
        col *= vig;

        vec3 night = vec3(0.020, 0.031, 0.055);
        gl_FragColor = vec4(night + col, 1.0);
      }
    `;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the container's CSS background shows instead.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      dir: { value: inward ? 1.0 : -1.0 },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true;
    const start = performance.now();

    // The original advanced time by 0.05 per frame at ~60fps, i.e. 3/sec.
    const loop = () => {
      uniforms.time.value = 1 + ((performance.now() - start) / 1000) * 3;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? play() : pause();
    });
    io.observe(container);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      uniforms.time.value = 7.3; // a pleasant still frame
      renderer.render(scene, camera);
    } else play();

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [inward]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{ background: "#05080E", overflow: "hidden" }}
    />
  );
}
