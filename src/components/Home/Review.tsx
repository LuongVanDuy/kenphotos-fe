'use client'
import React from 'react'

const reviews = [
  {
    name: 'Brayden Smith',
    text: `Their system was easy to navigate and the photos came back looking really good! I decided to take the plunge and sign up with Phixer. Honestly, it was probably the best move I've ever made with my business and it has saved me a TON of time`,
  },
  {
    name: 'Kirsten Robertson',
    text: 'Never had a problem with Phixer. Guaranteed the best photo editors. 👏',
  },
  {
    name: 'Trevor Sweaza',
    text: `I chose phixer to edit my real estate photos and the images I received back were absolutely wonderful. I chose the basic plus package, had 24 hour turnaround and they responded to my comments and questions in a timely manner. Highly recommend 👍`,
  },
  {
    name: 'Janelle Stroup',
    text: `The Editing Team is incredibly talented and they always send me back excellent photos. The customer service is on top of anything you need. I always get a fast response to any questions I have. I would highly recommend Phixer to anyone that needs a fast turnaround and need very good photos!`,
  },
  {
    name: 'Tonie Peckham',
    text: `Phixer is an incredible company of consummate professionals who are always timely and prompt with any requests sent their way. If I've ever had an issue, they are always super responsive and quick to rectify! I am always left feeling like they knew exactly what I needed! I appreciate their incredible service & look forward to years of collaboration! Thanks for all you do! -Cheers! REDFIN THANKS YOU!`,
  },
]

const ReviewColumn = ({ animationClass }: { animationClass: string }) => (
  <div className='relative flex flex-col'>
    <div className={`flex flex-col transform-gpu ${animationClass}`}>
      {[...reviews, ...reviews].map((item, index) => (
        <div key={`${item.name}-${index}`} className='p-10 mt-8 bg-white shadow-md rounded-2xl'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
            className='inline w-4 h-4 text-indigo-600'
          >
            <path
              fill-rule='evenodd'
              d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
            className='inline w-4 h-4 text-indigo-600'
          >
            <path
              fill-rule='evenodd'
              d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
            className='inline w-4 h-4 text-indigo-600'
          >
            <path
              fill-rule='evenodd'
              d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
            className='inline w-4 h-4 text-indigo-600'
          >
            <path
              fill-rule='evenodd'
              d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
            className='inline w-4 h-4 text-indigo-600'
          >
            <path
              fill-rule='evenodd'
              d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <p className='my-2 font-semibold text-gray-800'>{item.name}</p>
          <p className='font-light tracking-wide text-gray-500'>{item.text}</p>
        </div>
      ))}
    </div>
  </div>
)

const Reviews: React.FC = () => {
  return (
    <section className='py-8 md:py-16 bg-white'>
      <div className='text-center mx-auto'>
        <h2 className=' text-[25px] md:text-[45px] font-semibold normal-case not-italic no-underline leading-[1.2em] tracking-[0px] text-[#1C244B]'>
          Review
        </h2>
        <p className='mb-12'>Our clients love us, here are a few of their quotes.</p>
      </div>
      <div className='max-w-content mx-auto px-4 text-center h-[500px] overflow-hidden relative'>
        <div className='absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none'></div>
        <div className='absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none'></div>
        <div className='gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-8 lg:px-0 h-full overflow-hidden'>
          <ReviewColumn animationClass='animate-marqueeUp1' />
          <ReviewColumn animationClass='animate-marqueeUp2' />
          <ReviewColumn animationClass='animate-marqueeUp3' />
        </div>
      </div>

      {/* ================ */}
    </section>
  )
}

export default Reviews
