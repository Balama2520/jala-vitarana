import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://jalavitarana.org"),
  title: "Jala Vitarana | Revolutionary Water Distribution Ecosystem",
  description: "Founded by Bala Maneesh Ayanala. The world's most transparent, data-driven water democracy platform. Experience real-time verified impact, dignified distribution, and absolute truth.",
  keywords: ["Jala Vitarana", "Bala Maneesh Ayanala", "Free Water Initiative", "Transparent Tech", "Social Impact", "Next-Gen Charity"],
  authors: [{ name: "Bala Maneesh Ayanala", url: "https://github.com/balamaneesh" }],
  openGraph: {
    title: "Jala Vitarana: The Future of Transparent Giving",
    description: "A world-class ecosystem for dignified water distribution. Real-time tracking, verified sponsorships, and community justice.",
    url: "https://jalavitarana.org",
    siteName: "Jala Vitarana",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jala Vitarana Ecosystem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jala Vitarana | Next-Gen Water Distribution",
    description: "Transparency redefined. Dignity restored. Every drop verified.",
    creator: "@balamaneesh",
    images: ["/og-image.jpg"],
  }
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import AIChatbot from "@/components/chat/AIChatbot";
import { Toaster } from "sonner";

import { DashboardProvider } from "@/contexts/DashboardContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased`}
      >
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none" />
        <div className="fixed inset-0 z-[-1] opacity-20 bg-[url('/noise.svg')] pointer-events-none mix-blend-overlay" />

        <DashboardProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Toaster theme="dark" position="top-right" closeButton richColors />
          <AIChatbot />
          <Footer />
        </DashboardProvider>
      </body>
    </html>
  );
}
