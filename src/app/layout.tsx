import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import SectionObserver from '@/components/SectionObserver';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Портфолио разработчика',
  description: 'Fullstack разработчик | React, Next.js, Node.js | Создание современных веб-приложений',
  keywords: ['portfolio', 'developer', 'react', 'nextjs', 'nodejs', 'fullstack', 'разработчик', 'портфолио'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Портфолио разработчика',
    description: 'Fullstack разработчик | React, Next.js, Node.js | Создание современных веб-приложений',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Портфолио разработчика',
    description: 'Fullstack разработчик | React, Next.js, Node.js | Создание современных веб-приложений',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <Background />
        <Navbar />
        <SectionObserver />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
} 