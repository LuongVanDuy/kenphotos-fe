"use client";

import React from "react";
import { CompareSlider } from "../Common/CompareSlider";
import { getImageUrl } from "@/utils";
import { Card, Skeleton } from "antd";
import Link from "next/link";

interface ImagePair {
  beforeUrl?: string;
  afterUrl?: string;
}

interface ServiceCardProps {
  slug?: string;
  id?: string | number;
  index?: number;
  title?: string;
  content?: any;
  rating?: number;
  orderCount?: string;
  originalPrice?: number;
  discountedPrice?: number;
  images?: ImagePair[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, index, title, content, rating, orderCount, originalPrice, discountedPrice, images, slug }) => {
  const beforeImage = images?.[0]?.beforeUrl || "";
  const afterImage = images?.[0]?.afterUrl || "";

  return (
    <Card className="p-0 overflow-hidden rounded-[12px] !bg-gradient-to-b !bg-blue-50 flex flex-col h-full">
      <div className="relative h-80 card-image">
        <CompareSlider beforeImage={getImageUrl(beforeImage)} afterImage={getImageUrl(afterImage)} />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between text-start bg-blue-50">
        <Link href={`/services/${slug}`} className="text-decoration-none">
          <h3 className="text-[22px] leading-[30px] mb-4 font-bold text-[#161817] md:text-[24px] md:leading-[24px]">{title}</h3>
        </Link>

        <p className="text-[#444444] text-[16px] mb-4 flex-1 line-clamp-3 min-h-[76px]">{content.replace(/<[^>]+>/g, "")}</p>

        <div className="flex justify-between  mt-auto">
          <div className="flex items-center gap-2">
            {rating !== undefined && (
              <div className="flex items-center">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-semibold ml-1">{rating}</span>
              </div>
            )}
            {orderCount !== undefined && <span className="text-gray-500">({orderCount})</span>}
          </div>

          <div className="flex items-center gap-2 text-center">
            {originalPrice && discountedPrice ? (
              <>
                <span className="text-red-500 font-bold">-{Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%</span>
                <span className="text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                <span className="text-green-600 font-bold text-lg">${discountedPrice.toFixed(2)}</span>
              </>
            ) : originalPrice ? (
              <span className="text-green-600 font-bold text-lg">${originalPrice.toFixed(2)}</span>
            ) : (
              <span className="text-gray-400 font-bold">$0.00</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
