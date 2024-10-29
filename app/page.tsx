import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/app/components/Hero'
import MenuPanel from './ui/Menu/MenuPanel'

export default function Home() {


  return (
    <main className='pt-40'>
      <Hero />
      <MenuPanel />
    </main>
  )
}
