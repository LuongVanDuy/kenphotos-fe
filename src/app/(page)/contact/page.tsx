"use client";

import SectionTitle from "@/components/UI/SectionTitle";

const ContactPage = () => {
  return (
    <div className="max-w-content mx-auto px-4 pt-40 pb-8 md:pb-24">
      {/* <h1 className="text-[32px] md:text-[48px] leading-tight font-[500] mb-6 text-black">
        Get in touch
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-10">
        Before we start, we would like to better understand your needs. We'll
        review your application and schedule a free estimation call.
      </p> */}

      <div className="text-start mb-20 ">
        <SectionTitle
          title="Get in touch​"
          topText="Contact"
          bottomText={
            "Before we start, we would like to better understand your needs, \n Wereview your application and schedule a free estimation call "
          }
        />
      </div>

      <form className="space-y-8 max-w-xl">
        <div>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border-b bg-section  border-gray-300 focus:outline-none focus:border-black py-2 text-lg placeholder-gray-400"
          />
          {/* <p className="text-sm text-red-500 mt-1">Field is required</p> */}
        </div>

        <div>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border-b bg-section  border-gray-300 focus:outline-none focus:border-black py-2 text-lg placeholder-gray-400"
          />
          {/* <p className="text-sm text-red-500 mt-1">
            The email doesn’t look real
          </p> */}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Your phone number"
            className="w-full border-b bg-section  border-gray-300 focus:outline-none focus:border-black py-2 text-lg placeholder-gray-400"
          />
          {/* <p className="text-sm text-red-500 mt-1">Field is required</p> */}
        </div>

        <div>
          <input
            type="text"
            placeholder="Your city"
            className="w-full border-b bg-section  border-gray-300 focus:outline-none focus:border-black py-2 text-lg placeholder-gray-400"
          />
          {/* <p className="text-sm text-red-500 mt-1">Field is required</p> */}
        </div>

        <div>
          <input
            type="url"
            placeholder="Your website or link"
            className="w-full border-b bg-section  border-gray-300 focus:outline-none focus:border-black py-2 text-lg placeholder-gray-400"
          />
          {/* <p className="text-sm text-red-500 mt-1">Please enter a valid URL</p> */}
        </div>

        <div>
          <textarea
            rows={3}
            placeholder="Tell us about your project"
            className="w-full border-b bg-section  border-gray-300 focus:outline-none focus:border-black py-2 text-lg placeholder-gray-400 resize-none"
          />
          {/* <p className="text-sm text-red-500 mt-1">Field is required</p> */}
        </div>

        <div>
          <label className="block text-lg font-medium text-[#1C244B] mb-2">
            Upload file
          </label>
          <input
            type="file"
            className="w-full text-lg py-2 bg-section  text-gray-500 file:border-0 file:bg-gray-100 file:py-2 file:px-4 file:text-sm file:text-black hover:file:bg-gray-200 focus:outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="mt-6 rounded-full border border-black text-black px-10 py-3 text-lg hover:bg-black hover:text-white transition-all"
        >
          Send request
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
