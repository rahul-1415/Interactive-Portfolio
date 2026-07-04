import type { Metadata, Viewport } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
