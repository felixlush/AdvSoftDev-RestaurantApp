import './globals.css'
import { Inter } from 'next/font/google'
import { Lusitana } from 'next/font/google'
import { CartProvider } from '@/app/context/CartContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Restaurant',
  description: 'online menu for restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider >
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
