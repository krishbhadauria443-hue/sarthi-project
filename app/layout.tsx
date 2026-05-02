import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sarthi - Architect Your Projects",
  description: "Manage, Sync, and Backup Your Projects Effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
