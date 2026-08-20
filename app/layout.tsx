import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const title = "Wagenheld — Ihr Automobilzentrum";
const description =
  "Wagenheld: Ihr kompetenter Partner für Premiumfahrzeuge, Ankauf und erstklassigen Service.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Wagenheld",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${manrope.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
