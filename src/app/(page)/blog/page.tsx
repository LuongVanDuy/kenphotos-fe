import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import LayoutProvider from "@/components/Layout/Provider";

const BlogPage = () => {
  return (
    <LayoutProvider>
      <Navbar />
      <div className="min-h-[80vh] max-w-content py-[50px]">
        <h2 className="text-center text-[42px] uppercase">Blog</h2>
        <p className="text-center text-[18px] w-[60%] mx-auto">Kenphotos.com’s team and other experts offer their best advice, insights, and how-to’s. All to help you improve the presentation of your property marketing.</p>
      </div>
      <Footer />
    </LayoutProvider>
  );
};

export default BlogPage;
