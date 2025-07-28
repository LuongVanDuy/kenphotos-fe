import Clients from '@/components/Home/Clients'
import Following from '@/components/Home/Following'
import FreeTestFiles from '@/components/Home/FreeTestFiles'
import BaseLayout from '@/components/Layout/BaseLayout'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import LayoutProvider from '@/components/Layout/Provider'
import Image from 'next/image'

interface StoryItem {
  title: string
  description: string
  imagePath: string
}

const storyData: StoryItem[] = [
  {
    title: 'The way to get started is to quit talking and begin doing!',
    description:
      'At True Color, we understand that in the dynamic world of real estate, captivating visuals are paramount. We are a dedicated team of professionals committed to providing top-tier real estate photo editing services that elevate your property listings to new heights.',
    imagePath: '/images/resourse-2.jpg',
  },
  {
    title: 'Passion',
    description:
      'Established with a passion for enhancing real estate imagery, TRUE COLOR is a leading provider of premium photo editing solutions tailored specifically for the real estate industry. With years of experience and a keen eye for detail, our team brings properties to life through expert editing techniques and creative flair.',
    imagePath: '/images/resourse-2.jpg',
  },
  {
    title: 'Professional service',
    description:
      "Whether you're a real estate agent, photographer, or property developer, partnering with True Color is the key to unlocking the full potential of your property listings. With our expert editing services, you can showcase your properties in the best possible light and attract more buyers than ever before.",
    imagePath: '/images/resourse-2.jpg',
  },
]

