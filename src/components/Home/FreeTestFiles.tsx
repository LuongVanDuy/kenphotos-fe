'use client'

import Image from 'next/image'
import React from 'react'

const FreeTestFiles: React.FC = () => {
  const services = [
    { label: 'Service-1', value: 'service1' },
    { label: 'Service-2', value: 'service2' },
    { label: 'Service-3', value: 'service3' },
  ]
  return (
    <section className='bg-section py-24 relative' aria-labelledby='free-test-heading'>
      <div className='max-w-content mx-auto px-4'>
        {/* Main Heading */}
        <header className='text-center mb-12'>
          <h4 className='mb-0 text-[#000] font-manrope text-[20px] md:text-[44px] font-bold uppercase not-italic no-underline leading-[1.1em] tracking-[0px] [word-spacing:0px] [text-stroke-color:#000] [stroke:#000]'>
            NOW, PLEASE SEND ME SOME FREE TEST FILES HERE
          </h4>
          <p className='text-[#000] font-[400] text-[15px] md:text-[22px] not-italic no-underline normal-case tracking-[0px] [word-spacing:0px] font-manrope'>
            A thousand words of advertising are not equal to one action. I am happy to edit and
            enhance three photos for you for free. You do not need to register for an account
          </p>
        </header>

        <div className='grid md:grid-cols-2 gap-12 items-start'>
          {/* Left Section */}
          <div className='h-[100%]'></div>

          {/* Right Section  */}
          <div className=' p-2 py-4 md:p-8'>
            <form className='space-y-10 text-black' aria-label='Projektanfrage Formular'>
              {/* Ihre Kontaktdaten */}
              <div className='space-y-6'>
                <h2 className='text-2xl md:text-3xl font-bold'>Booking services</h2>

                <div className='space-y-4'>
                  <div>
                    <label htmlFor='name' className='block mb-1 text-sm font-medium'>
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    />
                  </div>

                  <div>
                    <label htmlFor='email' className='block mb-1 text-sm font-medium'>
                      EMail
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    />
                  </div>

                  <div>
                    <label htmlFor='company' className='block mb-1 text-sm font-medium'>
                      Phone Number
                    </label>
                    <input
                      type='number'
                      id='company'
                      name='company'
                      className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    />
                  </div>
                  <div>
                    <label htmlFor='company' className='block mb-1 text-sm font-medium'>
                      Your city
                    </label>
                    <input
                      type='number'
                      id='company'
                      name='company'
                      className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    />
                  </div>
                  <div>
                    <label htmlFor='description' className='block mb-1 text-sm font-medium'>
                      Description
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      rows={4}
                      required
                      className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
                      placeholder=''
                    />
                  </div>

                  <div>
                    <span className='block mb-2 text-sm font-medium'>Services</span>
                    <div className='space-y-3'>
                      {services.map((service) => (
                        <label
                          key={service.value}
                          className='flex items-center gap-3 border bg-white border-gray-300 px-4 py-3 rounded-md cursor-pointer hover:border-gray-500'
                        >
                          <input
                            type='radio'
                            name='service'
                            value={service.value}
                            className='accent-black'
                          />
                          <span>{service.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-900 transition'
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FreeTestFiles
