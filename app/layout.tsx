import type { Metadata } from "next";
import { Geist_Mono, Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/_ui/sonner";
import { CartProvider } from "@/components/cart/cart-context";
import { CheckoutProvider } from "@/components/checkout/checkout-context";
import { AgeDialog } from "@/components/layout/AgeDialog";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PriceProvider } from "@/components/price/price-context";

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
                <PriceProvider>
                    <CartProvider>
                        <CheckoutProvider>
                            <AgeDialog />
                            <Header />
                            {children}
                            <Footer />
                        </CheckoutProvider>
                    </CartProvider>
                </PriceProvider>
                <Toaster />
            </body>
        </html>
    );
}
