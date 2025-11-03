import type { Metadata } from "next";
import { Geist_Mono, Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const urbanist = Urbanist({
    variable: "--font-urbanist",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Diplomatic Duty Free Services NZ",
    description:
        "Exclusive duty free shopping for diplomats in New Zealand. Discover premium products, seamless service, and secure access tailored for diplomatic personnel.",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${urbanist.variable} ${inter.variable} ${geistMono.variable} font-sans text-gray-800 antialiased`}
            >
                <Header />
                <div className="mt-22 px-2 sm:mt-24 sm:px-3">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </div>
                <Footer />
            </body>
        </html>
    );
}
