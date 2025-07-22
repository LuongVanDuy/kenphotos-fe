import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import LayoutProvider from '@/components/Layout/Provider'

const blogs = [
  {
    id: 1,
    title: 'Best real estate video apps',
    author: 'Nhật Long',
    date: 'Tháng 2 26, 2025',
    image: '/images/view-1.jpg',
    description:
      'A Real estate video maker is an essential tool for realtors, property managers, and marketers who want to create engaging video content. With features like Property video editing, Virtual tour...',
    slug: 'best-real-estate-video-apps',
  },
  {
    id: 2,
    title: 'Free furniture staging app',
    author: 'Nhật Long',
    date: 'Tháng 2 26, 2025',
    image: '/images/view-1.jpg',
    description:
      'A Virtual staging app is a powerful tool that helps real estate professionals, interior designers, and homeowners transform property images with digital furniture and decor. By utilizing Home design software...',
    slug: 'free-furniture-staging-app',
  },
  {
    id: 3,
    title: 'Real Estate Photography Tips',
    author: 'Nhật Long',
    date: 'Tháng 2 26, 2025',
    image: '/images/resourse-2.jpg',
    description:
      'Professional real estate photography is crucial for marketing properties effectively. Learn expert tips for capturing stunning property photos that attract potential buyers...',
    slug: 'real-estate-photography-tips',
  },
  {
    id: 4,
    title: 'Virtual Tour Creation Guide',
    author: 'Nhật Long',
    date: 'Tháng 2 26, 2025',
    image: '/images/resourse-3.jpg',
    description:
      'Create immersive virtual tours that give potential buyers a realistic view of properties. This guide covers the best practices and tools for creating engaging virtual tours...',
    slug: 'virtual-tour-creation-guide',
  },
]

const BlogPage = () => {
  return (
    <LayoutProvider>
      <Navbar />
      <div className='max-w-content px-4 py-[50px] mx-auto'>
        <h2 className='text-center text-[42px] uppercase'>Blog</h2>
        <p className='text-center text-[14px] md:text-[18px] w-full  md:w-[60%] mx-auto'>
          Kenphotos.com’s team and other experts offer their best advice, insights, and how-to’s.
          All to help you improve the presentation of your property marketing.
        </p>

        <div className='w-full flex flex-col items-end md:flex-row justify-center md:justify-start gap-2 mb-10 mt-10'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full md:w-[300px] border border-black px-3 py-2 rounded text-base'
          />
          <button className='w-[30%] md:w-auto bg-[#00A3FF] text-white px-4 py-2 rounded text-base'>
            Apply filter
          </button>
        </div>

        {/* Blog grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {blogs.map((blog) => (
            <div key={blog.id} className='border rounded-lg overflow-hidden shadow-sm'>
              <img src={blog.image} alt={blog.title} className='w-full h-[300px] object-cover' />
              <div className='p-6'>
                <div className='flex items-center text-gray-600 text-sm mb-4'>
                  <span>{blog.author}</span>
                  <span className='mx-2'>•</span>
                  <span>{blog.date}</span>
                </div>
                <h3 className='text-xl font-semibold mb-3'>{blog.title}</h3>
                <p className='text-gray-600 mb-4'>{blog.description}</p>
                <button className='bg-[#00A3FF] text-white px-6 py-2 rounded'>READ MORE</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='flex flex-wrap items-center justify-center gap-1 md:gap-2 mt-12'>
          <button className='px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            Prev
          </button>

          <button className='px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            1
          </button>
          <button className='px-2 md:px-3 py-1 text-sm md:text-base text-[#00A3FF]'>2</button>
          <button className='px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            3
          </button>
          <button className='hidden md:block px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            4
          </button>
          <button className='hidden md:block px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            5
          </button>
          <button className='hidden md:block px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            6
          </button>

          <span className='px-2 text-[#1C1C1C]'>...</span>

          <button className='hidden md:block px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            16
          </button>
          <button className='hidden md:block px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            17
          </button>
          <button className='hidden md:block px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            18
          </button>
          <button className='px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            19
          </button>

          <button className='px-2 md:px-3 py-1 text-sm md:text-base text-[#1C1C1C] hover:text-[#00A3FF]'>
            Next
          </button>
        </div>
      </div>

      <Footer />
    </LayoutProvider>
  )
}

export default BlogPage
