import {  Inter} from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="w-full ">
        {children}
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
