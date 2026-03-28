import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from "@next/third-parties/google";
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AandolanBot — Nepal Gen-Z Protests Document Explorer',
  description:
    'Cross-question a 900-page government document about the 2025 Gen-Z protests in Nepal. Ask anything — get precise, sourced answers drawn directly from official documentation.',
  keywords: [
    'Nepal',
    'Gen-Z protests',
    '2025',
    'government document',
    'Aandolan',
    'chatbot',
    'AI',
  ],
  authors: [{ name: 'AandolanBot' }],
  openGraph: {
    title: 'AandolanBot — Nepal Gen-Z Protests Document Explorer',
    description:
      'Cross-question a 900-page government document about the 2025 Gen-Z protests in Nepal.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AandolanBot — Nepal Gen-Z Protests Document Explorer',
    description:
      'Cross-question a 900-page government document about the 2025 Gen-Z protests in Nepal.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A14',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <GoogleAnalytics
          gaId='G-6WMWQ430JX'
        />
      </body>
    </html>
  )
}
