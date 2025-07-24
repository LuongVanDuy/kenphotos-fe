import LayoutProvider from '@/components/Layout/Provider'
import '../../public/css/globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import '../../public/css/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={poppins.variable}>
      <body>
        <StyledComponentsRegistry>
          <LayoutProvider>{children}</LayoutProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
