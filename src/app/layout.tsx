import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./index.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TKJ 2",
  description: "Website SMKN1 Kuta Selatan TKJ 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>{children}</body>
    </html>
  );
}
