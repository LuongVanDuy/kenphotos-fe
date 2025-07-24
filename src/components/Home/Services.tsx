'use client'

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Single Exposure',
      beforeImage: '/images/resource-1.jpg',
      afterImage: '/images/view-1.jpg',
      discount: '-20%',
      originalPrice: 'US$1',
      newPrice: 'US$0.8',
      description:
        'Taken with a phone or camera with one exposure per shot. This method of shooting is for Agents or homeowners take quick photos themselves, without looking out the window.',
      rating: 4.9,
      orders: '17.4k',
    },
    {
      id: 2,
      title: 'HDR Bracket',
      beforeImage: '/images/resource-1.jpg',
      afterImage: '/images/view-1.jpg',
      discount: '-17%',
      originalPrice: 'US$1.2',
      newPrice: 'US$1',
      description:
        'This technique helps to showcase the best aspects of a property by ensuring that both the interior and exterior are well-lit and detailed, even in challenging lighting conditions. 5 exposures is the best.',
      rating: 5,
      orders: '16k+',
    },
    {
      id: 3,
      title: 'Flambient',
      beforeImage: '/images/resource-1.jpg',
      afterImage: '/images/view-1.jpg',
      discount: '-20%',
      originalPrice: 'US$1.5',
      newPrice: 'US$1.2',
      description:
        'The "flambient" method for shooting real estate photography involves combining both flash and ambient light in your shots. Use multiple flash shots.',
      rating: 4.9,
      orders: '15.7k+',
    },
    {
      id: 4,
      title: 'Virtual Staging',
      beforeImage: '/images/resource-1.jpg',
      afterImage: '/images/view-1.jpg',
      discount: '-33%',
      originalPrice: 'US$29.99',
      newPrice: 'US$19.99',
      description:
        'Turn an empty room into a fully furnished room. Home staging is completed quickly on the computer rather than in person, requiring a lot less cost and labor',
      rating: 5,
      orders: '8.7k',
    },
    {
      id: 5,
      title: 'Day To Twilight or Dusk',
      beforeImage: '/images/resource-1.jpg',
      afterImage: '/images/view-1.jpg',
      discount: '-17%',
      originalPrice: 'US$5.99',
      newPrice: 'US$4.99',
      description:
        'Creating an artistically advanced sunset photo only from a daytime outdoor photo without requiring you to capture an additional picture.',
      rating: 4.9,
      orders: '6.3k',
    },
    {
      id: 6,
      title: 'Water in Pool',
      beforeImage: '/images/resource-1.jpg',
      afterImage: '/images/view-1.jpg',
      discount: '-17%',
      originalPrice: 'US$5.99',
      newPrice: 'US$4.99',
      description:
        'Houses with swimming pools are often valuable, sometimes the pool is dry or surrounded by dirt, we will remove the dirt or replace the water in the pool to help increase the value of your property',
      rating: 4.9,
      orders: '3.5k',
    },
  ]

  return (
    <section className='bg-[#D4EFFF] py-16'>
      <div className='max-w-content mx-auto p-[10px] text-center'>
        <div className='py-[10px]'>
          <h2
            className='text-[25px] md:text-[60px] font-semibold normal-case not-italic no-underline leading-[1.2em] tracking-[0px] text-[#1C244B]'
            id='services-subtitle'
          >
            ALL OUR SERVICES​
          </h2>
          <p className='mb-[15px] text-[#1C244B] text-[17px] md:text-[24px]'>
            Fast Delivery. High Quality. 100% Satisfaction​. Edit photos first, pay later.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {services.map((service) => (
            <div key={service.id} className=' overflow-hidden'>
              {/* Image Comparison */}
              <div className='relative h-64 bg-gray-200'>
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={service.beforeImage}
                      alt='Before Image'
                      className='object-cover w-full h-64'
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={service.afterImage}
                      alt='After Image'
                      className='object-cover w-full h-64'
                    />
                  }
                  position={50}
                  className='h-full'
                  style={{ height: '100%' }}
                />
              </div>

              {/* Content */}
              <div className='p-6 text-center'>
                {/* Title */}
                <h3 className='text-xl font-bold text-[#1C244B] mb-3'>{service.title}</h3>

                {/* Pricing */}
                <div className='flex items-center justify-center gap-2 mb-3 text-center'>
                  <span className='text-red-500 font-bold'>{service.discount}</span>
                  <span className='text-gray-400 line-through'>{service.originalPrice}</span>
                  <span className='text-green-600 font-bold text-lg'>{service.newPrice}</span>
                </div>

                {/* Description */}
                <p className='text-gray-600 text-sm leading-relaxed mb-4'>{service.description}</p>

                {/* Rating */}
                <div className='flex items-center gap-2 justify-center'>
                  <div className='flex items-center'>
                    <span className='text-yellow-400 text-lg'>★</span>
                    <span className='font-semibold ml-1'>{service.rating}</span>
                  </div>
                  <span className='text-gray-500 text-sm'>({service.orders} orders)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
