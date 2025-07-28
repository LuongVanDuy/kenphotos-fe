'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Blog = {
  id: number
  title: string
  date: string
  image: string
  slug: string
  categories: string[]
}

const blogs: Blog[] = [
  {
    id: 1,
    title: 'Best real estate video apps',
    date: 'Feb 26, 2025',
    image: '/images/blog-2.jpg',
    slug: 'best-real-estate-video-apps',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 2,
    title: 'Free furniture staging app',
    date: 'Feb 26, 2025',
    image: '/images/blog-1.jpg',
    slug: 'free-furniture-staging-app',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 3,
    title: 'Real Estate Photography Tips',
    date: 'Feb 26, 2025',
    image: '/images/blog-3.jpg',
    slug: 'real-estate-photography-tips',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 4,
    title: 'Mobile App UI/UX Design Trends 2025',
    date: 'Mar 12, 2025',
    image: '/images/blog-4.jpg',
    slug: 'mobile-app-ui-ux-trends-2025',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 5,
    title: 'Top Real Estate Marketing Strategies',
    date: 'Mar 25, 2025',
    image: '/images/blog-3.jpg',
    slug: 'top-real-estate-marketing-strategies',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 6,
    title: 'How to Take Better Interior Photos',
    date: 'Apr 5, 2025',
    image: '/images/blog-2.jpg',
    slug: 'how-to-take-better-interior-photos',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 7,
    title: 'Staging Techniques That Sell Homes',
    date: 'Apr 18, 2025',
    image: '/images/blog-1.jpg',
    slug: 'staging-techniques-that-sell',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 8,
    title: 'Video Tours vs. 3D Tours: What’s Better?',
    date: 'Apr 28, 2025',
    image: '/images/blog-2.jpg',
    slug: 'video-tours-vs-3d-tours',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 9,
    title: 'Lighting Tips for Real Estate Photography',
    date: 'May 3, 2025',
    image: '/images/blog-3.jpg',
    slug: 'lighting-tips-for-real-estate',
    categories: ['Video', 'Real Estate'],
  },
  {
    id: 10,
    title: 'Staging Techniques That Sell Homes',
    date: 'Apr 18, 2025',
    image: '/images/blog-4.jpg',
    slug: 'staging-techniques-that-sell-2',
    categories: ['Video', 'Real Estate'],
  },
]

const Skeleton = ({ span = 1 }: { span?: number }) => (
  <div
    className={`w-full h-[360px] xl:h-[440px] bg-gray-200 animate-pulse rounded-xl ${
      span === 2 ? 'lg:col-span-2' : ''
    }`}
  />
)

// const BlogCard = ({ blog }: { blog: Blog }) => (
//   <div className='flex flex-col'>
//     <Link href={`/blog/${blog.slug}`}>
//       <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50'>
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
//         />
//         <div className='absolute top-4 left-4 flex flex-wrap gap-2'>
//           {blog.categories.map((cat, index) => (
//             <span
//               key={index}
//               className='bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm'
//             >
//               {cat}
//             </span>
//           ))}
//         </div>
//       </div>
//     </Link>
//     <Link href={`/blog/${blog.slug}`}>
//       <h3 className='mt-3 text-xl font-semibold hover:text-[#00A3FF] cursor-pointer transition'>
//         {blog.title}
//       </h3>
//     </Link>
//     <p className='text-sm text-gray-500 mt-1'>{blog.date}</p>
//   </div>
// )

