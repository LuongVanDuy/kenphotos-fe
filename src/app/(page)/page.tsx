import AboutUs from '@/components/Home/AboutUs'
import Banner from '@/components/Home/Banner'
import Clients from '@/components/Home/Clients'
import Following from '@/components/Home/Following'
import PhotoEditingGuarantee from '@/components/Home/PhotoEditingGuarantee'
import Resources from '@/components/Home/Resources'
import Services from '@/components/Home/Services'
import TrustedBy from '@/components/Home/Trusted'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import WindowViewStyles from '@/components/Home/WindowViewStyles'
import Work from '@/components/Home/Work'

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChooseUs />
      <Services />
      <Following />
      <Resources />
      <WindowViewStyles />
      <TrustedBy />
      <AboutUs />
      <Clients />
      <Work />
      <PhotoEditingGuarantee />
    </>
  )
}
