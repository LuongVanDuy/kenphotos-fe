"use client";

import React from "react";
import { motion } from "framer-motion";
import MainTitle from "./Title/MainTitle";

const reviews = [
  {
    name: "Michael Johnson",
    text: `True Color completely transformed my property photos. The colors were spot on, and the virtual staging made the space look amazing. My listing got more views in just a few days!`,
  },
  {
    name: "Sophie Williams",
    text: `I’ve tried a few editing services before, but True Color’s attention to detail is unmatched. They turned dull, cloudy shots into bright and inviting images that sold my property faster than expected.`,
  },
  {
    name: "Daniel Carter",
    text: `The 3D visualizations were incredible! My clients could clearly picture the renovation possibilities, and it helped close the deal much quicker.`,
  },
  {
    name: "Emily Thompson",
    text: `The team at True Color is fast, professional, and incredibly talented. The Day-to-Twilight edits gave my listing the wow factor it needed. Highly recommended!`,
  },
  {
    name: "James Miller",
    text: `I sent them a batch of poorly lit interior photos, and they returned flawless, magazine-worthy images. Their work definitely adds value to every project I take on.`,
  },
  {
    name: "Rachel Adams",
    text: `What I love most is the consistent quality. Whether it’s basic photo touch-ups or advanced item removal, True Color always delivers exactly what I envision.`,
  },
  {
    name: "David Anderson",
    text: `Their window view styles and lawn replacements are top-notch. My before-and-after photos are almost unbelievable – they make the properties look brand new.`,
  },
  {
    name: "Olivia Martinez",
    text: `I’ve used True Color for over a year now, and they’ve never missed a deadline. The service is reliable, the edits are beautiful, and the communication is always smooth.`,
  },
  {
    name: "Thomas Walker",
    text: `The virtual staging looked so realistic that buyers thought the furniture was actually there. This service is a game changer for my real estate marketing.`,
  },
  {
    name: "Isabella Lee",
    text: `Even my most challenging drone shots came back looking sharp, vibrant, and professionally enhanced. True Color is my go-to partner for all visual editing needs.`,
  },
];

interface ReviewsProps {
  className?: string;
}

const ReviewCard = ({ item }: { item: (typeof reviews)[0] }) => (
  <motion.div whileHover={{ scale: 1.05, y: -5 }} className="flex-shrink-0 w-80 p-4 bg-white shadow-md rounded-xl mx-3">
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
    <p className="font-semibold text-gray-800 mb-1 text-[18px]">{item.name}</p>
    <p
      className="font-light tracking-wide text-gray-500 leading-relaxed overflow-hidden"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        textOverflow: "ellipsis",
      }}
    >
      {item.text}
    </p>
  </motion.div>
);

const ReviewRow = ({ direction = "left", speed = "slow" }: { direction?: "left" | "right"; speed?: "slow" | "medium" | "fast" }) => {
  const getAnimationClass = () => {
    if (direction === "right") {
      return speed === "slow" ? "animate-scroll-right-slow" : speed === "medium" ? "animate-scroll-right-medium" : "animate-scroll-right-fast";
    } else {
      return speed === "slow" ? "animate-scroll-slow" : speed === "medium" ? "animate-scroll-medium" : "animate-scroll-fast";
    }
  };

  return (
    <div className="flex overflow-hidden py-4">
      <div className={`flex ${getAnimationClass()}`}>
        {reviews.map((item, index) => (
          <ReviewCard key={`first-${index}`} item={item} />
        ))}{" "}
        {reviews.map((item, index) => (
          <ReviewCard key={`second-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const Reviews: React.FC<ReviewsProps> = ({ className = "" }) => {
  return (
    <section className={`py-10 md:py-[120px] bg-[rgba(220,237,248,0.6)] relative ${className}`}>
      <div className="max-w-content mx-auto px-4">
        <MainTitle
          title={
            <>
              Trusted by Clients Worldwide <br />
              <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                Positive Feedback & Proven Results
              </span>
            </>
          }
          content="True Color has built a global reputation for delivering exceptional, on-time results. Clients praise our detail, clear communication, and ability to turn ordinary images into stunning, market-ready visuals."
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-12"
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
