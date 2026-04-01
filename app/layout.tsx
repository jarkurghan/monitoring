import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Foydali telegram botlar",
    description: "Telegram botlar monitoringi | Najmiddin Nazirov",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="uz-UZ">
            <body className={`font-sans antialiased`}>{children}</body>
        </html>
    );
}
