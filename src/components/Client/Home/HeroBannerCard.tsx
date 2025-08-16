import Link from "next/link";
import React from "react";
import { CompareSlider } from "../Common/CompareSlider";
import { getImageUrl } from "@/utils/imageUrl";

interface Service {
  slug: string;
  title: string;
  rating?: number;
  orderCount?: number;
  originalPrice?: number;
  discountedPrice?: number;
}

interface ServiceCardProps {
  service: Service;
  beforeImage: string;
  afterImage: string;
  swiperRef?: React.MutableRefObject<any>;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  beforeImage,
  afterImage,
  swiperRef,
}) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[300px] md:h-[500px] aspect-[2/3] rounded-xl overflow-hidden">
        <CompareSlider
          beforeImage={getImageUrl(beforeImage)}
          afterImage={getImageUrl(afterImage)}
          onDragStart={() => {
            if (swiperRef?.current) swiperRef.current.allowTouchMove = false;
          }}
          onDragEnd={() => {
            if (swiperRef?.current) swiperRef.current.allowTouchMove = true;
          }}
        />
      </div>

      <div className="my-6 flex items-center flex-col gap-3 md:flex-row justify-between">
        <Link
          href={`/services/${service.slug}`}
          className="text-decoration-none"
        >
          <h3 className="text-xl font-bold text-[#1C244B] cursor-pointer">
            {service.title}
          </h3>
        </Link>

        <div className="flex justify-between mt-auto">
          <div className="flex items-center gap-2">
            {service.rating !== undefined && (
              <div className="flex items-center">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-semibold ml-1">{service.rating}</span>
              </div>
            )}
            {service.orderCount !== undefined && (
              <span className="text-gray-500">({service.orderCount})</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-center">
            {service.originalPrice && service.discountedPrice ? (
              <>
                <span className="text-red-500 font-bold">
                  -
                  {Math.round(
                    ((service.originalPrice - service.discountedPrice) /
                      service.originalPrice) *
                      100
                  )}
                  %
                </span>
                <span className="text-gray-400 line-through">
                  ${service.originalPrice.toFixed(2)}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  ${service.discountedPrice.toFixed(2)}
                </span>
              </>
            ) : service.originalPrice ? (
              <span className="text-green-600 font-bold text-lg">
                ${service.originalPrice.toFixed(2)}
              </span>
            ) : (
              <span className="text-gray-400 font-bold">$0.00</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
