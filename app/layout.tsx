import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Woodland Setup — A Companion for Root",
  description:
    "Open-source companion app for setting up balanced games of Root. Suggests faction combinations using the official Reach system.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4E8D0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lora:wght@400;500;600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="relative z-0"
        style={
          {
            "--font-display": "'Cormorant Garamond', Georgia, serif",
            "--font-body": "'Lora', Georgia, serif",
            "--font-ui": "'Inter', system-ui, sans-serif",
          } as React.CSSProperties
        }
      >
        <I18nProvider>
          <div className="relative z-10">{children}</div>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
