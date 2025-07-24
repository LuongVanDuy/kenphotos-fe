'use client'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

const media = [
  { name: 'The New York Times', src: '/images/about-1.png', alt: 'The New York Times' },
  { name: 'NBC News', src: '/images/about-2.png', alt: 'NBC News' },
  { name: 'CNN', src: '/images/about-3.png', alt: 'CNN' },
  { name: 'Fortune', src: '/images/about-4.png', alt: 'Fortune' },
  { name: 'USA Today', src: '/images/about-5.png', alt: 'USA Today' },
  { name: 'Bloomberg', src: '/images/about-6.png', alt: 'Bloomberg' },
  { name: 'BBC', src: '/images/about-7.png', alt: 'BBC' },
  { name: 'Forbes', src: '/images/about-8.png', alt: 'Forbes' },
  { name: 'Work', src: '/images/about-9.png', alt: 'Work' },
]

const AboutUs: React.FC = () => {
  return (
    <section className='bg-[#D4EFFF] overflow-hidden py-8 md:py-16'>
      <div className='max-w-content mx-auto px-4  text-center'>
        <h2 className='text-[20px] md:text-[45px] font-semibold text-[#1C244B] mb-4 md:mb-12'>
          The media talks about us
        </h2>

        <Marquee
          gradient={false}
          speed={50}
          direction='right'
          pauseOnHover={true}
          className='gap-4 md:gap-8'
        >
          {media.map((item, idx) => (
            <div
              key={idx}
              className='flex-shrink-0 w-[113px] h-[75px] md:w-[145px] md:h-[97px] flex items-center justify-center mx-4'
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={145}
                height={97}
                className='object-contain w-[113px] h-[75px] md:w-[145px] md:h-[97px]'
                priority
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default AboutUs
