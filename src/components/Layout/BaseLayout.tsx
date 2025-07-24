'use client'

import FloatingContacts from './FloatingContacts'
import Navbar from './Navbar'
import FreeTestFiles from '../Home/FreeTestFiles'
import Footer from './Footer'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <FreeTestFiles />
      <FloatingContacts />
      <Footer />
    </>
  )
}
