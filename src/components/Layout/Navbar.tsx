'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon, HamburgerIcon, CloseIcon, ArrowRightIcon } from '@/components/Icons'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
export interface MenuGroup {
  title: string
  items: { label: string; href: string }[]
}

export interface MenuItem {
  label: string
  href?: string
  active?: boolean
  groups?: MenuGroup[]
}

const menuItems: MenuItem[] = [
  { label: 'HOME', href: '/', active: true },
  {
    label: 'SERVICES',
    groups: [
      {
        title: 'Photo Editing',
        items: [
          {
            label: 'Single Exposure',
            href: '/services/photo-editing/single-exposure',
          },
          { label: 'HDR Bracket', href: '/services/photo-editing/hdr-bracket' },
          { label: 'Flambient', href: '/services/photo-editing/flambient' },
          {
            label: 'Day To Twilight or Dusk',
            href: '/services/photo-editing/day-to-twilight',
          },
          {
            label: 'Water in Pool',
            href: '/services/photo-editing/water-in-pool',
          },
        ],
      },
      {
        title: '3D Visualizations',
        items: [
          { label: '360° Image Enhancement', href: '/services/3d/360-image' },
          { label: 'Virtual Staging', href: '/services/3d/virtual-staging' },
          {
            label: 'Virtual Renovations',
            href: '/services/3d/virtual-renovations',
          },
          {
            label: '360° Virtual Staging',
            href: '/services/3d/360-virtual-staging',
          },
          { label: 'Changing Seasons', href: '/services/3d/changing-seasons' },
        ],
      },
      {
        title: 'Advanced Editing',
        items: [
          {
            label: 'Real Estate Video Editing',
            href: '/services/advanced/video-editing',
          },
          { label: 'Item Removal', href: '/services/advanced/item-removal' },
          {
            label: 'Aerial/ Drone Highlight',
            href: '/services/advanced/aerial-drone',
          },
          { label: 'Yacht', href: '/services/advanced/yacht' },
          {
            label: 'Lawn Replacement',
            href: '/services/advanced/lawn-replacement',
          },
        ],
      },
    ],
  },
  { label: 'PRICE LIST', href: '/price-list/' },
  { label: 'CONTACT', href: '/contact/' },
  { label: 'ABOUT US', href: '/about-us/' },
  { label: 'BLOG', href: '/blog/' },
]

