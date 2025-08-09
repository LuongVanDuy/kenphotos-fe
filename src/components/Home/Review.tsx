"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../UI/SectionTitle";

const reviews = [
  {
    name: "Brayden Smith",
    text: `Their system was easy to navigate and the photos came back looking really good! I decided to take the plunge and sign up with Phixer. Honestly, it was probably the best move I've ever made with my business and it has saved me a TON of time`,
  },
  {
    name: "Kirsten Robertson",
    text: "Never had a problem with Phixer. Guaranteed the best photo editors. 👏",
  },
  {
    name: "Trevor Sweaza",
    text: `I chose phixer to edit my real estate photos and the images I received back were absolutely wonderful. I chose the basic plus package, had 24 hour turnaround and they responded to my comments and questions in a timely manner. Highly recommend 👍`,
  },
  {
    name: "Janelle Stroup",
    text: `The Editing Team is incredibly talented and they always send me back excellent photos. The customer service is on top of anything you need. I always get a fast response to any questions I have. I would highly recommend Phixer to anyone that needs a fast turnaround and need very good photos!`,
  },
  {
    name: "Tonie Peckham",
    text: `Phixer is an incredible company of consummate professionals who are always timely and prompt with any requests sent their way. If I've ever had an issue, they are always super responsive and quick to rectify! I am always left feeling like they knew exactly what I needed! I appreciate their incredible service & look forward to years of collaboration! Thanks for all you do! -Cheers! REDFIN THANKS YOU!`,
  },
];

const ReviewCard = ({ item }: { item: (typeof reviews)[0] }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="flex-shrink-0 w-64 p-4 bg-white shadow-md rounded-xl mx-3"
  >
    <div className="flex mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-3 h-3 text-yellow-400"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          ></path>
        </svg>
      ))}
    </div>
    <p className="font-semibold text-gray-800 mb-1 text-sm">{item.name}</p>
    <p
      className="font-light tracking-wide text-gray-500 text-xs leading-relaxed overflow-hidden"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        textOverflow: "ellipsis",
      }}
    >
      {item.text}
    </p>
  </motion.div>
);

const ReviewRow = ({
  direction = "left",
  speed = "slow",
}: {
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast";
}) => {
  const getAnimationClass = () => {
    if (direction === "right") {
      return speed === "slow"
        ? "animate-scroll-right-slow"
        : speed === "medium"
        ? "animate-scroll-right-medium"
        : "animate-scroll-right-fast";
    } else {
      return speed === "slow"
        ? "animate-scroll-slow"
        : speed === "medium"
        ? "animate-scroll-medium"
        : "animate-scroll-fast";
    }
  };

  return (
    <div className="flex overflow-hidden py-4">
      <div className={`flex ${getAnimationClass()}`}>
        {/* First set of reviews */}
        {reviews.map((item, index) => (
          <ReviewCard key={`first-${index}`} item={item} />
        ))}
        {/* Duplicate set for seamless loop */}
        {reviews.map((item, index) => (
          <ReviewCard key={`second-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const Reviews: React.FC = () => {
  return (
    <section className="pt-12 pb-24  bg-section relative">
      <span className="notch-top-left" aria-hidden="true"></span>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-content px-5 text-center relative mt-8"
      >
        <SectionTitle
          title="What Our Clients Say"
          bottomText="Real testimonials from satisfied customers"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-8"
        >
          {/* First row - scrolls left */}
          <ReviewRow direction="left" speed="medium" />

          {/* Second row - scrolls right */}
          <ReviewRow direction="right" speed="slow" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Reviews;
