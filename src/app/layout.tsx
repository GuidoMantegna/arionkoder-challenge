import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  GFS_Didot,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const _gfsDidot = GFS_Didot({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beauty Centers",
  description: "Beauty & Wellness Bookings",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/back-img-1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_playfairDisplay.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