const Navbar: React.FC<{ onSendFreeTest?: () => void }> = ({ onSendFreeTest }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileGroups, setOpenMobileGroups] = useState<{ [key: string]: boolean }>({})
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<number | null>(null)

  return (
    <>
      <header className='bg-[#B5DEF5] w-full shadow-sm sticky top-0 z-50'>
        <nav
          aria-label='Main Navigation'
          className='max-w-[1200px] mx-auto flex items-center justify-center gap-[10px] p-[15px] '
        >
          {/* Logo */}
          <Link href='/' className='flex items-center' aria-label='True Colors Home'>
            <Image
              src='/images/logo.png'
              alt='True Colors by [Tên thương hiệu, ví dụ: KenPhotos] - Professional Real Estate Photo Editing'
              width={130}
              height={50}
              className='w-[130px] h-[50px] object-cover'
              priority
            />
          </Link>
          {/* Desktop Menu */}
          <ul className='hidden md:flex items-center  text-sm font-medium mx-14' role='menubar'>
            {menuItems.map((item: MenuItem, idx: number) => (
              <li key={item.label} role='none' className={item.groups ? 'relative group' : ''}>
                {item.groups ? (
                  <>
                    <button
                      aria-haspopup='true'
                      aria-expanded={isMegaMenuOpen === idx ? 'true' : 'false'}
                      aria-controls={`mega-menu-${idx}`}
                      onMouseEnter={() => setIsMegaMenuOpen(idx)}
                      onFocus={() => setIsMegaMenuOpen(idx)}
                      onMouseLeave={() => setIsMegaMenuOpen(null)}
                      onBlur={() => setIsMegaMenuOpen(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                        }
                        if (e.key === 'Escape') {
                          ;(e.target as HTMLElement).blur()
                        }
                      }}
                      className='flex items-center gap-1 peer font-[600] p-[10px] mx-[5px] text-[16px] hover:text-[#2196f3] transition-colors'
                      role='menuitem'
                      tabIndex={0}
                      type='button'
                      aria-label='Open Services Menu'
                    >
                      {item.label}{' '}
                      <span aria-hidden='true'>
                        <ChevronDownIcon size={16} />
                      </span>
                    </button>
                    <div className='absolute left-1/2 -translate-x-1/3 top-full h-6 min-w-[700px] z-10 pointer-events-auto bg-transparent group-hover:block hidden' />
                    <ul
                      id={`mega-menu-${idx}`}
                      className='absolute left-1/2 -translate-x-1/3 mt-2 bg-white shadow-lg rounded z-20 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0 peer-hover:translate-y-0 flex p-8 gap-12 min-w-[700px]'
                      style={{ top: '100%' }}
                      role='menu'
                      aria-label='Services Mega Menu'
                    >
                      {item.groups.map((group: MenuGroup, gidx: number) => (
                        <li key={group.title} className='min-w-[200px]' role='none'>
                          <div
                            className='font-bold text-[#00A1F8] mb-3 text-[16px]'
                            id={`group-title-${gidx}`}
                          >
                            {group.title}
                          </div>
                          <ul aria-labelledby={`group-title-${gidx}`}>
                            {group.items.map((sub, sidx) => (
                              <li key={sub.label} role='none'>
                                {sub.href ? (
                                  <Link
                                    href={sub.href}
                                    className='block px-0 py-1 text-[14px] text-black hover:text-[#2196f3]'
                                    role='menuitem'
                                    tabIndex={-1}
                                    title={sub.label + ' | Services'}
                                  >
                                    {sub.label}
                                  </Link>
                                ) : (
                                  <span
                                    className='block px-0 py-1 text-[14px] text-gray-400 cursor-not-allowed'
                                    role='menuitem'
                                  >
                                    {sub.label}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : item.href ? (
                  <Link
                    href={item.href!}
                    className={
                      pathname === item.href
                        ? 'text-[#2196f3] font-[600] p-[10px] mx-[5px] text-[16px]'
                        : 'hover:text-[#2196f3] font-[600] p-[10px] mx-[5px] text-[16px]'
                    }
                    role='menuitem'
                    title={item.label}
                    tabIndex={0}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className='text-gray-400 cursor-not-allowed font-[700]' role='menuitem'>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {/* CTA Button Desktop */}
          <button
            onClick={onSendFreeTest}
            className='hidden md:flex ml-6 bg-[#51C6FF] text-black px-[30px] py-[15px] text-[16px] font-medium items-center gap-2 shadow hover:bg-[#000] hover:text-[#fff] transition-colors'
            role='button'
            title='Send Free Test'
          >
            Send Free Test <ArrowRightIcon />
          </button>

          {/* Hamburger icon for mobile */}
          <button
            className='md:hidden bg-white rounded-[3px] w-[63px] h-[41px] shadow-md py-[12px] px-[20px] flex justify-center items-center ml-auto'
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              if (!isMobileMenuOpen) {
                setIsMobileMenuOpen(true)
                setIsOpening(false)
                setTimeout(() => setIsOpening(true), 10)
              } else {
                setIsClosing(true)
                setTimeout(() => {
                  setIsMobileMenuOpen(false)
                  setIsClosing(false)
                  setIsOpening(false)
                }, 300)
              }
            }}
          >
            <HamburgerIcon size={28} />
          </button>
        </nav>
        {/* Mobile Menu Overlay */}
        {(isMobileMenuOpen || isClosing) && (
          <>
            {/*Lớp overlay  */}
            <div
              className={`fixed inset-0 z-40 bg-black bg-opacity-40 cursor-pointer transition-opacity duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ left: '90vw', width: '10vw' }}
              onClick={() => {
                setIsClosing(true)
                setTimeout(() => {
                  setIsMobileMenuOpen(false)
                  setIsClosing(false)
                  setIsOpening(false)
                  setOpenMobileGroups({})
                }, 300)
              }}
              aria-hidden='true'
            />

            <div
              className={`fixed top-0 left-0 h-full w-[90vw] min-w-0 max-w-none bg-white shadow-lg border-r border-gray-200 flex flex-col p-0 z-50 transition-transform duration-300 ease-in-out ${
                isClosing || !isOpening ? '-translate-x-full' : 'translate-x-0'
              }`}
            >
              <button
                className='absolute top-0 right-0 w-[32px] h-[32px] bg-black flex items-center justify-center z-50'
                aria-label='Close menu'
                onClick={() => {
                  setIsClosing(true)
                  setTimeout(() => {
                    setIsMobileMenuOpen(false)
                    setIsClosing(false)
                    setIsOpening(false)
                    setOpenMobileGroups({})
                  }, 300)
                }}
              >
                <CloseIcon size={36} color='white' />
              </button>
              <ul className='flex flex-col gap-2 text-lg font-semibold px-4 pt-10 mt-5' role='menu'>
                {menuItems.map((item: MenuItem, idx: number) => (
                  <li key={item.label}>
                    {item.groups ? (
                      <>
                        <button
                          className='w-full flex items-center justify-between py-3 px-2 rounded hover:bg-blue-50 focus:bg-blue-100 transition text-[16px]'
                          aria-haspopup='true'
                          aria-expanded={openMobileGroups[item.label] || false}
                          aria-controls={`mobile-${item.label.toLowerCase()}-menu`}
                          onClick={() =>
                            setOpenMobileGroups((prev) => ({
                              ...prev,
                              [item.label]: !prev[item.label],
                            }))
                          }
                          tabIndex={0}
                          role='menuitem'
                        >
                          {item.label}
                          <span aria-hidden='true'>
                            <ChevronDownIcon size={16} />
                          </span>
                        </button>
                        {/* Mobile dropdown */}
                        {openMobileGroups[item.label] && (
                          <ul
                            id={`mobile-${item.label.toLowerCase()}-menu`}
                            className='pl-4 py-2 flex flex-col gap-4 bg-blue-50 rounded-b'
                            role='menu'
                          >
                            {item.groups.map((group: MenuGroup, gidx: number) => (
                              <li key={group.title} className='mb-2'>
                                <div className='font-bold text-[#2196f3] mb-1 text-base'>
                                  {group.title}
                                </div>
                                <ul>
                                  {group.items.map((sub, sidx) => (
                                    <li key={sub.label}>
                                      <Link
                                        href={sub.href}
                                        className='block py-1 text-base text-black hover:text-[#2196f3]'
                                        tabIndex={0}
                                        title={sub.label + ' | Services'}
                                        onClick={() => {
                                          setIsMobileMenuOpen(false)
                                          setOpenMobileGroups({}) // Reset all mobile groups
                                        }}
                                        role='menuitem'
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className={
                          item.active
                            ? 'text-[#2196f3] font-bold block py-3 px-2 rounded bg-blue-50 text-[16px]'
                            : 'block py-3 px-2 rounded hover:bg-blue-50 text-[16px]'
                        }
                        tabIndex={0}
                        title={item.label}
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setOpenMobileGroups({})
                        }}
                        role='menuitem'
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li className='mt-6'>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setOpenMobileGroups({})
                      setTimeout(() => {
                        onSendFreeTest?.()
                      }, 300)
                    }}
                    className='block w-full bg-[#29b6f6] text-black px-6 py-3 rounded text-base font-medium text-center shadow hover:bg-[#03a9f4] transition-colors'
                    role='button'
                    title='Send Free Test'
                  >
                    Send Free Test <ArrowRightIcon />
                  </button>
                </li>
              </ul>
            </div>
            <style jsx global>{`
              @keyframes slideInLeft {
                from {
                  transform: translateX(-100%);
                }
                to {
                  transform: translateX(0);
                }
              }
              .animate-slideInLeft {
                animation: slideInLeft 0.25s cubic-bezier(0.4, 0, 0.2, 1);
              }
            `}</style>
          </>
        )}
      </header>
    </>
  )
}

export default Navbar
