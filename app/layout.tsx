import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackPorvider";
import Header from "@/components/Header/Header";
import { Manrope } from 'next/font/google';
import { Toaster } from "react-hot-toast"


const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', "500", '700'],
  variable: '--font-marnope',
  display: 'swap'
});



export const metadata: Metadata = {
  title: "Rental Car",
  description: "find your rental car easy",
  openGraph: {
    title: "Rental car",
    description: "find your rental car easy",
    images: [{ url: "../public/hero.jpg" }],
    url: "https://rental-cars-taupe.vercel.app/"
  }
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </TanStackProvider>

      </body >
    </html>
  );
}