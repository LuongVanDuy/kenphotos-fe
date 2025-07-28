'use client'

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const Banner: React.FC = () => {
  return (
    <section className='w-full'>
      <div className='flex flex-col md:flex-row w-full min-h-[500px]'>
        <div className='flex-1 flex items-center justify-center bg-[#D4EFFF] p-8 min-h-[200px]'>
          <div className='text-center md:text-left'></div>
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
