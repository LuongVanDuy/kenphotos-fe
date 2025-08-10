'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CompareSlider } from '../Home/Old/CompareSlider'

interface ServiceCardProps {
  id: string | number
  index: number
  beforeImage: string
  afterImage: string
  title: string
  description: string
  rating: number | string
  orders: number | string
  discount: string
  originalPrice: string
  newPrice: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  index,
  beforeImage,
  afterImage,
  title,
  description,
  rating,
  orders,
  discount,
  originalPrice,
  newPrice,
}) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.1 * index,
      }}
      className='overflow-hidde rounded-[12px] bg-gradient-to-b bg-blue-50'
    >
      {/* Before/After slider */}
      <div className='relative h-80 bg-gray-200'>
        <CompareSlider beforeImage={beforeImage} afterImage={afterImage} />
      </div>

      {/* Card content */}
      <div className='p-6 text-start flex flex-col justify-between md:h-[230px]'>
        <h3
          className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817]
          md:text-[24px] md:leading-[24px]'
        >
          {title}
        </h3>

        <p className='text-[#444444] mb-4 flex-1'>{description}</p>

        {/* Rating & Price section */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center'>
              <span className='text-yellow-400 text-lg'>★</span>
              <span className='font-semibold ml-1'>{rating}</span>
            </div>
            <span className='text-gray-500 text-sm'>({orders} orders)</span>
          </div>
          <div className='flex items-center gap-2 text-center'>
            <span className='text-red-500 font-bold'>{discount}</span>
            <span className='text-gray-400 line-through'>{originalPrice}</span>
            <span className='text-green-600 font-bold text-lg'>{newPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
