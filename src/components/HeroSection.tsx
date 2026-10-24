"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CarSvg from "./CarSvg";
import { HEADLINE, STATS, type Stat } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The headline is rendered twice with identical layout: a faint base layer
 * on the asphalt, and a solid copy inside the green trail. Because both layers
 * share the same box, the trail can reveal the solid copy with transforms alone
 * and no letter positions ever need to be measured.
 */
function Headline({ variant }: { variant: "base" | "revealed" }) {
  const color =
    variant === "base"
      ? "text-white/15"
      : "text-ink";

  return (
    <div
      aria-hidden
      className={`absolute inset-0 flex items-center gap-[0.14em] pl-[5vw] text-[clamp(1.75rem,6.4vw,7.5rem)] font-bold leading-none whitespace-nowrap ${color}`}
    >
      {[...HEADLINE].map((char, i) => (
        <span key={i} data-intro className={`hero-letter-${variant} inline-block`}>
          {char === " " ? " " : char}
        </span>
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    // Outer wrapper is moved by scroll parallax, inner card by the intro,
    // so the two animations never fight over the same transform.
    <div className="stat-parallax w-[47%] sm:w-64">
      <div
        data-intro
        className={`stat-card flex flex-col gap-1 rounded-2xl p-4 shadow-lg sm:p-7 ${stat.tone}`}
      >
        <span className="text-3xl font-semibold tracking-tight sm:text-6xl">{stat.value}</span>
        <span className="text-xs leading-snug sm:text-base">{stat.label}</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const carBodyRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const trailInnerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const hintWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const road = roadRef.current!;
      const car = carRef.current!;
      // Read once per ScrollTrigger refresh (load/resize), never per scroll frame.
      const roadW = () => road.offsetWidth;
      const carW = () => car.offsetWidth;
      // Trail's leading edge sits just ahead of the car's rear bumper, hidden under the car.
      const edge = () => carW() * 0.15;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { motion } = ctx.conditions as { motion: boolean };

          // ---- Intro (time-based, plays once on load) ----------------------
          if (motion) {
            const fadeUp = { autoAlpha: 0, y: 48 };
            const settle = { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.05 };

            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .fromTo(
                carBodyRef.current,
                { autoAlpha: 1, x: () => -carW() * 1.6 },
                { x: 0, duration: 1.6, ease: "expo.out" },
                0,
              )
              .fromTo(".hero-letter-base", fadeUp, settle, 0.25)
              .fromTo(".hero-letter-revealed", fadeUp, settle, 0.25)
              .fromTo(
                ".stat-card",
                { autoAlpha: 0, y: 32, scale: 0.94 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15 },
                0.8,
              )
              .fromTo(hintRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.3");
          }

          // ---- Scroll-driven drive across the road -------------------------
          const drive = gsap.timeline({
            defaults: { ease: "none", duration: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              // A numeric scrub makes the playhead ease toward the scroll position
              // over 1s instead of snapping, which smooths out jerky wheel input.
              scrub: motion ? 1 : true,
              invalidateOnRefresh: true,
            },
          });

          drive
            // Car travels from the left edge until it has driven off the right edge.
            .fromTo(car, { x: 0 }, { x: roadW }, 0)
            // Trail mask slides in from the left with its leading edge tucked under
            // the car's rear; its content counter-slides so the revealed headline
            // stays put. Both are pure transforms, ending flush with the road.
            .fromTo(trailRef.current, { x: () => edge() - roadW() }, { x: 0 }, 0)
            .fromTo(trailInnerRef.current, { x: () => roadW() - edge() }, { x: 0 }, 0)
            .to(hintWrapRef.current, { autoAlpha: 0, duration: 0.08 }, 0);

          // Stats drift apart: top row up, bottom row down, at slightly different rates.
          gsap.utils.toArray<HTMLElement>(".stat-parallax").forEach((el, i) => {
            const direction = i < 2 ? -1 : 1;
            drive.to(el, { y: direction * (i % 2 ? 56 : 32) }, 0);
          });

          if (motion) {
            // The gap between raw scroll progress and the smoothed playhead is a
            // free "speed" signal: large while scrolling fast, zero once caught up.
            const stretch = gsap.quickTo(carBodyRef.current, "scaleX", { duration: 0.3, ease: "power2.out" });
            const lines = gsap.quickTo(speedLinesRef.current, "opacity", { duration: 0.3, ease: "power2.out" });

            drive.eventCallback("onUpdate", () => {
              const lag = Math.abs((drive.scrollTrigger?.progress ?? 0) - drive.progress());
              stretch(1 + Math.min(lag * 0.8, 0.07));
              lines(Math.min(lag * 12, 0.9));
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const topStats = STATS.slice(0, 2);
  const bottomStats = STATS.slice(2);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-ink" aria-label="Hero">
      <div className="sticky top-0 flex h-svh w-full flex-col justify-center gap-6 overflow-hidden bg-pavement sm:gap-10">
        <h1 className="sr-only">Welcome Itzfizz</h1>

        <div className="mx-auto flex w-full max-w-6xl justify-end gap-3 px-4 sm:gap-6 sm:px-8">
          {topStats.map((stat) => (
            <StatCard key={stat.value} stat={stat} />
          ))}
        </div>

        <div
          ref={roadRef}
          className="relative h-(--road-h) w-full overflow-hidden bg-asphalt [--road-h:clamp(110px,min(24vh,40vw),220px)]"
        >
          <Headline variant="base" />

          <div ref={trailRef} className="absolute inset-0 overflow-hidden will-change-transform">
            <div ref={trailInnerRef} className="absolute inset-0 bg-trail will-change-transform">
              <Headline variant="revealed" />
            </div>
          </div>

          <div
            ref={carRef}
            className="absolute top-1/2 left-0 z-10 aspect-[400/180] w-[min(32vw,calc(var(--road-h)*1.75))] -translate-y-1/2 will-change-transform"
          >
            <div
              ref={speedLinesRef}
              aria-hidden
              className="absolute top-1/2 right-[92%] flex w-[45%] -translate-y-1/2 flex-col gap-[14%] opacity-0"
            >
              {[0.7, 1, 0.55].map((w, i) => (
                <span
                  key={i}
                  className="ml-auto h-[3px] rounded-full bg-gradient-to-l from-white/80 to-transparent"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
            <div ref={carBodyRef} data-intro className="h-full w-full origin-left">
              <CarSvg className="h-full w-full drop-shadow-xl" />
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-6xl justify-end gap-3 px-4 sm:gap-6 sm:px-8">
          {bottomStats.map((stat) => (
            <StatCard key={stat.value} stat={stat} />
          ))}
        </div>

        <div ref={hintWrapRef} className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
          <div ref={hintRef} data-intro className="flex flex-col items-center gap-2 text-ink/70">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase">Scroll to drive</span>
            <span className="h-8 w-px animate-pulse bg-ink/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
