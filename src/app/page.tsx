import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section className="flex min-h-svh flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-trail uppercase">End of the road</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Scroll back up to drive it again.
        </h2>
        <p className="max-w-md text-white/60">
          Built with Next.js, Tailwind CSS and GSAP ScrollTrigger. Every frame is driven by
          transforms tied to scroll progress.
        </p>
      </section>
    </main>
  );
}
