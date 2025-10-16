import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import OfflineIndicator from '@/components/OfflineIndicator'

export const metadata: Metadata = {
  title: 'Rautine',
  description: 'Messaging app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider>
          {children}
          <OfflineIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
