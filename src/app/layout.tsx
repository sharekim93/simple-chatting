import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Chat App",
  description: "Simple Chat App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
