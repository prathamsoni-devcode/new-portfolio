import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Pratham Soni - Software Engineer & AWS Solutions Architect | Portfolio",
  description:
    "Experienced Software Engineer specializing in Java, Spring Boot, Flutter, and AWS cloud solutions. AWS Certified Solutions Architect with expertise in microservices, full-stack development, and scalable applications.",
  keywords: [
    "Pratham Soni",
    "Software Engineer",
    "AWS Solutions Architect",
    "Java Developer",
    "Spring Boot",
    "Flutter Developer",
    "Full Stack Developer",
    "Microservices",
    "Cloud Computing",
    "AWS Certified",
    "React Developer",
    "Next.js",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Pune Developer",
    "India Software Engineer",
  ],
  authors: [{ name: "Pratham Soni", url: "https://prathamsoni.vercel.app" }],
  creator: "Pratham Soni",
  publisher: "Pratham Soni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://prathamsoni.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pratham Soni - Software Engineer & AWS Solutions Architect",
    description:
      "Experienced Software Engineer specializing in Java, Spring Boot, Flutter, and AWS cloud solutions. Building scalable applications with modern technologies.",
    url: "https://prathamsoni.vercel.app",
    siteName: "Pratham Soni Portfolio",
    images: [
      {
        url: "/images/pratham-profile.png",
        width: 1200,
        height: 630,
        alt: "Pratham Soni - Software Engineer & AWS Solutions Architect",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Soni - Software Engineer & AWS Solutions Architect",
    description: "Experienced Software Engineer specializing in Java, Spring Boot, Flutter, and AWS cloud solutions.",
    images: ["/images/pratham-profile.png"],
    creator: "@prathamsoni",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  category: "technology",
  classification: "Portfolio Website",
  generator: "Next.js",
  applicationName: "Pratham Soni Portfolio",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#10b981",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#10b981",
    "msapplication-config": "/browserconfig.xml",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#34d399" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO meta tags */}
        <link rel="canonical" href="https://prathamsoni.vercel.app" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune" />
        <meta name="geo.position" content="18.5204;73.8567" />
        <meta name="ICBM" content="18.5204, 73.8567" />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
