'use client'

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const Banner: React.FC = () => {
  return (
    <section className='w-full bg-gray'>
      <div className='flex flex-col md:flex-row w-full min-h-[500px]'>
        <div className='flex-1 flex items-center justify-center p-8 min-h-[200px] max-w-content'>
          <div className='text-center md:text-left max-w-xl'>
            <h1 className='text-[32px] md:text-[48px] font-semibold text-black-base leading-tight mb-6'>
              Software design
              <br />
              and development company
            </h1>
            <p className='text-base md:text-lg text-[#4B4B4B] mb-8'>
              Shakuro is a multidisciplinary design and development agency
              <br className='hidden md:block' />
              working with individual startups and enterprises worldwide.
            </p>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
              <button className='px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition-all'>
                Get in touch
              </button>
            </div>
          </div>
        </div>
        <div className='flex-1 h-full'>
          <div className='text-center md:text-left'>
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src='/images/view-3.jpg'
                  alt='Before image'
                  style={{ filter: 'grayscale(0.5)' }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src='/images/view-2.jpg'
                  alt='After image'
                  style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                />
              }
              className='h-[500px]'
              position={50}
              style={{
                height: '500px',
              }}
              onlyHandleDraggable={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
