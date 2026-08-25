import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins, Inter, Allura } from 'next/font/google'; // Grouped imports cleanly
import '../styles/tailwind.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allura',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Baylat Properties | Smart Investments. Lasting Value.',
  description: 'Baylat Properties offers premium real estate listings for sale and rent across Lagos, Abuja, and Port Harcourt — your trusted Nigerian property partner.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'Baylat Properties — Smart Investments. Lasting Value.',
    description: 'Premium Nigerian real estate — properties for sale and rent in Lagos, Abuja, Port Harcourt.',
    type: 'website',
    url: 'https://baylatproperties.ng',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${allura.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
