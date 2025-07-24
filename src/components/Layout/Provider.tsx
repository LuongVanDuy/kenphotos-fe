'use client'

import store from '@/store/store'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import FloatingContacts from './FloatingContacts'
import authService from '@/services/authService'

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isHydrated, setIsHydrated] = useState(false)
  const isAdminRoute = pathname?.startsWith('/admin')

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Initialize auth on app startup
  useEffect(() => {
    if (isHydrated) {
      authService.initializeAuth()
    }
  }, [isHydrated])

  // Show consistent layout during hydration
  if (!isHydrated) {
    return (
      <SessionProvider>
        <AntdRegistry>
          <ConfigProvider locale={viVN}>
            <Provider store={store}>{children}</Provider>
          </ConfigProvider>
        </AntdRegistry>
      </SessionProvider>
    )
  }

  return (
    <SessionProvider>
      <AntdRegistry>
        {isAdminRoute ? (
          <Provider store={store}>{children}</Provider>
        ) : (
          <ConfigProvider locale={viVN}>
            <Provider store={store}>
              {children}
              <FloatingContacts />
            </Provider>
          </ConfigProvider>
        )}
      </AntdRegistry>
    </SessionProvider>
  )
}
