import type { Metadata } from "next";

import "./globals.css";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "material-symbols";

import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/layout/footer/footer";
import Nav from "@/components/layout/nav/nav";
import LenisProvider from "@/providers/lenis-provider/lenis-provider";
import { MenuProvider } from "@/providers/menu-provider/menu-provider";

const Switzer = localFont({
    variable: "--ref-font-family-display",
    src: "../fonts/switzer/switzer-variable.woff2",
    fallback: [
        "Mona Sans VF",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Noto Sans",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
    ],
});

const CommitMono = localFont({
    variable: "--ref-font-family-mono",
    src: [
        {
            path: "../fonts/commit-mono/commit-mono-400-regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/commit-mono/commit-mono-700-regular.otf",
            weight: "700",
            style: "normal",
        },
    ],
    fallback: [
        "ui-monospace",
        "SFMono-Regular",
        "SF Mono",
        "Menlo",
        "Consolas",
        "Liberation Mono",
        "monospace",
    ],
});

const OpenSans = Open_Sans({
    variable: "--ref-font-family-sans",
    subsets: ["latin"],
    fallback: [
        "Mona Sans VF",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Noto Sans",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
    ],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://marcbiemer.github.io"),
    title: {
        default: "marcbiemer creative studio",
        template: "%s | marcbiemer creative studio",
    },
    description:
        "A creative studio collaborating with brands, cultural institutions, and venues to build captivating digital experiences.",

    keywords: [
        "creative studio",
        "new media art",
        "digital art",
        "installation art",
        "data art",
        "performance art",
        "interactive media",
        "UX design",
    ],

    authors: [{ name: "Marc Biemer" }],
    creator: "Marc Biemer",
    publisher: "Marc Biemer",

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://marcbiemer.github.io",
        siteName: "marcbiemer creative studio",
        title: "marcbiemer creative studio",
        description:
            "A creative studio collaborating with brands, cultural institutions, and venues to build captivating digital experiences.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "marcbiemer creative studio",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "marcbiemer creative studio",
        description:
            "A creative studio collaborating with brands, cultural institutions, and venues to build captivating digital experiences.",
        images: ["/og-image.jpg"],
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html
                lang="en"
                className={`${Switzer.variable} ${CommitMono.variable} ${OpenSans.variable}`}
            >
                <body>
                    <LenisProvider>
                        <MenuProvider>
                            <Nav />
                            {children}
                            <Footer />
                        </MenuProvider>
                    </LenisProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
