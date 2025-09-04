'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon, ArrowRightIcon, HamburgerIcon } from '@/components/Icons'
import { usePathname, useRouter } from 'next/navigation'
import { stripHtml } from '@/utils/metadata'

export interface MenuGroup {
  name: string
  slug: string
  children?: MenuGroup[]
}

export interface MenuItem {
  name: string
  slug: string
  children?: MenuGroup[]
}

const Navbar: React.FC<{ onSendFreeTest?: () => void; menu: any }> = ({ onSendFreeTest, menu }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<number | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [selectedMobileGroup, setSelectedMobileGroup] = useState<{
    groups: MenuGroup[]
    parentSlug: string
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isScrolled, setIsScrolled] = useState(false)

  const parsedMenu: MenuItem[] = React.useMemo(() => {
    if (typeof menu === 'string') {
      try {
        return JSON.parse(menu)
      } catch (error) {
        return []
      }
    }
    return Array.isArray(menu) ? menu : []
  }, [menu])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isPathActive = (slug: string) => {
    if (slug === 'home') return pathname === '/'
    if (slug === 'services') {
      return pathname === '/services' || pathname.startsWith('/services/')
    }
    return pathname === `/${slug}` || pathname.startsWith(`/${slug}/`)
  }

  const hasActiveChild = (item: MenuItem) => {
    if (!item.children) return false
    return item.children.some((group) =>
      group.children?.some((child) => isNestedChildActive(child.slug, item.slug))
    )
  }

  const generateHref = (item: MenuItem, parentSlug?: string) => {
    if (item.slug === 'home') return '/'
    if (parentSlug) {
      return `/${parentSlug}/${item.slug}`
    }
    return `/${item.slug}`
  }

  const isNestedChildActive = (slug: string, parentSlug: string) => {
    return pathname === `/${parentSlug}/${slug}` || pathname.startsWith(`/${parentSlug}/${slug}/`)
  }

  if (!parsedMenu || parsedMenu.length === 0) {
    return (
      <div className='fixed top-0 left-0 w-full z-50'>
        <header className='bg-white shadow-[0px_4px_8px_0px_rgba(21,58,160,0.1)] md:mx-auto px-4 py-3 md:py-5 relative z-50'>
          <div className='max-w-content mx-auto px-4 flex items-center justify-between'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='Logo'
                width={130}
                height={50}
                className='object-contain'
              />
            </Link>
            <div className='text-gray-500'>Menu loading...</div>
          </div>
        </header>
      </div>
    )
  }

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-all duration-300 ease-in-out
          ${
            isMegaMenuOpen !== null &&
            parsedMenu[isMegaMenuOpen]?.slug === 'services' &&
            parsedMenu[isMegaMenuOpen]?.children
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
      />
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />
      <header
        className='bg-white shadow-[0px_4px_8px_0px_rgba(21,58,160,0.1)] md:mx-auto px-4 py-3 md:py-5  relative z-50 transition-all duration-300'
        ref={containerRef}
      >
        <div className='max-w-content mx-auto px-4 flex items-center justify-between'>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              alt='Logo'
              width={130}
              height={50}
              className='object-contain'
            />
          </Link>
          <ul className='hidden md:flex gap-6 text-sm font-medium'>
            {parsedMenu.map((item, idx) => (
              <li
                key={item.slug}
                className='relative'
                {...(item.slug === 'services' &&
                  item.children && {
                    onMouseEnter: () => setIsMegaMenuOpen(idx),
                    onMouseLeave: () => setIsMegaMenuOpen(null),
                  })}
              >
                {item.slug === 'services' && item.children ? (
                  <>
                    <button
                      className={`text-[16px] flex items-center gap-1 hover:text-black/80 transition ${
                        isPathActive(item.slug) || hasActiveChild(item)
                          ? 'text-blue-600 font-semibold'
                          : 'text-black'
                      }`}
                    >
                      {item.name} <ChevronDownIcon size={16} />
                    </button>

                    {isMegaMenuOpen === idx && (
                      <div
                        className='absolute top-full left-1/2 -translate-x-1/2 w-[200px] h-[40px] z-40'
                        onMouseEnter={() => setIsMegaMenuOpen(idx)}
                        onMouseLeave={() => setIsMegaMenuOpen(null)}
                      ></div>
                    )}

                    <div
                      className={`
                      absolute top-[calc(100%+40px)] left-1/2 -translate-x-1/2
                      bg-white shadow-2xl rounded-3xl p-10 flex gap-12 z-50
                      transition-all duration-300 ease-in-out
                      w-auto min-w-max
                      ${
                        isMegaMenuOpen === idx
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-2 pointer-events-none'
                      }
                    `}
                      onMouseEnter={() => setIsMegaMenuOpen(idx)}
                      onMouseLeave={() => setIsMegaMenuOpen(null)}
                    >
                      {item.children.map((group) => (
                        <div key={group.slug} className='min-w-[200px]'>
                          <div className='font-semibold text-blue-600 mb-3'>{group.name}</div>
                          <ul className='space-y-2'>
                            {group.children?.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  href={generateHref(sub, item.slug)}
                                  onClick={() => setIsMegaMenuOpen(null)}
                                  className={`transition ${
                                    isNestedChildActive(sub.slug, item.slug)
                                      ? 'text-blue-600 font-semibold'
                                      : 'text-black/80 hover:text-black'
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.slug === 'home' ? '/' : `/${item.slug}`}
                    className={`transition text-[16px] font-medium hover:text-black/80 ${
                      isPathActive(item.slug) ? 'text-blue-600 font-semibold' : 'text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={onSendFreeTest}
            className='hidden md:flex ml-6 bg-[#2D6DFF] rounded-full text-white px-6 py-3 text-sm font-medium items-center gap-2 shadow hover:bg-black/90 transition'
          >
            Send Free Test <ArrowRightIcon />
          </button>
          <button
            className='md:hidden bg-white w-[44px] h-[44px] flex items-center justify-center border border-[#eee] rounded-lg'
            onClick={() => {
              setIsMobileOpen(!isMobileOpen)
              setSelectedMobileGroup(null)
            }}
            aria-label='Toggle menu'
          >
            {isMobileOpen ? 'X' : <HamburgerIcon />}
          </button>
        </div>
      </header>

      {isMobileOpen && (
        <div className='fixed top-0 inset-x-0 p-4 mt-[90px] z-50'>
          <div className='bg-white rounded-3xl p-4 space-y-4 transition-all'>
            {!selectedMobileGroup ? (
              <>
                {parsedMenu.map((item) => (
                  <div key={item.slug}>
                    {item.slug === 'services' && item.children ? (
                      <button
                        onClick={() =>
                          setSelectedMobileGroup({
                            groups: item.children!,
                            parentSlug: item.slug,
                          })
                        }
                        className='w-full text-left py-2 px-3 text-black font-medium flex justify-between items-center'
                      >
                        {item.name} <ChevronDownIcon size={16} />
                      </button>
                    ) : (
                      <Link
                        href={item.slug === 'home' ? '/' : `/${item.slug}`}
                        onClick={() => setIsMobileOpen(false)}
                        className='block py-2 px-3 text-black font-medium'
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className='space-y-4'>
                <button
                  onClick={() => setSelectedMobileGroup(null)}
                  className='text-sm text-gray-600 flex items-center gap-1'
                >
                  ← Back
                </button>
                <div className='max-h-[50vh] overflow-y-auto space-y-4 pr-2'>
                  {selectedMobileGroup.groups.map((group) => (
                    <div key={group.slug}>
                      <div className='font-semibold text-[#A78956] mb-2'>{group.name}</div>
                      <ul className='space-y-2'>
                        {group.children?.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={generateHref(sub, selectedMobileGroup.parentSlug)}
                              onClick={() => setIsMobileOpen(false)}
                              className='text-black/80 hover:text-black transition block px-3'
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setIsMobileOpen(false)
                if (onSendFreeTest) {
                  onSendFreeTest()
                }
              }}
              className='bg-[#2D6DFF] rounded-full text-white px-6 py-3 text-sm font-medium w-full flex items-center justify-center gap-2 shadow hover:bg-black/90 transition'
            >
              Send Free Test <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
