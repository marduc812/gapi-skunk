import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'G-API Skunk - Google API Key Checker',
  description: 'Free online open-source tool to analyze Google API key&#039;s permissions. Test 28 different Google APIs for Google Maps, Routes, Places and Google Cloud.',
  keywords: [
    'Google API',
    'Checker',
    'Google Maps',
    'Google Cloud',
    'Free',
    'Open-Source',
    'Github',
  ],
  authors: [
    {
      name: 'marduc812',
      url: 'https://github.com/marduc812',
    },
  ],
  creator: 'marduc812',
  publisher: 'marduc812',
  openGraph: {
    title: 'G-API Skunk',
    description: 'Free online open-source tool to analyze Google API key&#039;s permissions. Test 28 different Google APIs for Google Maps, Routes, Places and Google Cloud.',
    url: 'https://github.com/marduc812/gapi-skunk',
    siteName: 'GAPI Skunk',
    images: [
      {
        url: '/og.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/* <Navigation /> */}
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
