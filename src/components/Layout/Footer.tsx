'use client'

import Image from 'next/image'
import {
  AddressIcon,
  FacebookIcon,
  MailBulkIcon,
  SkypeIcon,
  TelegramIcon,
  WhatsappIcon,
} from '@/components/Icons'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className='bg-[#151515] text-white py-10 md:py-[120px] mb-[30px] md:mb-0 relative'>
      <div className=' max-w-content mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <span className='text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white'>
              Photo Editing
            </span>
            <ul className='space-y-3 text-[#ccc] text-[16px]'>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/single-exposure'
                  className='block hover:text-white transition-colors'
                >
                  Single Exposure
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/hdr-bracket'
                  className='block hover:text-white transition-colors'
                >
                  HDR Bracket
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/flambient'
                  className='block hover:text-white transition-colors'
                >
                  Flambient
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/day-to-twilight'
                  className='block hover:text-white transition-colors'
                >
                  Day To Twilight or Dusk
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/water-in-pool'
                  className='block hover:text-white transition-colors'
                >
                  Water in Pool
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <span className='text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white'>
              3D Visualizations
            </span>
            <ul className='space-y-3 text-[#ccc] text-[16px]'>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/360-image-enhancement'
                  className='block hover:text-white transition-colors'
                >
                  360° Image Enhancement
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/webshops'
                  className='block hover:text-white transition-colors'
                >
                  Webshops
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/virtual-staging'
                  className='block hover:text-white transition-colors'
                >
                  Virtual Staging
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/virtual-renovations'
                  className='block hover:text-white transition-colors'
                >
                  Virtual Renovations
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/360-virtual-staging'
                  className='block hover:text-white transition-colors'
                >
                  360° Virtual Staging
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/changing-seasons'
                  className='block hover:text-white transition-colors'
                >
                  Changing Seasons
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <span className='text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white'>
              Advanced Editing
            </span>
            <ul className='space-y-3 text-[#ccc] text-[16px]'>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/real-estate-video-editing'
                  className='block hover:text-white transition-colors'
                >
                  Real Estate Video Editing
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/webshops'
                  className='block hover:text-white transition-colors'
                >
                  Webshops
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/item-removal'
                  className='block hover:text-white transition-colors'
                >
                  Item Removal
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/aerial-drone-highlight'
                  className='block hover:text-white transition-colors'
                >
                  Aerial/ Drone Highlight
                </Link>
              </li>
              <li className='hover:text-white transition-colors cursor-pointer'>
                <Link
                  href='/services/lawn-replacement'
                  className='block hover:text-white transition-colors'
                >
                  Lawn Replacement
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <div className='flex flex-col gap-[24px]'>
              <h6 className='text-start text-[16px]  font-semibold capitalize not-italic no-underline leading-[1.2em] tracking-[0px] text-[#fff]'>
                Get In Touch
              </h6>
              <ul className='space-y-2 text-[16px] text-[#ccc]'>
                <li className='cursor-pointer'>
                  <span className='inline-flex items-center gap-2 group'>
                    <MailBulkIcon
                      size={20}
                      className='inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer'
                      aria-hidden='true'
                    />
                    <span className='sr-only'>Email:</span>
                    <Link
                      href='mailto:truecolorcso@gmail.com'
                      className='hover:text-[#00A1F8] transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                      passHref
                    >
                      {' '}
                      truecolorcso@gmail.com
                    </Link>
                  </span>
                </li>
                <li className='cursor-pointer'>
                  <span className='inline-flex items-center gap-2 group'>
                    <WhatsappIcon
                      size={20}
                      className='inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer'
                      aria-hidden='true'
                    />
                    <span className='sr-only'>WhatsApp:</span>
                    <Link
                      href='https://wa.me/84339871448'
                      className='hover:text-[#00A1F8] transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                      passHref
                    >
                      (+84) 339 871 448
                    </Link>
                  </span>
                </li>
                <li className='cursor-pointer'>
                  <span className='inline-flex items-center gap-2 group'>
                    <SkypeIcon
                      size={20}
                      className='inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer'
                      aria-hidden='true'
                    />
                    <span className='sr-only'>Skype:</span>
                    <Link
                      href='https://join.skype.com/invite/y68aYbgqRRAx'
                      className='hover:text-[#00A1F8] transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                      passHref
                    >
                      join.skype.com/invite/y68aYbgqRRAx
                    </Link>
                  </span>
                </li>
                <li className='cursor-pointer'>
                  <span className='inline-flex items-center gap-2 group'>
                    <TelegramIcon
                      size={20}
                      className='inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer'
                      aria-hidden='true'
                    />
                    <span className='sr-only'>Telegram:</span>
                    <Link
                      href='https://t.me/+84339871448'
                      className='hover:text-[#00A1F8] transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                      passHref
                    >
                      (+84) 339 871 448
                    </Link>
                  </span>
                </li>
                <li className='cursor-pointer'>
                  <span className='inline-flex items-center gap-2 group'>
                    <FacebookIcon
                      size={20}
                      className='inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer'
                      aria-hidden='true'
                    />
                    <span className='sr-only'>Facebook Fanpage:</span>
                    <Link
                      href='https://www.facebook.com/Truecoloredit'
                      className='hover:text-[#00A1F8] transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                      passHref
                    >
                      facebook.com/Truecoloredit
                    </Link>
                  </span>
                </li>
                <li className='cursor-pointer'>
                  <address className='not-italic inline-flex items-center gap-2 group'>
                    <div className='w-5'>
                      <AddressIcon
                        size={20}
                        className='inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer'
                        aria-hidden='true'
                      />
                    </div>

                    <span className='sr-only'>Address:</span>
                    <Link
                      href='https://www.facebook.com/Truecoloredit'
                      className='hover:text-[#00A1F8] transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                      passHref
                    >
                      32-33 TT02, Tay Nam Linh Dam Urban Area, Hoang Liet Ward, Hoang Mai District,
                      Hanoi City, Viet Nam
                    </Link>
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
