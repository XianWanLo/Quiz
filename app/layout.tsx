"use client"; 
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import "./globals.css";
import AudioPlayer from "./components/audioPlayer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // 'light' or 'dark'
  const pathname = usePathname();

  useEffect(() => {
    // Update the theme based on the current page
    if (pathname === '/login' || pathname === '/dashboard') {
      setTheme('light');
    } else {
      setTheme('dark'); // Default theme
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AudioPlayer theme={theme} />
        {children}
      </body>
    </html>
  );
}
