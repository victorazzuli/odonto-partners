import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.defaultTitle, template: site.titleTemplate },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "harmonização orofacial", "curso de harmonização facial", "curso toxina botulínica", "especialização HOF",
    "residência HOF", "odontologia estética", "paciente modelo São Paulo", "curso para dentistas", "Brooklin",
  ],
  formatDetection: { telephone: false },
  openGraph: { siteName: site.name, locale: site.locale, type: "website", images: ["/og.jpg"] },
  twitter: { card: "summary_large_image" },
  robots: process.env.NEXT_PUBLIC_PREVIEW === "1" ? { index: false, follow: false } : { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://odontopartners.com.br" crossOrigin="" />
        <JsonLd data={organizationLd()} />
      </head>
      <body>
        <Preloader />
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <Cursor />
      </body>
    </html>
  );
}
