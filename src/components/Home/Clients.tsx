"use client";
import Image from "next/image";

const testimonials = [
  {
    name: "David",
    role: "Photographer",
    quote:
      "Out of more than 10 companies I sent test photos to, only one stood out for me – Truecolor. Their quality and attention to detail surpassed all the others. I highly recommend their services.",
    avatar: "/images/client-1.jpg",
  },
  {
    name: "Anna",
    role: "Business Owners",
    quote:
      "For over five years, Truecolor has been an invaluable partner in the growth and success of my business. When I first started, it was just me, but today, thanks to the exceptional services provided by Truecolor, my team has grown to include six skilled photographers.",
    avatar: "/images/client-2.jpg",
  },
  {
    name: "John",
    role: "Media Team Leader",
    quote:
      "Despite the numerous emails I receive daily offering photo editing services at cheaper prices, I know my exact requirements. I need to receive high-quality and professional results that cater to my specific needs. Therefore, I prefer to invest in a service that can guarantee satisfaction and reliability.",
    avatar: "/images/client-3.jpg",
  },
  {
    name: "Carl",
    role: "Broker",
    quote:
      "Their exceptional work and lightning-fast turnaround never fail to impress me! Without a doubt, I will keep using this fantastic service in the future.",
     avatar: "/images/client-4.jpg",
  },
];

const Clients: React.FC = () => {
  return (
    <section>
      <div className="max-w-content mx-auto px-4 py-[100px] text-center">
        <h2 className=" text-[25px] md:text-[45px] font-semibold normal-case not-italic no-underline leading-[1.2em] tracking-[0px] text-[#1C244B]">
         Our Clients Say
        </h2>
        <p className="mb-12">Our clients love us, here are a few of their quotes.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 text-left mt-[6%]">
          {testimonials.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              <div className="shrink-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={90}
                  height={990}
                  className="rounded-full object-cover w-[60px] h-[60px] md:w-[90px] md:h-[90px]"
                  priority
                />
              </div>
              <div>
                <p className="text-[#1C244B] text-base mb-4 leading-relaxed">{item.quote}</p>
                <div className="mt-2">
                  <span className="italic text-[16px]">{item.name}</span>
                  <br />
                  <span className="font-bold text-[17px] md:text-[24px] text-[#1C244B]">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