const AboutPage = () => {
  return (
    <>
      <div className='min-h-[350px] bg-black'>
        <div className='max-w-content mx-auto'>
          <div className='px-4 md:px-12 py-16 text-white text-left'>
            <p className='text-[24px] text-gray-400 font-medium mb-4'>About us</p>
            <h1 className='text-[32px] md:text-[48px] leading-tight font-[500] mb-6'>
              We are True Color. A digital
              <br className='hidden md:block' />
              design and editing company
            </h1>
            <p className='max-w-3xl text-base md:text-lg text-gray-300 mb-12'>
              We help our clients build their brand identity, and design, develop, launch, and
              support their digital products. Working with startups and real estate businesses from
              all over the world.
            </p>

            <div className='grid grid-cols-3 gap-4 max-w-md'>
              <div className='text-left'>
                <p className='text-3xl md:text-4xl font-semibold text-white'>150+</p>
                <p className='text-sm text-gray-400 mt-1'>team members</p>
              </div>
              <div className='text-left'>
                <p className='text-3xl md:text-4xl font-semibold text-white'>500+</p>
                <p className='text-sm text-gray-400 mt-1'>completed projects</p>
              </div>
              <div className='text-left'>
                <p className='text-3xl md:text-4xl font-semibold text-white'>10</p>
                <p className='text-sm text-gray-400 mt-1'>years in business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Phần mới thêm vào */}
      <div className='max-w-content px-4 py-8 md:py-[50px] mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[160px]'>
          {/* Cột trái */}
          <div className='space-y-20'>
            <div>
              <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50'>
                <Image
                  src='/images/view-5.jpg'
                  alt='VPN design'
                  width={600}
                  height={400}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>
              <h3 className='mt-6 text-xl font-semibold text-[#0D0D0D]'>
                Cyber VPN Mobile App Design Concept
              </h3>
              <p className='text-gray-600 mt-2'>
                Built a VPN mobile app design with a touch of cyberpunk and sci-fi styles. Dark
                aesthetics reduce eye strain, while users enjoy fast internet connections.
              </p>
              <ul className='mt-3 list-disc list-inside text-gray-700 text-sm'>
                <li>5 main screens for mobile app</li>
                <li>Promotional landing page</li>
                <li>Presentation-ready animation</li>
                <li>Development-ready assets</li>
              </ul>
            </div>

            <div>
              <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50'>
                <Image
                  src='/images/view-2.jpg'
                  alt='Coin Prime UI'
                  width={600}
                  height={400}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>
              <h3 className='mt-6 text-xl font-semibold text-[#0D0D0D]'>
                Crypto Coin Trade Platform UI
              </h3>
              <p className='text-gray-600 mt-2'>
                UI concept for a modern crypto trading platform with simplified trading UX and
                dashboard analytics.
              </p>
              <ul className='mt-3 list-disc list-inside text-gray-700 text-sm'>
                <li>Clean dashboard UI</li>
                <li>Multiple user roles</li>
                <li>Real-time trading simulation</li>
                <li>Exportable trading reports</li>
              </ul>
            </div>
          </div>

          {/* Cột phải với offset */}

          <div className=' space-y-20 pt-[220px]'>
            <div>
              <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50'>
                <Image
                  src='/images/view-3.jpg'
                  alt='Crypto Exchange'
                  width={440}
                  height={440}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>
              <h3 className='mt-6 text-xl font-semibold text-[#0D0D0D]'>
                Cryptocurrency Exchange Website & Mobile App
              </h3>
              <p className='text-gray-600 mt-2'>
                Designed a cryptocurrency exchange mobile app and its promo landing page for
                improved marketing strategies.
              </p>
              <ul className='mt-3 list-disc list-inside text-gray-700 text-sm'>
                <li>5 main screens for mobile app</li>
                <li>Promotional landing page</li>
                <li>Presentation-ready animation</li>
                <li>Development-ready assets</li>
              </ul>
            </div>

            <div>
              <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50'>
                <Image
                  src='/images/view-3.jpg'
                  alt='Crypto Exchange'
                  width={440}
                  height={440}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>
              <h3 className='mt-6 text-xl font-semibold text-[#0D0D0D]'>
                Cryptocurrency Exchange Website & Mobile App
              </h3>
              <p className='text-gray-600 mt-2'>
                Designed a cryptocurrency exchange mobile app and its promo landing page for
                improved marketing strategies.
              </p>
              <ul className='mt-3 list-disc list-inside text-gray-700 text-sm'>
                <li>5 main screens for mobile app</li>
                <li>Promotional landing page</li>
                <li>Presentation-ready animation</li>
                <li>Development-ready assets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-content px-4 py-8 md:py-[50px] mx-auto'>
        <h2 className='text-center text-3xl md:text-[54px] text-[#6EC9FA] font-semibold mb-6 md:mb-10'>
          Our Story
        </h2>

        {storyData.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row'>
            <div className='border-2 border-green-500 p-1 w-full md:flex-1'>
              <div className='border-2 border-green-500 h-full flex flex-col items-center justify-center p-4 md:px-5'>
                <h3 className='text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-center'>
                  {item.title}
                </h3>
                <p className='text-sm md:text-base text-gray-600 text-center'>{item.description}</p>
              </div>
            </div>
            <div className='border-2 border-green-500 p-1 w-full md:flex-1 mt-2 md:mt-0'>
              <div className='p-2 border-2 border-green-500'>
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  width={300}
                  height={224}
                  className='object-cover w-full h-[200px] md:h-[224px]'
                  priority
                />
              </div>
            </div>
          </div>
        ))}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-20 px-5'>
          <div>
            <h3 className='text-2xl md:text-3xl font-semibold mb-6 text-center'>Experience</h3>
            <p className='text-gray-600 text-center leading-relaxed'>
              We boast over a decade of real estate photo editing proficiency, offering diverse
              services. These options include image enhancement, background removal, photo
              enhancement options such as changing daytime photos to sunset, virtual furniture
              incorporation, and clutter removal to optimize presentation standards and visual
              appeal.
            </p>
          </div>

          <div>
            <h3 className='text-2xl md:text-3xl font-semibold mb-6 text-center'>Clients</h3>
            <p className='text-gray-600 text-center leading-relaxed'>
              Our clients come from various parts of the world, including photographers, agents,
              brokers, and real estate investors. Many discerning customers have seamlessly
              integrated our services into their operations, regarding us as indispensable members
              of their teams. This testament underscores the trust and efficacy that we consistently
              deliver in our collaborative endeavors.
            </p>
          </div>

          <div>
            <h3 className='text-2xl md:text-3xl font-semibold mb-6 text-center'>Object</h3>
            <p className='text-gray-600 text-center leading-relaxed'>
              Our editing solutions are designed to meet the needs of residences and high-end
              properties seeking accelerated sales. We prioritize delivering photos with realistic
              and precise colors, which helps in capturing the attention of potential buyers and
              speeding up the sales process.
            </p>
          </div>

          <div>
            <h3 className='text-2xl md:text-3xl font-semibold mb-6 text-center'>Technique</h3>
            <p className='text-gray-600 text-center leading-relaxed'>
              By following our rigorous 21-step professional editing protocol, we always maintain
              our confidence in providing images of the highest quality. Even when presented with
              challenging conditions such as underexposure or backlighting, our skilled team
              effectively corrects imperfections like lens stains and camera lens curvature,
              ensuring flawless results with unwavering precision and attention to detail.
            </p>
          </div>
        </div>
      </div>
      <div className='bg-[#D4EFFF] py-16 md:py-20'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10'>
          <div className='text-center'>
            <h3 className='text-3xl sm:text-4xl lg:text-5xl text-[#6EC9FA] font-semibold mb-2'>
              10+
            </h3>
            <p className='text-sm sm:text-base text-gray-600'>Experience</p>
          </div>

          <div className='text-center'>
            <h3 className='text-3xl sm:text-4xl lg:text-5xl text-[#6EC9FA] font-semibold mb-2'>
              15
            </h3>
            <p className='text-sm sm:text-base text-gray-600'>Countries</p>
          </div>

          <div className='text-center'>
            <h3 className='text-3xl sm:text-4xl lg:text-5xl text-[#6EC9FA] font-semibold mb-2'>
              1,000+
            </h3>
            <p className='text-sm sm:text-base text-gray-600'>Clients</p>
          </div>

          <div className='text-center'>
            <h3 className='text-3xl sm:text-4xl lg:text-5xl text-[#6EC9FA] font-semibold mb-2'>
              4,500+
            </h3>
            <p className='text-sm sm:text-base text-gray-600'>Houses/Month</p>
          </div>

          <div className='text-center'>
            <h3 className='text-3xl sm:text-4xl lg:text-5xl text-[#6EC9FA] font-semibold mb-2'>
              5,000
            </h3>
            <p className='text-sm sm:text-base text-gray-600'>Est. Hours Saved</p>
          </div>

          <div className='text-center'>
            <h3 className='text-3xl sm:text-4xl lg:text-5xl text-[#6EC9FA] font-semibold mb-2'>
              2M+
            </h3>
            <p className='text-sm sm:text-base text-gray-600'>Photos</p>
          </div>
        </div>
      </div>
      <div className='py-16 md:py-20'>
        <div className='max-w-content mx-auto px-4'>
          <h2 className='text-center text-3xl md:text-[54px] text-gray-800 font-semibold mb-12 md:mb-16'>
            Mission and values
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-16'>
            <div>
              <h3 className='text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center'>
                1. Faith
              </h3>
              <p className='text-gray-600 text-center leading-relaxed'>
                We believe that we will be happy when we develop every day. Development should not
                just be for ourselves but should be for others: that is family, friends, colleagues,
                community and customers, only then can we live a valuable life.
              </p>
            </div>

            <div>
              <h3 className='text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center'>
                2. Mission
              </h3>
              <p className='text-gray-600 text-center leading-relaxed'>
                True Color strives to create an environment for each person to be proud of
                themselves and their work, and to bring sustainable value to customers and the work
                community.
              </p>
            </div>

            <div>
              <h3 className='text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center'>
                3. Business philosophy
              </h3>
              <p className='text-gray-600 text-center leading-relaxed'>
                What drives us to develop is the trust of customers and partners. As long as others
                believe in True Color's personality, True color will work as if it were for itself.
                Trust from customers helps True Color constantly change to move forward, learning
                every day from useful things to bring even higher value to customers.
              </p>
            </div>

            <div>
              <h3 className='text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center'>
                4. High quality standards
              </h3>
              <p className='text-gray-600 text-center leading-relaxed'>
                Quality is our biggest priority, True Color edited photos meet the highest
                standards, satisfying the most demanding customers, we have customers who have been
                working with us for more than 5 years.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Following />
      <Clients />
    </>
  )
}

export default AboutPage
