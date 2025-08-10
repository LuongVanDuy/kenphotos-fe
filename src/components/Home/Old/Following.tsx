'use client'
import Image from 'next/image'

const softwares = [
  {
    name: 'AutoCAD',
    image: '/images/following-1.png',
    alt: 'AutoCAD logo',
  },
  {
    name: 'Vray for SketchUp',
    image: '/images/following-2.png',
    alt: 'Vray for SketchUp logo',
  },
  {
    name: 'Photoshop',
    image: '/images/following-3.png',
    alt: 'Photoshop logo',
  },
  {
    name: 'Lightroom',
    image: '/images/following-4.png',
    alt: 'Lightroom logo',
  },
  {
    name: 'Illustrator',
    image: '/images/following-5.png',
    alt: 'Illustrator logo',
  },
  {
    name: 'Capture One',
    image: '/images/following-6.png',
    alt: 'Capture One logo',
  },
  {
    name: 'Premiere',
    image: '/images/following-7.png',
    alt: 'Premiere logo',
  },
  {
    name: '3ds Max',
    image: '/images/following-8.png',
    alt: '3ds Max logo',
  },
]

const Following: React.FC = () => {
  return (
    <section className='bg-[#F1FFF4] py-16'>
      <div className='max-w-content mx-auto px-4 text-center'>
        <h2 className='text-[25px] md:text-[45px] font-semibold normal-case not-italic no-underline pb-16 leading-[1.2em] tracking-[0px] text-[#1C244B]'>
          We use the following software
        </h2>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center pb-3'>
          {softwares.map((sw) => (
            <div key={sw.name} className='flex flex-col items-center'>
              <Image
                src={sw.image}
                alt={sw.alt}
                width={113}
                height={75}
                className='object-contain w-[113px] h-[75px] mb-2'
                priority
              />
              {/* <span className="text-xs text-[#1C244B] mt-1">{sw.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Following
