import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nook",
  description: "A calm corner for your thoughts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
