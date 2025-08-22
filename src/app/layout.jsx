import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import ExtensionProtection from "@/components/ExtensionProtection";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-var",
});

export const metadata = {
  title: "Cod Intern Admin Panel",
  description: "Cod Intern Admin Panel",
  icons: {
    icon: [
      {
        // media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ExtensionProtection />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
