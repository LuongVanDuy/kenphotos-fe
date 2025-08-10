"use client";

import Image from "next/image";
import { AddressIcon, FacebookIcon, MailBulkIcon, SkypeIcon, TelegramIcon, WhatsappIcon } from "@/components/Icons";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#151515] text-white py-10 md:py-[120px] relative">
      <div className=" max-w-content mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white">Leistungen</span>
            <ul className="space-y-3 text-[#ccc] text-[16px]">
              <li className="hover:text-white transition-colors cursor-pointer">Websites</li>
              <li className="hover:text-white transition-colors cursor-pointer">Webshops</li>
              <li className="hover:text-white transition-colors cursor-pointer">Barrierefreie Websites</li>
              <li className="hover:text-white transition-colors cursor-pointer">Webapplikationen</li>
              <li className="hover:text-white transition-colors cursor-pointer">SEO</li>
            </ul>
          </div>
          <div className="space-y-4">
            <span className="text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white">Leistungen</span>
            <ul className="space-y-3 text-[#ccc] text-[16px]">
              <li className="hover:text-white transition-colors cursor-pointer">Websites</li>
              <li className="hover:text-white transition-colors cursor-pointer">Webshops</li>
              <li className="hover:text-white transition-colors cursor-pointer">Barrierefreie Websites</li>
              <li className="hover:text-white transition-colors cursor-pointer">Webapplikationen</li>
              <li className="hover:text-white transition-colors cursor-pointer">SEO</li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white">Leistungen</span>
            <ul className="space-y-3 text-[#ccc] text-[16px]">
              <li className="hover:text-white transition-colors cursor-pointer">Websites</li>
              <li className="hover:text-white transition-colors cursor-pointer">Webshops</li>
              <li className="hover:text-white transition-colors cursor-pointer">Barrierefreie Websites</li>
              <li className="hover:text-white transition-colors cursor-pointer">Webapplikationen</li>
              <li className="hover:text-white transition-colors cursor-pointer">SEO</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-[24px]">
              <h6 className="text-start text-[16px]  font-semibold capitalize not-italic no-underline leading-[1.2em] tracking-[0px] text-[#fff]">
                Get In Touch
              </h6>
              <ul className="space-y-2 text-[16px] text-[#ccc]">
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
                    <div className="w-5">
                      <AddressIcon
                        size={20}
                        className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="sr-only">Address:</span>
                    <Link
                      href="https://www.facebook.com/Truecoloredit"
                      className="hover:text-[#00A1F8] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      32-33 TT02, Tay Nam Linh Dam Urban Area, Hoang Liet Ward, Hoang Mai District, Hanoi City, Viet Nam
                    </Link>
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
