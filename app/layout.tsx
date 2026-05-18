import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMC Maintenance Contacts | EMC Digitals",
  description: "EMC Digicare — Maintenance Department Contact Directory. Call, WhatsApp, and manage maintenance personnel contacts.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
