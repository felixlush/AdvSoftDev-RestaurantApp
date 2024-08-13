'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import Hero from '@/app/components/Hero'
import Categories from './components/Categories'
import Footer from './components/Footer'
import { User } from './lib/definitions'
import { useState } from 'react'

export default function Home() {

  const [user, setUser] = useState(null);

  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <Footer />
    </main>
  )
}
