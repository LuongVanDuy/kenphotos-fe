"use client";
import { motion } from "framer-motion";
import SectionTitle from "@/components/UI/SectionTitle";
import MainTitle from "@/components/Client/Common/Title/MainTitle";
import { FacebookOutlined, HomeOutlined, MailOutlined, PhoneOutlined, SendOutlined, SkypeOutlined, WhatsAppOutlined } from "@ant-design/icons";

const ContactPage = () => {
  return (
    <section className="py-10 md:py-[120px] md:pt-[180px] bg-[rgba(220,237,248,0.6)]" aria-labelledby="free-test-heading">
      <div className="max-w-content mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:pr-16"
          >
            <MainTitle
              title={
                <>
                  Contact Our Team <br />
                  With{" "}
                  <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                    True Color
                  </span>
                </>
              }
              align="left"
            />
            <form className="space-y-10 text-black mt-8" aria-label="Projektanfrage Formular">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                    className="w-full md:w-[48%]"
                  >
                    <label htmlFor="name" className="block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                    className="w-full md:w-[48%]"
                  >
                    <label htmlFor="email" className="block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email for order updates"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
                    className="w-full md:w-[48%]"
                  >
                    <label htmlFor="phone" className="block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      placeholder="Enter your contact number"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                    className="w-full md:w-[48%]"
                  >
                    <label htmlFor="city" className="block mb-1">
                      Property Address
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter the property location "
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
                >
                  <label htmlFor="description" className="block mb-1">
                    Note
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    placeholder='Request or what you want. (We will send you the tested image within 24 hours, if you don&apos;t see our email in your main mailbox, you able check at "update" or "spam".)'
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
                  className="mb-8"
                >
                  <label className="block text-sm  mb-2">
                    Captcha <span className="font-bold">(Pflichtfeld)</span>
                  </label>
                  <label className="flex items-center gap-3 border border-[#B1B1B1] rounded-md p-4 bg-white cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      name="captcha"
                      required
                      className="form-checkbox w-5 h-5 text-[#F7B500] border-[#B1B1B1] focus:ring-0 accent-[#F7B500]"
                    />
                    <span className="text-gray-900 font-medium">Verifiziert</span>
                  </label>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  className="mt-8 inline-flex items-center justify-center bg-[#2D6DFF] min-w-[180px]  text-white rounded-full px-8 py-3 text-[18px] font-semibold hover:bg-gray-900 transition-all mt-8"
                >
                  Send &nbsp; →
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10 md:pl-12"
          >
            <div className=" bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl shadow-sm">
              <p className="text-slate-800 dark:text-slate-100 text-[16px] leading-relaxed">
                <span className="block mb-2">We’re here to assist you throughout the week.</span>
                <span className="block font-medium">
                  Monday – Saturday: <time>8:00 AM – 6:00 PM</time>
                </span>
                <span className="block font-medium">
                  Sunday: <time>Closed</time>
                </span>
                <span className="block mt-3">
                  Call us, email us, or send a message via the form below—our team will respond promptly during business hours.
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <MailOutlined style={{ fontSize: 18, color: "#2D6DFF" }} />
                  <a href="mailto:truecolorcso@gmail.com" className="font-medium transition-colors duration-200 group-hover:text-[#2D6DFF]">
                    truecolorcso@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <WhatsAppOutlined style={{ fontSize: 18, color: "#25D366" }} />
                  <a
                    href="https://wa.me/84339871448"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium transition-colors duration-200 group-hover:text-[#25D366]"
                  >
                    (+84) 339 871 448
                  </a>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <SkypeOutlined style={{ fontSize: 18, color: "#00AFF0" }} />
                  <a
                    href="https://join.skype.com/invite/y68aYbgqRRAx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium transition-colors duration-200 group-hover:text-[#00AFF0]"
                  >
                    join.skype.com/invite/y68aYbgqRRAx
                  </a>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <SendOutlined style={{ fontSize: 18, color: "#0088cc" }} />
                  <span className="font-medium transition-colors duration-200 group-hover:text-[#0088cc]">(+84) 339 871 448</span>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <FacebookOutlined style={{ fontSize: 18, color: "#1877F2" }} />
                  <a
                    href="https://facebook.com/Truecoloredit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium transition-colors duration-200 group-hover:text-[#1877F2]"
                  >
                    facebook.com/Truecoloredit
                  </a>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <HomeOutlined style={{ fontSize: 18, color: "#2D6DFF" }} />
                  <span className="font-medium transition-colors duration-200 group-hover:text-[#2D6DFF]">
                    32-33 TT02, Tay Nam Linh Dam Urban Area, Hoang Liet Ward, Hoang Mai District, Hanoi City, Viet Nam
                  </span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="w-full h-[250px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d476913.11073351983!2d105.823456!3d20.957186!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad06a8a34d89%3A0xc094b993f3b273d6!2zMzItMzMgVFQwMiwgS2h1IMSRw7QgdGjhu4sgVMOieSBOYW0gTGluaCDEkMOgbSwgSG_DoG5nIE1haSwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1754759562259!5m2!1svi!2sus"
                  width="100%"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
