export const HEADLINE = "WELCOME ITZFIZZ";

export type Stat = {
  value: string;
  label: string;
  /** Tailwind classes for the card's background and text colour. */
  tone: string;
};

// Ordered as they appear on screen: two cards above the road, two below.
export const STATS: Stat[] = [
  { value: "58%", label: "Increase in pick up point use", tone: "bg-lime text-ink" },
  { value: "27%", label: "Increase in pick up point use", tone: "bg-graphite text-white" },
  { value: "23%", label: "Decrease in customer phone calls", tone: "bg-sky text-ink" },
  { value: "40%", label: "Decrease in customer phone calls", tone: "bg-tangerine text-ink" },
];
