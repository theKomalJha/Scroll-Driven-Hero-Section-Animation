import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome Itzfizz | Scroll-Driven Hero",
  description:
    "A scroll-driven hero section animation built with Next.js, Tailwind CSS and GSAP ScrollTrigger.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        {/* Without JS the intro never runs, so show everything immediately. */}
        <noscript>
          <style>{`[data-intro]{visibility:visible}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
