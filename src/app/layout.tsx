import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  GFS_Didot,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geistMono",
});
const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const _gfsDidot = GFS_Didot({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beauty Centers",
  description: "Beauty & Wellness Bookings",
  openGraph: {
    images: [
      {
        url: "https://damaraspayorkville.com/cdn/shop/files/indie-head-massage-treatment-toronto_1.jpg?v=1738248036&width=800",
        width: 1200,
        height: 630,
        alt: "Beauty Centers",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/heartbeat-solid.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/heartbeat-outline.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/heartbeat-outline.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/heartbeat-outline.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`font-sans antialiased ${_playfairDisplay.variable} ${_geist.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
