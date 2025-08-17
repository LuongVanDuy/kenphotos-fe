import React from 'react'
import MainTitle from '../Common/Title/MainTitle'
import { CompareSlider } from '../Common/CompareSlider'
import CheckIcon from '@/components/Icons/CheckIcon'

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      beforeImage: '/images/view-4.jpg',
      afterImage: '/images/view-5.jpg',
      title: 'Professional Photography',
      benefits: [
        'High-quality equipment',
        'Experienced photographers',
        'Professional lighting setup',
      ],
    },
    {
      beforeImage: '/images/view-4.jpg',
      afterImage: '/images/view-5.jpg',
      title: 'Advanced Editing Process',
      benefits: ['24-step process', 'Color correction', 'Advanced retouching'],
    },
    {
      beforeImage: '/images/view-4.jpg',
      afterImage: '/images/view-5.jpg',
      title: 'Fast Turnaround',
      benefits: ['24-48 hour delivery', 'Express service available', 'Quality guaranteed'],
    },
  ]

  return (
    <section className='bg-white relative py-10 md:pt-[70px] md:pb-[120px]'>
      <div className='max-w-content mx-auto px-4'>
        <MainTitle
          title={<>Why Choose Us</>}
          content='All your photos perfected in 24 detailed steps — for just US$0.99.'
        />

        <div className='mt-12 md:mt-16 space-y-16 md:space-y-24'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 md:gap-12 items-center`}
            >
              {/* CompareSlider Section - Left/Right alternating */}
              <div className='w-full lg:w-1/2'>
                <div className='relative group'>
                  <div className='relative w-full h-[300px] md:h-[450px] aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-xl'>
                    <CompareSlider
                      beforeImage={feature.beforeImage}
                      afterImage={feature.afterImage}
                    />
                  </div>
                </div>
              </div>
              {/* Content Section - Right/Left alternating */}
              <div className='w-full lg:w-1/2 space-y-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <h3 className='text-[22px] leading-[30px] mb-4 font-bold text-[#161817] md:text-[24px] md:leading-[24px]'>
                    {feature.title}
                  </h3>
                </div>

                <ul className='space-y-3'>
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className='flex items-center gap-3'>
                      <CheckIcon size={16} color='#2563eb' />
                      <span className='text-gray-700 font-medium'>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
