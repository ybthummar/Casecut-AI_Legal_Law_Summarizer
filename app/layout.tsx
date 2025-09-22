import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "../styles/animations.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Legal Law Summarizer - Advanced Legal Document Analysis",
  description: "Complete legal document analysis with AI-powered summarization, IPC detection, citation extraction, and document comparison.",
  keywords: "legal, AI, summarizer, IPC, legal analysis, document comparison, citation extraction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased font-inter bg-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
