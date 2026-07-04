import type { Metadata, Viewport } from 'next'
import { Alfa_Slab_One, Inter, Pirata_One, Rye } from 'next/font/google'
import './globals.css'

const pirata = Pirata_One({ weight: '400', subsets: ['latin'], variable: '--font-pirata' })
const rye = Rye({ weight: '400', subsets: ['latin'], variable: '--font-rye' })
const alfa = Alfa_Slab_One({ weight: '400', subsets: ['latin'], variable: '--font-alfa' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://rahulbabu.netlify.app'),
  title: 'Rahul Babu — Software Engineer',
  description:
    'Software engineer with 3 years of experience building AI-driven full-stack applications, backend APIs, and data systems. Sail the Grand Line of my work — an interactive One Piece-inspired 3D portfolio.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Rahul Babu — Software Engineer',
    description:
      'An interactive One Piece-inspired 3D portfolio. Sail between islands to explore my experience, projects, and publications.',
    url: 'https://rahulbabu.netlify.app',
    siteName: 'Rahul Babu — Interactive Portfolio',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a2540',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${pirata.variable} ${rye.variable} ${alfa.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
