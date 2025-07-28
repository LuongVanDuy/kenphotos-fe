'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Blog = {
  id: number
  title: string
  date: string
  image: string
  slug: string
}

const blogs: Blog[] = [
  {
    id: 1,
    title: 'Best real estate video apps',
    date: 'Feb 26, 2025',
    image: '/images/blog-2.jpg',
    slug: 'best-real-estate-video-apps',
  },
  {
    id: 2,
    title: 'Free furniture staging app',
    date: 'Feb 26, 2025',
    image: '/images/blog-1.jpg',
    slug: 'free-furniture-staging-app',
  },
  {
    id: 3,
    title: 'Real Estate Photography Tips',
    date: 'Feb 26, 2025',
    image: '/images/blog-3.jpg',
    slug: 'real-estate-photography-tips',
  },
  {
    id: 4,
    title: 'Mobile App UI/UX Design Trends 2025',
    date: 'Mar 12, 2025',
    image: '/images/blog-4.jpg',
    slug: 'mobile-app-ui-ux-trends-2025',
  },
  {
    id: 5,
    title: 'Top Real Estate Marketing Strategies',
    date: 'Mar 25, 2025',
    image: '/images/blog-3.jpg',
    slug: 'top-real-estate-marketing-strategies',
  },
  {
    id: 6,
    title: 'How to Take Better Interior Photos',
    date: 'Apr 5, 2025',
    image: '/images/blog-2.jpg',
    slug: 'how-to-take-better-interior-photos',
  },
  {
    id: 7,
    title: 'Staging Techniques That Sell Homes',
    date: 'Apr 18, 2025',
    image: '/images/blog-1.jpg',
    slug: 'staging-techniques-that-sell',
  },
  {
    id: 8,
    title: 'Video Tours vs. 3D Tours: What’s Better?',
    date: 'Apr 28, 2025',
    image: '/images/blog-2.jpg',
    slug: 'video-tours-vs-3d-tours',
  },
  {
    id: 9,
    title: 'Lighting Tips for Real Estate Photography',
    date: 'May 3, 2025',
    image: '/images/blog-3.jpg',
    slug: 'lighting-tips-for-real-estate',
  },
  {
    id: 10,
    title: 'Staging Techniques That Sell Homes',
    date: 'Apr 18, 2025',
    image: '/images/blog-4.jpg',
    slug: 'staging-techniques-that-sell-2',
  },
]

const Skeleton = ({ span = 1 }: { span?: number }) => (
  <div
    className={`w-full h-[360px] xl:h-[440px] bg-gray-200 animate-pulse rounded-xl ${
      span === 2 ? 'lg:col-span-2' : ''
    }`}
  />
)

const BlogCard = ({ blog }: { blog: Blog }) => (
  <div className='flex flex-col'>
    <Link href={`/blog/${blog.slug}`}>
      <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-50'>
        <img
          src={blog.image}
          alt={blog.title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
        />
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
      <h2 className='text-center text-[42px] uppercase'>Blog</h2>
      <p className='text-center text-[14px] md:text-[18px] w-full md:w-[60%] mx-auto mb-10'>
        Kenphotos.com’s team and other experts offer their best advice, insights, and how-to’s.
      </p>

      <div className='w-full flex flex-col md:flex-row items-end justify-center md:justify-start gap-2 mb-10'>
        <input
          type='text'
          placeholder='Search...'
          className='w-full md:w-[300px] border border-black px-3 py-2 rounded text-base'
        />
        <button className='w-[30%] md:w-auto bg-[#00A3FF] text-white px-4 py-2 rounded text-base'>
          Apply filter
        </button>
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
