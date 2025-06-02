import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/main-layout";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "sarj.ai - AI Call Management",
  description: "AI-powered call center management and monitoring dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden" suppressHydrationWarning>
      <body
        className="antialiased h-full overflow-hidden font-manrope"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
