'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface BenefitItem {
  id: string
  title: string
  description: string
  image: string
}

const WhyChooseUs: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  const benefits: BenefitItem[] = [
    {
      id: 'money-back-guarantee',
      title: 'Money Back Guarantee',
      description: 'Money back guarantee if you or the broker are not satisfied',
      image: '/images/choose-1.png',
    },
    {
      id: 'professional',
      title: 'Professional',
      description: 'Professional editing and services',
      image: '/images/choose-2.png',
    },
    {
      id: 'quick-turnaround',
      title: 'Quick Turnaround',
      description: '12-18 hour turnaround (24 hours for virtual staging)',
      image: '/images/choose-3.png',
    },
    {
      id: 'high-quality',
      title: 'High Quality',
      description: 'Consistent, best quality on every project',
      image: '/images/choose-4.png',
    },
    {
      id: 'free-test',
      title: 'Free Test',
      description: 'Send free test photos before ordering',
      image: '/images/choose-5.png',
    },
    {
      id: 'no-service-fees',
      title: 'No Service Fees',
      description: 'Real value, you only pay for each photo you need',
      image: '/images/choose-6.png',
    },
  ]

  return (
    <section className='py-16 bg-white' aria-labelledby='why-choose-us-heading'>
      <div className='max-w-content mx-auto px-4'>
        <header className='text-center mb-12'>
          <h2
            className='text-[20px] md:text-[30px] lg:text-[38px] font-[600] normal-case not-italic no-underline leading-[1.2em] py-[10px] tracking-[0px] text-[#00B3F7]'
            id='services-subtitle'
            data-aos='fade-down'
          >
            Real Estate Photo Editing, Virtual Staging, Real Estate Videos Editing Services
          </h2>
          <h1
            className='text-[20px] md:text-[55px] font-semibold normal-case not-italic py-[10px] no-underline leading-[1.2em] tracking-[0px] text-[#00A1F8]'
            id='why-choose-us-heading'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            WHY CHOOSE US
          </h1>
        </header>

        <div
          className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-8 gap-4'
          role='list'
          aria-label='Benefits of choosing our services'
        >
          {benefits.map((benefit) => (
            <article
              key={benefit.id}
              className='text-center'
              role='listitem'
              data-aos='zoom-in'
              data-aos-delay={200 + parseInt(benefit.id.split('-')[0]) * 100}
            >
              <div className='mb-4 flex justify-center' aria-hidden='true'>
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={115}
                  height={115}
                  className='object-contain w-[115px] h-[115px]'
                  priority
                />
              </div>
              <h3 className='text-[17px] md:text-[28px] font-bold text-text-blue mb-2'>
                {benefit.title}
              </h3>
              <p className='text-sm text-text-gray-dark leading-relaxed'>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
