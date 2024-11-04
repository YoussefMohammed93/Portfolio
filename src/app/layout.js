import "./globals.css";
import { Rubik } from "next/font/google";

const rubikFont = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata = {
  title: "Youssef Mohammed - Portfolio",
  description: "Youssef Mohammed's personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubikFont.variable} antialiased font-rubik`}>
        {children}
      </body>
    </html>
  );
}
