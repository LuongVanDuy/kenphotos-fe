"use client";
import { useScrollToForm } from "@/utils/scrollToForm";
import { motion } from "framer-motion";

const HeroBanner: React.FC = () => {
  const scrollToForm = useScrollToForm();

  return (
    <section className="w-full bg-section pt-[100px] md:pt-[180px]">
      <div className="max-w-content mx-auto px-4">
        <div className="flex flex-col md:flex-row w-full min-h-[580px] py-5 md:py-0 gap-5 md:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[100%] lg:w-[50%] flex-1 h-full"
          >
            <div className="text-center md:text-left">
              <p className="text-[22px] leading-[30px] text-center md:text-[24px] md:text-left">
                About Us
              </p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="p-0 my-5 text-[26px] leading-[32px] font-semibold max-w-full text-center md:text-left md:my-[35px] md:mb-[34px] md:text-[60px] md:leading-[66px]"
              >
                True Color Real Estate Visual Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="font-semibold bg-gradient-to-t from-[#184BF8] to-[#2C6BFF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent
                text-[16px] leading-[20px] mt-2 mb-0 text-center
                md:text-[20px] md:leading-[25px] md:mb-6 md:mt-0 md:text-left"
              >
                Premium Editing & Visualization Services
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-[18px] md:max-w-[90%]"
              >
                From precise color correction and realistic virtual staging to
                immersive 3D visualizations, True Color elevates ordinary
                property photos into powerful marketing assets. Our fast
                turnaround and meticulous attention to detail help you attract
                more buyers and close deals faster.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8"
              >
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="px-[30px] py-[15px] text-[16px] bg-[#2D6DFF] text-white rounded-full text-sm font-medium hover:opacity-90 transition-all"
                >
                  Send Free Test
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="flex items-center flex-col md:flex-row gap-2 mt-8 "
              >
                <div className="flex items-center  gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="flex items-center gap-1 text-gray-600">
                  <span>With 100+</span>
                  <span className="font-bold text-black">5-star</span>
                  <span>reviews on Google.</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-[100%] lg:w-[50%] flex-1 h-full"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/video-cdn-518f9.appspot.com/o/EARTH-web.mp4?alt=media&token=36f3207d-c171-4526-89c9-a950645dfe4c"
                  type="video/webm"
                />
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/video-cdn-518f9.appspot.com/o/EARTH-web.mp4?alt=media&token=36f3207d-c171-4526-89c9-a950645dfe4c"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
