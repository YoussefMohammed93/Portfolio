import "./globals.css";

import type { Metadata } from "next";

import { Ovo } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./convex-client-provider";

const ovo = Ovo({
  weight: ["400"],
  variable: "--font-ovo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Youssef Mohammed | Full Stack Web Developer",
  description:
    "Full Stack Developer with 3 years of experience building modern web applications using React, Next.js, and Node.js with best practices for performance and accessibility.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Egypt",
  ],
  authors: [{ name: "Youssef Mohammed" }],
  creator: "Youssef Mohammed",
  publisher: "Youssef Mohammed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youssefmohammed.com",
    title: "Youssef Mohammed | Full Stack Web Developer",
    description:
      "Full Stack Developer with 3 years of experience building modern web applications using React, Next.js, and Node.js with best practices for performance and accessibility.",
    siteName: "Youssef Mohammed Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning dir="ltr">
      <body className={`${ovo.variable} font-ovo antialiased`}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
