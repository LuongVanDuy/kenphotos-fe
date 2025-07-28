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

      <div className='py-16 text-start mb-20'>
        <h2 className='text-2xl md:text-3xl font-semibold text-[#0D0D0D] mb-4'>
          Appointment Management / Scheduling
        </h2>

        <p className='text-gray-700 mb-4'>
          Even if your app isn’t focused on booking visits, scheduling tends to come up sooner or
          later, especially in provider-facing tools.
        </p>

        <p className='text-gray-700 font-medium mb-2'>Must-haves:</p>
        <ul className='list-disc list-inside text-gray-700 mb-6'>
          <li>Calendar integration</li>
          <li>Booking, rescheduling, cancellations</li>
          <li>Reminders via SMS/email</li>
          <li>Waitlist management</li>
          <li>Sync with EHRs or practice systems (if applicable)</li>
        </ul>

        <p className='text-gray-700'>
          To make the app even more convenient, add AI-powered search or smart matching, like
          suggesting the right specialist based on symptoms. This will make the patient’s life much
          easier.
        </p>
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
