import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemesProvider from "@/libs/themeprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Votely",
  description: "Decisions made clear",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
      >
        <ThemesProvider>{children}</ThemesProvider>
      </body>
    </html>
  );
}
