'use client'

import store from '@/store/store'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation'
import FloatingContacts from './FloatingContacts'
import { AdminThemeProvider } from '@/components/Admin/UI/ThemeProvider'

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <SessionProvider>
      <AntdRegistry>
        {isAdminRoute ? (
          // Use advanced theme provider for admin routes
          <AdminThemeProvider>
            <Provider store={store}>
              {children}
            </Provider>
          </AdminThemeProvider>
        ) : (
          // Use basic config for public routes
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
