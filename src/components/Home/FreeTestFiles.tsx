"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../UI/SectionTitle";

const FreeTestFiles: React.FC = () => {
  const services = [
    { label: "Service-1", value: "service1" },
    { label: "Service-2", value: "service2" },
    { label: "Service-3", value: "service3" },
  ];
  return (
    <section
      className="bg-section pt-12 pb-24 md:pt-24 md:pb-40 relative"
      aria-labelledby="free-test-heading"
    >
      <div className="max-w-content mx-auto px-4">
        <span className="notch-top-left" aria-hidden="true"></span>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10 md:pr-12 md:sticky md:top-24"
          >
            <h2 className="text-2xl md:text-[43px] font-semibold text-black leading-normal">
              Let's shape your digital future together – Start now!
            </h2>
            <div>
              <p className="text-[19px] text-[#866E3D]">
                truecolorcso@gmail.com
              </p>
              <p className="text-[19px] text-[#866E3D]">(+84) 339 871 448</p>
            </div>
          </motion.div>

          {/* Right Section  */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="p-2 md:pl-16"
          >
            <form
              className="space-y-10 text-black"
              aria-label="Projektanfrage Formular"
            >
              {/* Ihre Kontaktdaten */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-bold">
                  Booking services
                </h2>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                  >
                    <label htmlFor="name" className="block mb-1 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  >
                    <label htmlFor="email" className="block mb-1 text-sm">
                      EMail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
                  >
                    <label htmlFor="company" className="block mb-1 text-sm">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="company"
                      name="company"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                  >
                    <label htmlFor="company" className="block mb-1 text-sm ">
                      Your city
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
                  >
                    <label htmlFor="description" className="block mb-1 text-sm">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder=""
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
                  >
                    <span className="block mb-2 text-sm ">Services</span>
                    <div className="space-y-3">
                      {services.map((service, index) => (
                        <motion.label
                          key={service.value}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 1.1 + index * 0.1,
                          }}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-3 border bg-white border-[#B1B1B1] p-4 rounded-md cursor-pointer hover:border-gray-500"
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service.value}
                            className="accent-black"
                          />
                          <span>{service.label}</span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                    className="text-gray-700 text-[15px] leading-relaxed"
                  >
                    Damit wir Ihr Projekt bestmöglich planen können, fragen wir
                    vorab nach Ihrem Budget. Unser erfahrenes Team weiß, welche
                    Ideen in welchem Kostenrahmen umsetzbar sind. So können wir
                    direkt prüfen, ob Ihre Vorstellungen realistisch umsetzbar
                    ist, und Ihnen im Erstgespräch bereits passende Alternativen
                    oder Optimierungen vorschlagen.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
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
                      <span className="text-gray-900 font-medium">
                        Verifiziert
                      </span>
                    </label>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="mt-6 inline-flex items-center justify-center bg-black text-white rounded-full px-8 py-3 text-[16px] font-semibold hover:bg-gray-900 transition-all"
                  >
                    Send &nbsp; →
                  </motion.button>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreeTestFiles;
