import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import Hero from '@/app/components/Hero'
import Categories from './components/Categories'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <Footer />
    </main>
  )
}
