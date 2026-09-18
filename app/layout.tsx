import type { Metadata } from "next";
import { Space_Mono, Outfit } from "next/font/google";
import "./globals.css";
import CanvasBackground from "@/src/components/canvas/CanvasBackground";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: "Maximilianus Ronald — Portfolio",
  description:
    "Portfolio of Maximilianus Ronald — Intelligent Systems, Robotics, Game Development, and Quantitative Trading specialist at BINUS University.",
  keywords: [
    "Maximilianus Ronald",
    "portfolio",
    "robotics",
    "game development",
    "quantitative trading",
    "intelligent systems",
    "BINUS University",
  ],
  authors: [{ name: "Maximilianus Ronald" }],
  openGraph: {
    title: "Maximilianus Ronald — Portfolio",
    description:
      "Specialist in Intelligent Systems, Robotics, Game Development, and High-Frequency Quantitative Trading Systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${outfit.variable}`}
    >
      <body>
        {/* Fixed 3D background canvas — client only */}
        <CanvasBackground />

        {/* Page content above the canvas */}
        <div style={{ position: "relative", zIndex: 10 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
