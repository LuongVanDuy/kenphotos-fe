"use client";

import Image from "next/image";
import { AddressIcon, FacebookIcon, MailBulkIcon, SkypeIcon, TelegramIcon, WhatsappIcon } from "@/components/Icons";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C244B] text-white pt-[20px]">
      <div className="mx-auto p-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[395px] pt-[10px]">
          <div className="space-y-4 mx-auto text-center">
            <Link
              href="/"
              className="flex items-center"
              aria-label="True Colors Home"
            >
              <Image
                src="/images/logo.png"
                alt="True Colors - Professional Real Estate Photo Editing"
                width={185}
                height={49}
                className="w-[248px] h-[65px] object-contain mx-auto mb-[40px]"
                priority
              />
            </Link>
            <h3 className="text-[#00A1F8] text-[25px] md:text-[33px] font-[500]">
              True Color - True Value
            </h3>
            <p className="text-[15px]">
              We make the most amazing, lively architectural photos that real
              estate photographers could find​
            </p>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.8835607881297!2d105.82088127447899!3d20.957190690234427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad06a8a34d89%3A0xc094b993f3b273d6!2zMzItMzMgVFQwMiwgS2h1IMSRw7QgdGjhu4sgVMOieSBOYW0gTGluaCDEkMOgbSwgSG_DoG5nIE1haSwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1752998891267!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-[24px]">
              <h6 className="text-center text-[16px] md:text-[22px] font-semibold capitalize not-italic no-underline leading-[1.2em] tracking-[0px] text-[#00A1F8]">
                Get In Touch
              </h6>
              <h6 className="text-center text-[16px] md:text-[22px] font-semibold capitalize not-italic no-underline leading-[1.2em] tracking-[0px] text-[#00A1F8]">
                TRUE COLOR COMPANY LIMITED
              </h6>
              <ul className="space-y-2 text-[16px]">
                <li className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 group">
                    <MailBulkIcon
                      size={20}
                      className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Email:</span>
                    <Link
                      href="mailto:truecolorcso@gmail.com"
                      className="hover:text-[#00A1F8] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      {" "}
                      truecolorcso@gmail.com
                    </Link>
                  </span>
                </li>
                <li className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 group">
                    <WhatsappIcon
                      size={20}
                      className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="sr-only">WhatsApp:</span>
                    <Link
                      href="https://wa.me/84339871448"
                      className="hover:text-[#00A1F8] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      (+84) 339 871 448
                    </Link>
                  </span>
                </li>
                <li className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 group">
                   <SkypeIcon
                      size={20}
                      className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Skype:</span>
                    <Link
                      href="https://join.skype.com/invite/y68aYbgqRRAx"
                      className="hover:text-[#00A1F8] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      join.skype.com/invite/y68aYbgqRRAx
                    </Link>
                  </span>
                </li>
                <li className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 group">
                   <TelegramIcon
                      size={20}
                      className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Telegram:</span>
                    <Link
                      href="https://t.me/+84339871448"
                      className="hover:text-[#00A1F8] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      (+84) 339 871 448
                    </Link>
                  </span>
                </li>
                <li className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 group">
                  <FacebookIcon
                      size={20}
                      className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Facebook Fanpage:</span>
                    <Link
                      href="https://www.facebook.com/Truecoloredit"
                      className="hover:text-[#00A1F8] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      facebook.com/Truecoloredit
                    </Link>
                  </span>
                </li>
                <li className="cursor-pointer">
                  <address className="not-italic inline-flex items-center gap-2 group">
                  <AddressIcon
                      size={20}
                      className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Address:</span>
                      <Link
                      href="https://www.facebook.com/Truecoloredit"
                      className="hover:text-[#00A1F8] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      32-33 TT02, Tay Nam Linh Dam Urban Area, Hoang Liet Ward,
                    Hoang Mai District, Hanoi City, Viet Nam
                    </Link>
                   
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <nav aria-label="Footer Services" className="py-4 hidden md:block">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-8 text-[16px] text-white">
            <li>
              <Link
                href="/services/photo-editing/single-exposure"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Single Exposure
              </Link>
            </li>
            <li>
              <Link
                href="/services/photo-editing/hdr-bracket"
                className="hover:text-[#00A1F8] transition-colors"
              >
                HDR Bracket
              </Link>
            </li>
            <li>
              <Link
                href="/services/photo-editing/flambient"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Flambient
              </Link>
            </li>
            <li>
              <Link
                href="/services/photo-editing/day-to-twilight"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Day To Twilight or Dusk
              </Link>
            </li>
            <li>
              <Link
                href="/services/advanced/lawn-replacement"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Lawn Replacement
              </Link>
            </li>
            <li>
              <Link
                href="/services/photo-editing/water-in-pool"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Water in Pool
              </Link>
            </li>
            <li>
              <Link
                href="/services/3d/changing-seasons"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Changing Seasons
              </Link>
            </li>
            <li>
              <Link
                href="/services/3d/virtual-staging"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Virtual Staging
              </Link>
            </li>
            <li>
              <Link
                href="/services/3d/virtual-renovations"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Virtual Renovations
              </Link>
            </li>
            <li>
              <Link
                href="/services/advanced/video-editing"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Real Estate Video Editing
              </Link>
            </li>
            <li>
              <Link
                href="/services/3d/360-image"
                className="hover:text-[#00A1F8] transition-colors"
              >
                360° Image Enhancement
              </Link>
            </li>
            <li>
              <Link
                href="/services/3d/360-virtual-staging"
                className="hover:text-[#00A1F8] transition-colors"
              >
                360° Virtual Staging
              </Link>
            </li>
            <li>
              <Link
                href="/services/advanced/item-removal"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Item Removal
              </Link>
            </li>
            <li>
              <Link
                href="/services/advanced/yacht"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Yacht
              </Link>
            </li>
            <li>
              <Link
                href="/services/advanced/aerial-drone"
                className="hover:text-[#00A1F8] transition-colors"
              >
                Aerial/ Drone Highlight
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center border-t md:border-none gap-4 p-[20px]  border-gray-700 mt-3 text-white">
        <div className="text-[15px] md:text-[22px] font-bold flex items-center gap-2 flex-1 text-center justify-center">
          ©Copyright 2015 By True Color. All rights reserved
        </div>
        <div className="gap-8 text-[21px] font-bold flex-1 text-center justify-center hidden md:flex">
          <Link
            href="/terms"
            className="hover:text-[#00A1F8] transition-colors"
          >
            TERMS & CONDITIONS
          </Link>
          <Link
            href="/privacy"
            className="hover:text-[#00A1F8] transition-colors"
          >
            PRIVACY POLICY
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
