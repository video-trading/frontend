import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/authOptions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cabinet = localFont({
  src: [
    {
      path: "../public/fonts/CabinetGrotesk-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
    },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | 品视交易",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`${inter.variable} ${cabinet.variable} font-inter antialiased bg-white text-gray-800 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
