import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TASSIVOX — La voix de l’Algérie, l’écho du monde", template: "%s | TASSIVOX" },
  description: "TASSIVOX, un regard algérien sur l’actualité nationale et internationale.",
  applicationName: "TASSIVOX"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
