"use client";
import Image from "next/image";

const brands = [
  { name: "RE/MAX", src: "/images/trust-1.png" },
  { name: "ERA Real Estate", src: "/images/trust-2.png" },
  { name: "Keller Williams", src: "/images/trust-3.png" },
  { name: "CBRE", src: "/images/trust-4.png" },
  { name: "CENTURY 21", src: "/images/trust-5.png" },
  { name: "REALTOR MLS", src: "/images/trust-6.png" },
  { name: "Sotheby's International Realty", src: "/images/trust-7.png" },
  { name: "Coldwell Banker", src: "/images/trust-8.png" },
  { name: "Brookfield", src: "/images/trust-9.png" },
  { name: "Zillow", src: "/images/trust-10.png" },
  { name: "Compass", src: "/images/trust-11.png" },
  { name: "Engel & Völkers", src: "/images/trust-12.png" },
];

const TrustedBy: React.FC = () => {
  return (
    <section>
      <div className="max-w-content mx-auto px-4 py-12 flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Left */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          <h1 className="text-[40px] md:text-[50px] font-semibold text-[#1C244B] mb-6">
            Trusted By
          </h1>
          <blockquote className="text-[#00B9FF] text-lg md:text-xl font-medium max-w-md">
            "True Color is the only company in the market that guarantees 100% refund to customers if they are not satisfied"
          </blockquote>
        </div>
        {/* Right */}
        <div className="flex-1 w-full">
          <ul className="grid grid-cols-3  items-center justify-items-center">
            {brands.map((brand) => (
              <li key={brand.name} className="flex items-center justify-center">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={240}
                  height={65}
                  className="object-contain w-full h-[65px]"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
