import './globals.css'
import { Inter } from 'next/font/google'
import { Lusitana } from 'next/font/google'
import { CartProvider } from '@/app/context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tacos 2 u',
  description: 'website for tacos 2 u',
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
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