const BlogCard = ({ blog }: { blog: Blog }) => (
  <div className='flex flex-col'>
    <Link href={`/blog/${blog.slug}`}>
      <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50 relative'>
        <img
          src={blog.image}
          alt={blog.title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
        />
        <div className='absolute top-4 left-4 flex flex-wrap gap-2'>
          {blog.categories.map((cat, index) => (
            <span
              key={index}
              className='bg-[rgba(0,0,0,0.25)] text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm'
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>

    <Link href={`/blog/${blog.slug}`}>
      <h3 className='mt-3 text-xl font-semibold hover:text-[#00A3FF] cursor-pointer transition'>
        {blog.title}
      </h3>
    </Link>
    <p className='text-sm text-gray-500 mt-1'>{blog.date}</p>
  </div>
)

const BlogPage = () => {
  const [visibleCount, setVisibleCount] = useState(5)
  const [loadingNext, setLoadingNext] = useState(false)
  const blockRef = useRef<HTMLDivElement | null>(null)

  const currentVisible = blogs.slice(0, visibleCount)
  const totalBlocks = Math.ceil(visibleCount / 5)
  const loadingBlockIndex = totalBlocks - 1

  const scrollToBlock = () => {
    if (blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    if (loadingNext) {
      const timer = setTimeout(() => {
        setLoadingNext(false)
        scrollToBlock()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [loadingNext])

  const renderBlocks = () => {
    const blocks: JSX.Element[] = []

    for (let i = 0; i < currentVisible.length; i += 5) {
      const group = currentVisible.slice(i, i + 5)
      const blockIndex = Math.floor(i / 5)
      const isLoadingBlock = loadingNext && blockIndex === loadingBlockIndex

      const topBlock = (
        <div
          key={`top-${i}`}
          className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'
          ref={isLoadingBlock ? blockRef : null}
        >
          {isLoadingBlock ? (
            <>
              {blockIndex % 2 === 0 ? (
                <>
                  <Skeleton span={2} />
                  <Skeleton />
                </>
              ) : (
                <>
                  <Skeleton />
                  <Skeleton span={2} />
                </>
              )}
            </>
          ) : (
            <>
              {blockIndex % 2 === 0 ? (
                <>
                  <div className='lg:col-span-2'>
                    <BlogCard blog={group[0]} />
                  </div>
                  {group[1] && (
                    <div>
                      <BlogCard blog={group[1]} />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <BlogCard blog={group[0]} />
                  </div>
                  {group[1] && (
                    <div className='lg:col-span-2'>
                      <BlogCard blog={group[1]} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )

      const bottomBlock = (
        <div key={`bottom-${i}`} className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          {isLoadingBlock
            ? [0, 1, 2].map((idx) => <Skeleton key={idx} />)
            : group.slice(2).map((b) => <BlogCard key={b.id} blog={b} />)}
        </div>
      )

      blocks.push(topBlock, bottomBlock)
    }

    return blocks
  }

  return (
    <div className='max-w-content px-4 py-[50px] mx-auto'>
      <div className='text-start mb-20'>
        <p className='text-[24px] text-gray-400 font-medium mb-4'>Our blog</p>
        <h2 className='text-[32px] md:text-[48px] leading-tight font-[500] text-[#0D0D0D]'>
          This is where we tell stories.
          <br />
          Most of them are about design
        </h2>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between'>
        <div className='flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-500'>
          <button className='hover:text-black transition'>Recents</button>
          <button className='hover:text-black transition'>Design</button>
          <button className='hover:text-black transition'>Development</button>
          <button className='hover:text-black transition'>Management</button>
          <button className='hover:text-black transition'>Marketing</button>
        </div>

        <div className='w-full md:w-auto mb-12'>
          <div className='relative w-full md:w-[300px] mx-auto md:mx-0'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z'
                />
              </svg>
            </span>
            <input
              type='text'
              placeholder='Search...'
              className='w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]'
            />
          </div>
        </div>
      </div>

      {/* Render blog blocks */}
      {renderBlocks()}

      {/* Load More */}
      {visibleCount < blogs.length && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={() => {
              setLoadingNext(true)
              setVisibleCount((prev) => prev + 5)
            }}
            className='px-6 py-3 bg-[#00A3FF] text-white rounded hover:bg-[#0088cc] transition'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogPage
