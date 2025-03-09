import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/providers/queryProvider'
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Post App',
  description: "Aplikasi Blog untuk membuat, mengedit, dan membaca postingan menarik.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <NextTopLoader
            color="#1f5bde"
          />
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
