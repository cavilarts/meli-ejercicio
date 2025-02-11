import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/Header";
import StoreProvider from "@/components/provider/StoreProvider";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner/Spinner";

const figTree = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercado Libre Argentina - Envíos Gratis en el día",
  description: "Mercado Libre, busca tus productos aqui!",
  viewport: "width=device-width, initial-scale=1",
  keywords: "Mercado Libre, Argentina, envíos gratis, productos",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${figTree.className}`}>
        <StoreProvider>
          <Suspense fallback={<Spinner />}>
            <Header />
            {children}
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
