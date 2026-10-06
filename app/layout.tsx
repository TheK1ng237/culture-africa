import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

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
    <html lang="fr">
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
