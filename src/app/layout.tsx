import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Pure Fruits bd.com",
  description:
    "Buy the freshest, hand-picked fruits online in Bangladesh. Pure Fruits BD offers top-quality seasonal and imported fruits at the best prices with home delivery.",
  keywords: [
    "fresh fruits",
    "buy fruits online",
    "fruit delivery Bangladesh",
    "seasonal fruits BD",
    "pure fruits bd",
    "organic fruits",
    "mango delivery",
    "apple banana orange",
    "best fruit shop online BD",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
