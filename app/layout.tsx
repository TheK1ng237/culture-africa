import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

const burowaiFont = localFont({
  src: "../public/fonts/burowai-font/BurowaiRegular-3zVjX.ttf",
  variable: "--font-burowai",
  display: "swap",
});

const skranjiFont = localFont({
  src: [
    {
      path: "../public/fonts/skranji/Skranji-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/skranji/Skranji-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-skranji",
  display: "swap",
});

const title = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#110d0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${burowaiFont.variable} ${skranjiFont.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main id="contenu">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

