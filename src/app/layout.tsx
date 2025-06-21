import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageLayout from "./PageLayout";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amader Boi - Online Bookstore",
  description: "Discover and purchase your favorite books online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <PageLayout>
            <main className="flex-grow">
              {children}
            </main>
          </PageLayout>
          <Footer />
        </div>
      </body>
    </html>
  );
}
