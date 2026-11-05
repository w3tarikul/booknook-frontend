import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "BookNook | Home", template: "BookNook | %s" },
  description: "BookNook is a small online library where you can browse, add and borrow books.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
