'use client'

import FloatingContacts from './FloatingContacts'
import Navbar from './Navbar'
import FreeTestFiles from '../Home/FreeTestFiles'
import Footer from './Footer'
import { useRef } from 'react'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navbar onSendFreeTest={scrollToContact} />
      {children}
      <div ref={contactRef}>
        <FreeTestFiles />
      </div>
      <FloatingContacts />
      <Footer />
    </>
  )
}
