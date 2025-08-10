'use client'

import FloatingContacts from './Contacts'
import Navbar from './Navbar'
import Footer from './Footer'
import { useScrollToForm } from '@/utils/useScrollToForm'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const scrollToForm = useScrollToForm()

  return (
    <>
      <Navbar onSendFreeTest={scrollToForm} />
      {children}
      <FloatingContacts />
      <Footer />
    </>
  )
}
