import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Testing Tool",
  description: "A comprehensive testing tool built with React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
