'use client'

import FormService from '@/components/Common/FormService'
import MainTitle from '@/components/UI/Title/MainTitle'
import Image from 'next/image'

import { StarOutlined, AimOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons'
import Reviews from '@/components/Common/Review'

const data = [
  {
    title: 'Faith',
    icon: StarOutlined,
    content: `We believe happiness comes from daily growth. Growth should benefit not only ourselves but also family, friends, colleagues, community, and customers.`,
  },
  {
    title: 'Mission',
    icon: AimOutlined,
    content: `True Color creates a workplace where everyone feels proud of who they are and what they do, while delivering lasting value to customers and the community.`,
  },
  {
    title: 'Business philosophy',
    icon: TeamOutlined,
    content: `Our development is built on the trust of customers and partners. This trust drives us to improve, adapt, and learn each day to bring greater value to all.`,
  },
  {
    title: 'High quality standards',
    icon: TrophyOutlined,
    content: `Quality is our highest priority. True Color’s photos meet strict standards, pleasing even demanding clients, including those who have trusted us for years.`,
  },
]

const AboutPage = () => {
  return (
    <>
      <div className='min-h-[350px] bg-white pt-24'>
        <div className='max-w-content mx-auto'>
          <div className='flex flex-col md:flex-row gap-10'>
            <div className='px-4 md:px-0 py-16 text-white text-left'>
              <p className='text-[24px] text-gray-400 font-medium mb-4'>About us</p>
              <h1 className='text-[32px] md:text-[48px] leading-tight font-[500] mb-6 text-black'>
                We are True Color. A digital
                <br className='hidden md:block' />
                design and editing company
              </h1>
              <p className='max-w-3xl text-base md:text-lg  mb-12 text-black'>
                We help our clients build their brand identity, and design, develop, launch, and
                support their digital products. Working with startups and real estate businesses
                from all over the world.
              </p>

              <div className='grid grid-cols-3 gap-4 max-w-md'>
                <div className='text-left'>
                  <p className='text-3xl md:text-4xl font-semibold text-blue-500'>150+</p>
                  <p className='text-sm text-gray-400 mt-1'>team members</p>
                </div>
                <div className='text-left'>
                  <p className='text-3xl md:text-4xl font-semibold text-blue-500'>500+</p>
                  <p className='text-sm text-gray-400 mt-1'>completed projects</p>
                </div>
                <div className='text-left'>
                  <p className='text-3xl md:text-4xl font-semibold text-blue-500'>10</p>
                  <p className='text-sm text-gray-400 mt-1'>years in business</p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-1/2'>
              <div className='relative w-full h-full rounded-xl overflow-hidden'>
                <video className='w-full h-full object-cover' autoPlay muted loop playsInline>
                  <source src='/video-about.mp4' type='video/webm' />
                  <source src='/video.mp4' type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='relative py-10 px-5 md:px-0 md:pt-[70px] md:pb-[120px]'>
        <div className='max-w-content mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-[160px]'>
            <div className='block md:hidden'>
              <MainTitle
                title={
                  <>
                    Our{' '}
                    <span className='inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent'>
                      Story
                    </span>
                  </>
                }
                subTitle='Passionate About Perfecting Every Shot'
                content='From humble beginnings to a global clientele, True Color delivers vibrant, accurate, and market-ready images that make every property shine.'
                align='left'
              />
            </div>
            <div className='space-y-20'>
              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-5.jpg'
                    alt='VPN design'
                    width={600}
                    height={400}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  Get Started Today
                </h3>
                <p className='text-gray-600 mt-2'>
                  The way to get started is to quit talking and begin doing. At True Color, we
                  understand that in the dynamic world of real estate, captivating visuals are
                  paramount. We are a dedicated team committed to providing top-tier photo editing
                  and visualization services that elevate your property listings.
                </p>
              </div>

              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-5.jpg'
                    alt='VPN design'
                    width={600}
                    height={400}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  Passion for Perfection
                </h3>
                <p className='text-gray-600 mt-2'>
                  Founded with a love for real estate imagery, True Color delivers premium photo
                  editing solutions designed to make every property shine. Our detail-oriented team
                  transforms images with creativity and precision.
                </p>
              </div>

              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-5.jpg'
                    alt='VPN design'
                    width={600}
                    height={400}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  Professional Real Estate Editing
                </h3>
                <p className='text-gray-600 mt-2'>
                  Whether you're an agent, photographer, or developer, we help maximize the impact
                  of your property listings. Our expert editing showcases your properties in their
                  best light to attract more buyers.
                </p>
              </div>

              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-5.jpg'
                    alt='VPN design'
                    width={600}
                    height={400}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  High-Tech Excellence
                </h3>
                <p className='text-gray-600 mt-2'>
                  Using advanced software and proven techniques, our skilled team edits photos
                  quickly and with consistent quality at competitive prices, helping thousands of
                  clients boost their business.
                </p>
              </div>
            </div>
            <div className=' space-y-20 md:mt-[60px]'>
              <div className='hidden md:block'>
                <MainTitle
                  title={
                    <>
                      Our{' '}
                      <span className='inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent'>
                        Story
                      </span>
                    </>
                  }
                  subTitle='Passionate About Perfecting Every Shot'
                  content='From humble beginnings to a global clientele, True Color delivers vibrant, accurate, and market-ready images that make every property shine.'
                  align='left'
                />
              </div>
              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-3.jpg'
                    alt='Crypto Exchange'
                    width={440}
                    height={440}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  Over a Decade of Experience
                </h3>
                <p className='text-gray-600 mt-2'>
                  With 10+ years in real estate photo editing, we offer services from color
                  correction to virtual staging, day-to-dusk conversion, clutter removal, and more
                  to enhance property appeal.
                </p>
              </div>
              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-3.jpg'
                    alt='Crypto Exchange'
                    width={440}
                    height={440}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  Trusted by Global Clients
                </h3>
                <p className='text-gray-600 mt-2'>
                  We work with photographers, brokers, and investors worldwide. Many integrate our
                  services into their workflow, trusting us as an essential extension of their team.
                </p>
              </div>

              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-3.jpg'
                    alt='Crypto Exchange'
                    width={440}
                    height={440}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  Tailored for Faster Sales
                </h3>
                <p className='text-gray-600 mt-2'>
                  Our editing solutions focus on realistic, accurate colors and presentation to
                  capture buyer interest quickly, helping accelerate the sales process for homes and
                  luxury properties.
                </p>
              </div>

              <div>
                <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 mb-5'>
                  <Image
                    src='/images/view-3.jpg'
                    alt='Crypto Exchange'
                    width={440}
                    height={440}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                  Precision Editing Techniques
                </h3>
                <p className='text-gray-600 mt-2'>
                  Following a rigorous 21-step process, we ensure every image meets the highest
                  quality standards. From fixing underexposure to correcting lens flaws, we deliver
                  flawless results every time. Hỏi ChatGPT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='relative py-10 md:pt-[70px] md:pb-[120px] bg-[rgba(220,237,248,0.6)]'>
        <div className='max-w-content mx-auto px-4'>
          <MainTitle
            title={
              <>
                Our Mission & Values
                <br />
                <span className='inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent'>
                  Committed to Excellence in Pixels
                </span>
              </>
            }
            content='True Color has built a global reputation for delivering exceptional, on-time results. Clients praise our detail, clear communication, and ability to turn ordinary images into stunning, market-ready visuals.'
          />

          <ul className='md:flex mt-16'>
            {data.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index} className='md:flex-col flex-1 justify-between flex gap-10'>
                  <div className='md:flex-row flex flex-col items-center gap-[12px] md:gap-[10px]'>
                    <div className='h-3 w-3 md:mx-[4px]'>
                      <svg fill='none' height='24' viewBox='0 0 24 24' width='24'>
                        <rect
                          height='23'
                          rx='11.5'
                          stroke='#2D6DFF'
                          width='23'
                          x='0.5'
                          y='0.500488'
                        ></rect>
                        <circle cx='12' cy='12.0005' fill='#2D6DFF' r='6'></circle>
                      </svg>
                    </div>
                    {index !== data.length - 1 && (
                      <div className='md:h-[1px] md:w-full h-full w-[1px] ml-[10px] md:ml-0 md:mt-3 bg-[#2D6DFF]'></div>
                    )}
                  </div>

                  <div
                    className={`flex-1 p-6 rounded-xl ${
                      index !== data.length - 1 ? 'md:mr-[24px]' : ''
                    }`}
                    style={{
                      backdropFilter: 'blur(8px)',
                      backgroundColor: '#fffc',
                    }}
                  >
                    <div className='w-[50px] h-[50px] bg-[rgba(220,237,248,0.6)] flex items-center justify-center rounded-md mb-4'>
                      <Icon style={{ fontSize: 24, color: '#2D6DFF' }} />
                    </div>
                    <h3 className='text-[22px] leading-[30px] mb-4 font-semibold text-[#161817] md:text-[24px] md:leading-[24px]'>
                      {item.title}
                    </h3>
                    <p className='text-black text-[16px]'>{item.content}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <Reviews className='!bg-[#fff]' />
      <FormService />
    </>
  )
}

export default AboutPage
