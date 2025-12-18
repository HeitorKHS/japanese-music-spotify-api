import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const metadata: Metadata = {
  title: "J-Music",
  description: "Plataforma de música integrada com Spotify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
          <Header/>
          <main className="min-h-screen pt-16">
            {children}
          </main>  
          <Footer/>
      </body>
    </html>
  );
}
