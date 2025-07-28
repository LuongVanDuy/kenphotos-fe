'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { useRef } from 'react'
import Link from 'next/link'

type Blog = {
  id: number
  title: string
  date: string
  image: string
  slug: string
}

const blogs: Blog[] = [
  {
    id: 1,
    title: 'Best real estate video apps',
    date: 'Feb 26, 2025',
    image: '/images/blog-2.jpg',
    slug: 'best-real-estate-video-apps',
  },
  {
    id: 2,
    title: 'Free furniture staging app',
    date: 'Feb 26, 2025',
    image: '/images/blog-1.jpg',
    slug: 'free-furniture-staging-app',
  },
  {
    id: 3,
    title: 'Real Estate Photography Tips',
    date: 'Feb 26, 2025',
    image: '/images/blog-3.jpg',
    slug: 'real-estate-photography-tips',
  },
  {
    id: 4,
    title: 'Mobile App UI/UX Design Trends 2025',
    date: 'Mar 12, 2025',
    image: '/images/blog-4.jpg',
    slug: 'mobile-app-ui-ux-trends-2025',
  },
  {
    id: 5,
    title: 'Top Real Estate Marketing Strategies',
    date: 'Mar 25, 2025',
    image: '/images/blog-3.jpg',
    slug: 'top-real-estate-marketing-strategies',
  },
  {
    id: 6,
    title: 'How to Take Better Interior Photos',
    date: 'Apr 5, 2025',
    image: '/images/blog-2.jpg',
    slug: 'how-to-take-better-interior-photos',
  },
  {
    id: 7,
    title: 'Staging Techniques That Sell Homes',
    date: 'Apr 18, 2025',
    image: '/images/blog-1.jpg',
    slug: 'staging-techniques-that-sell',
  },
]

const BlogDetailPage = ({ params }: { params: { slug: string[] } }) => {
  const swiperRef = useRef<SwiperCore>()
  const { slug } = params

  return (
    <div className='max-w-content mx-auto px-4 py-16 text-center'>
      <h1 className='text-[20px] md:text-[44px]  font-semibold  text-[#0D0D0D]'>
        How to Develop a Healthcare App Build Secure & Compliant Medical Apps
      </h1>

      <p className='text-base md:text-lg text-gray-600 mt-6 max-w-3xl mx-auto'>
        Explore the possibilities of healthcare app development: must-have features, costs, app
        types, compliance rules, and much more.
      </p>
      <div className='mt-10 text-sm text-gray-500'>
        Written by <span className='font-medium text-gray-700'>Nhật Long</span> &nbsp;|&nbsp;
        Updated: Tháng 2 26, 2025
      </div>
      <div className='mt-16 w-full  aspect-[5/2] relative overflow-hidden rounded-xl shadow'>
        <Image
          src='/images/blog-1.jpg'
          alt='Blog detail illustration'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Content */}
      <div className='relative flex gap-10 mt-16'>
        {/* Social Icons*/}
        <div className='hidden lg:flex flex-col gap-6 sticky top-32 h-fit text-gray-400'>
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-black transition'
          >
            <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.1 9.1 0 01-2.88 1.1A4.52 4.52 0 0016.5 0c-2.52 0-4.5 2.06-4.5 4.6 0 .36.03.71.1 1.05A12.94 12.94 0 013 1.64a4.52 4.52 0 001.4 6.13A4.48 4.48 0 012 7.08v.06c0 2.2 1.56 4.03 3.64 4.45a4.48 4.48 0 01-2.04.08c.58 1.88 2.27 3.25 4.26 3.3A9.06 9.06 0 012 18.58 12.78 12.78 0 008.29 21c7.55 0 11.68-6.42 11.68-11.99 0-.18-.01-.35-.02-.53A8.36 8.36 0 0023 3z' />
            </svg>
          </a>

          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-black transition'
          >
            <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.012 3.662 9.158 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.338 21.158 22 17.012 22 12z' />
            </svg>
          </a>

          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-black transition'
          >
            <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666h-3.554V9h3.414v1.561h.05c.476-.9 1.637-1.852 3.37-1.852 3.599 0 4.264 2.367 4.264 5.444v6.299zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.07 0-1.145.926-2.07 2.07-2.07s2.07.925 2.07 2.07c0 1.142-.926 2.07-2.07 2.07zM6.965 20.452H3.711V9h3.254v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.207 24 24 23.225 24 22.271V1.729C24 .774 23.207 0 22.225 0z' />
            </svg>
          </a>
        </div>

        {/* Contents section */}
        <div className='flex-1 text-start m-auto w-full sm:max-w-[592px] md:max-w-[600px] lg:max-w-[690px] xl:max-w-[792px] mb-24'>
          <p className='mb-5'>
            If you’re stuck on a healthcare app idea and completely stuck, believe me, I get it.
            You’re excited, absolutely, but now confronted with a slate of questions. Where do you
            start? How do you even know what features are even going to be important? And HIPAA? Can
            you just Google it, or is it eventually going to bite you back?
          </p>
          <h2 className='text-xl font-semibold text-[#0D0D0D] mb-4'>Contents:</h2>
          <ul className='list-disc list-inside text-[#0D0D0D] text-base space-y-2'>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Why Invest in Healthcare App Development?
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Types of Healthcare and Medical Apps You Can Build
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                How to Build a Healthcare App: Step-by-Step Process
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Must-Have Features of a Modern Medical App
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Key Technologies and Trends in Healthcare
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Compliance and Data Security Requirements
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Healthcare App Development Costs in 2025
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Monetization Models for Medical Apps
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                Why Work with a Healthcare App Development Company?
              </a>
            </li>
            <li>
              <a href='#' className='underline hover:text-[#00A3FF]'>
                FAQ: How to Create a Medical App
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className='text-[20px] md:text-[44px]  text-start font-semibold  text-[#0D0D0D]'>
          You may also like
        </h3>

        <div className='relative mt-8'>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className='absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 text-[32px] text-[#333] border border-[#eee] bg-white shadow-lg w-9 h-9 rounded-full flex items-center justify-center'
          >
            &lt;
          </button>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={false}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className='flex flex-col text-start'>
                  <Link href={`/blog/${blog.slug}`}>
                    <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50'>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                      />
                    </div>
                  </Link>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className='mt-3 text-xl font-semibold hover:text-[#00A3FF] cursor-pointer transition'>
                      {blog.title}
                    </h3>
                  </Link>
                  <p className='text-sm text-gray-500 mt-1'>{blog.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className='absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 text-[32px] text-[#333] shadow-lg border border-[#eee] bg-white font-thin w-9 h-9 rounded-full flex items-center justify-center'
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage
