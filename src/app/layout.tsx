import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ThemeProvider } from "../providers/ThemeProvider";

export const metadata: Metadata = {
  title: "J-Music",
  description: "Plataforma de música integrada com Spotify",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
          <ThemeProvider>
            <Header/>
              <main className="pt-12 md:pt-16">
                {children}
              </main>
            <Footer/>
          </ThemeProvider>
      </body>
    </html>
  );

}
