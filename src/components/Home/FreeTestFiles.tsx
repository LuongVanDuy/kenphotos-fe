"use client";
import Image from "next/image";
import React from "react";

const FreeTestFiles: React.FC = () => {
  return (
    <section className="bg-[#D4EFFF] py-16" aria-labelledby="free-test-heading">
      <div className="max-w-content mx-auto px-4">
        {/* Main Heading */}
        <header className="text-center mb-12">
          <h4 className="mb-0 text-[#2DC5FF] font-manrope text-[20px] md:text-[44px] font-bold uppercase not-italic no-underline leading-[1.1em] tracking-[0px] [word-spacing:0px] [text-stroke-color:#000] [stroke:#000]">
            NOW, PLEASE SEND ME SOME FREE TEST FILES HERE
          </h4>
          <p className="text-[#2DC5FF] font-[400] text-[15px] md:text-[22px] not-italic no-underline normal-case tracking-[0px] [word-spacing:0px] font-manrope">
            A thousand words of advertising are not equal to one action. I am
            happy to edit and enhance three photos for you for free. You do not
            need to register for an account
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div className="flex justify-center items-center h-[100%]">
            <div className="relative w-[300px] h-[224px] shadow-file">
              <Image
                src="/images/free.png"
                alt=""
                width={300}
                height={224}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Right Section  */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form
              className="space-y-6"
              aria-label="Free photo editing test form"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-[2px] border-[#01CDFF] focus:outline-none focus:ring-2 focus:ring-[#00A1F8] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border-[2px] border-[#01CDFF] focus:outline-none focus:ring-2 focus:ring-[#00A1F8] focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border-[2px] border-[#01CDFF] focus:outline-none focus:ring-2 focus:ring-[#00A1F8] focus:border-transparent"
                    placeholder="Your number"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-4 py-3 border-[2px] border-[#01CDFF] focus:outline-none focus:ring-2 focus:ring-[#00A1F8] focus:border-transparent"
                    placeholder="Your city"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <input
                  type="url"
                  id="photoLink"
                  name="photoLink"
                  required
                  className="w-full px-4 py-3 border-[2px] border-[#01CDFF] focus:outline-none focus:ring-2 focus:ring-[#00A1F8] focus:border-transparent"
                  placeholder="Link to your photos(Dropbox, Google Drive, Wetransfer etc..."
                />
              </div>

              {/* Row 4 */}
              <div>
                <textarea
                  id="request"
                  name="request"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border-[2px] border-[#01CDFF] focus:outline-none focus:ring-2 focus:ring-[#00A1F8] focus:border-transparent resize-vertical"
                  placeholder="Request or what you want. (We will send you the tested image
                  within 24 hours, if you don't see our email in your main
                  mailbox, you able check at update  or spam)"
                />
              </div>

              {/* File Upload Section */}
              <div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="px-6 py-3 bg-[#00A1F8] text-white rounded-lg hover:bg-[#0088D4] transition-colors"
                  >
                    [Chọn tệp]
                  </button>
                  <span className="text-gray-500 text-sm">
                    Không có tập nào được chọn
                  </span>
                </div>
              </div>

              {/* Send Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-[45px] py-[10px] text-white hover:to-[#00A1F8] transition-all transform hover:scale-105 bg-[#2DC5FF] font-bold"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTestFiles;
