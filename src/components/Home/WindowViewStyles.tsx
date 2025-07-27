'use client'

import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import { CompareSlider } from './CompareSlider'

// Dữ liệu
const services = [
  {
    title: 'HDR/Flash',
    desc: 'Turn winter to summer',
    beforeImage: '/images/resource-1.jpg',
    afterImage: '/images/view-1.jpg',
  },
  {
    title: 'Strong View/ Window Pull',
    desc: 'Manually blend multiple exposures',
    beforeImage: '/images/resource-1.jpg',
    afterImage: '/images/view-1.jpg',
  },
  {
    title: 'Medium View',
    desc: 'Add a setting sun to any photo',
    beforeImage: '/images/resource-1.jpg',
    afterImage: '/images/view-1.jpg',
  },
  {
    title: 'Soft View',
    desc: 'Add digital furniture and decor',
    beforeImage: '/images/resource-1.jpg',
    afterImage: '/images/view-1.jpg',
  },
  {
    title: 'Blow Out',
    desc: 'Make unwanted items disappear',
    beforeImage: '/images/resource-1.jpg',
    afterImage: '/images/view-1.jpg',
  },
]

const WindowViewStyles: React.FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [active, setActive] = useState(0)

  const handleSelect = (idx: number) => {
    setActive(idx)
    swiperRef.current?.slideToLoop(idx)
  }

  return (
    <section className='bg-[#D4EFFF] md:py-16'>
      <div className='max-w-content mx-auto px-4'>
        <h2 className='text-[#1C244B] text-[24px] md:text-[45px] font-semibold text-center pt-3 mb-6 md:mb-12 leading-[1.2em]'>
          We have what you need
        </h2>

        <div className='flex flex-col lg:flex-row w-full'>
          {/* Left */}
          <div className='lg:w-1/5 flex flex-col items-center lg:items-start'>
            <h3 className='text-[24px] md:text-[28px] font-semibold text-[#2CA6DF] mb-4 text-center lg:text-left'>
              Window View Style
            </h3>
            <ul className='text-[22px] md:text-[24px] text-[#1C244B] space-y-1 text-center lg:text-left'>
              <li>– American Style</li>
              <li>– Canadian Style</li>
              <li>– Scandinavian Style</li>
              <li>– Australian Style</li>
              <li>– Airbnb</li>
              <li>– Classic</li>
              <li>– Architecture</li>
            </ul>
          </div>

          {/* Right */}
          <div className='lg:w-4/5 mt-8 lg:mt-0 lg:pl-10 flex flex-col gap-6'>
            {/* Tabs */}
            <div className='flex gap-4 overflow-x-auto pb-2 custom-scrollbar whitespace-nowrap'>
              {services.map((sv, idx) => (
                <button
                  key={sv.title}
                  onClick={() => handleSelect(idx)}
                  className={`min-w-max px-5 py-3 rounded-[14px] border transition-all hover:shadow text-left ${
                    active === idx
                      ? 'border-[#2CA6DF] shadow-[0_0_0_2px_rgba(44,166,223,0.15)] bg-white'
                      : 'border-[#E2E8F0] bg-white'
                  }`}
                >
                  <p className='font-semibold text-[#1C244B] leading-none text-sm lg:text-base'>
                    {sv.title}
                  </p>
                  <p className='text-xs lg:text-sm text-[#64748B]'>{sv.desc}</p>
                </button>
              ))}
            </div>

            {/* Swiper slide */}
            <div className='w-full  aspect-[6/3] rounded-xl overflow-hidden bg-gray-100 shadow-xl'>
              <Swiper
                modules={[Navigation]}
                navigation={false}
                loop={true}
                allowTouchMove={false}
                simulateTouch={false}
                spaceBetween={30}
                slidesPerView={1}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                className='w-full h-full'
              >
                {services.map((service, index) => (
                  <SwiperSlide key={`slide-${index}`} className='h-full'>
                    <div className='relative w-full h-full'>
                      <CompareSlider
                        beforeImage={service.beforeImage}
                        afterImage={service.afterImage}
                        onDragStart={() => {
                          if (swiperRef.current) swiperRef.current.allowTouchMove = false
                        }}
                        onDragEnd={() => {
                          if (swiperRef.current) swiperRef.current.allowTouchMove = true
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WindowViewStyles
