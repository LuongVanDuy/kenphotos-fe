import { getImageUrl } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

export type Blog = {
  id: number
  title: string
  createdTime: string
  thumbnail: string
  slug: string
  categories: string[]
}

interface BlogCardProps {
  blog: Blog
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className='flex flex-col'>
      <Link href={`/blog/${blog.slug}`}>
        <div className='w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border shadow-md border-gray-100 relative'>
          <Image
            src={getImageUrl(blog.thumbnail)}
            alt={blog.title}
            fill
            className='object-cover transition-transform duration-300 hover:scale-105 rounded-xl'
            sizes='(max-width: 768px) 100vw, 50vw'
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
      <p className='text-sm text-gray-500 mt-1'>
        {new Date(blog.createdTime).toLocaleDateString('vi-VN')}
      </p>{' '}
    </div>
  )
}

export default BlogCard
