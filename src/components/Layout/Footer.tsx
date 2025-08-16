import {
  FacebookIcon,
  MailBulkIcon,
  SkypeIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/components/Icons";
import { RootState } from "@/store/store";
import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useSelector } from "react-redux";

const Footer: React.FC = () => {
  const settingData = useSelector((state: RootState) => state.settings.detail);

  return (
    <footer className="bg-[#151515] text-white py-10 md:py-[120px] mb-[30px] md:mb-0 relative">
      <div className=" max-w-content mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white">
              Leistungen
            </span>
            <ul className="space-y-3 text-[#ccc] text-[16px]">
              <li className="hover:text-white transition-colors cursor-pointer">
                Websites
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Webshops
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Barrierefreie Websites
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Webapplikationen
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                SEO
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <span className="text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white">
              Leistungen
            </span>
            <ul className="space-y-3 text-[#ccc] text-[16px]">
              <li className="hover:text-white transition-colors cursor-pointer">
                Websites
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Webshops
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Barrierefreie Websites
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Webapplikationen
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                SEO
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="text-[16px]  font-semibold capitalize leading-[1.2em] tracking-[0px] text-white">
              Leistungen
            </span>
            <ul className="space-y-3 text-[#ccc] text-[16px]">
              <li className="hover:text-white transition-colors cursor-pointer">
                Websites
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Webshops
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Barrierefreie Websites
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Webapplikationen
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                SEO
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-[24px]">
              <h6 className="text-start text-[16px]  font-semibold capitalize not-italic no-underline leading-[1.2em] tracking-[0px] text-[#fff]">
                Get In Touch
              </h6>
              <ul className="space-y-2 text-[16px] text-[#ccc]">
                {settingData?.contact && (
                  <>
                    {settingData.contact.email && (
                      <li className="cursor-pointer">
                        <span className="inline-flex items-center gap-2 group">
                          <MailBulkIcon
                            size={20}
                            className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Email:</span>
                          <Link
                            href={`mailto:${settingData.contact.email}`}
                            className="hover:text-[#00A1F8] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            passHref
                          >
                            {settingData.contact.email}
                          </Link>
                        </span>
                      </li>
                    )}

                    {settingData.contact.whatsapp && (
                      <li className="cursor-pointer">
                        <span className="inline-flex items-center gap-2 group">
                          <WhatsappIcon
                            size={20}
                            className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                            aria-hidden="true"
                          />
                          <span className="sr-only">WhatsApp:</span>
                          <Link
                            href={`https://wa.me/${settingData.contact.whatsapp.replace(
                              /\D/g,
                              ""
                            )}`}
                            className="hover:text-[#00A1F8] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            passHref
                          >
                            {settingData.contact.whatsapp}
                          </Link>
                        </span>
                      </li>
                    )}

                    {settingData.contact.skype && (
                      <li className="cursor-pointer">
                        <span className="inline-flex items-center gap-2 group">
                          <SkypeIcon
                            size={20}
                            className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Skype:</span>
                          <Link
                            href={settingData.contact.skype}
                            className="hover:text-[#00A1F8] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            passHref
                          >
                            {settingData.contact.skype}
                          </Link>
                        </span>
                      </li>
                    )}

                    {settingData.contact.telegram && (
                      <li className="cursor-pointer">
                        <span className="inline-flex items-center gap-2 group">
                          <TelegramIcon
                            size={20}
                            className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Telegram:</span>
                          <Link
                            href={`https://t.me/+${settingData.contact.telegram.replace(
                              /\D/g,
                              ""
                            )}`}
                            className="hover:text-[#00A1F8] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            passHref
                          >
                            {settingData.contact.telegram}
                          </Link>
                        </span>
                      </li>
                    )}

                    {settingData.contact.facebook && (
                      <li className="cursor-pointer">
                        <span className="inline-flex items-center gap-2 group">
                          <FacebookIcon
                            size={20}
                            className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Facebook Fanpage:</span>
                          <Link
                            href={`https://${settingData.contact.facebook}`}
                            className="hover:text-[#00A1F8] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            passHref
                          >
                            {settingData.contact.facebook}
                          </Link>
                        </span>
                      </li>
                    )}

                    {settingData.contact.address && (
                      <li className="cursor-pointer">
                        <address className="not-italic inline-flex items-center gap-2 group">
                          <HomeFilled
                            size={24}
                            className="inline-block align-middle group-hover:text-[#00A1F8] transition-colors cursor-pointer w-[20px] min-w-[20px]"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Address:</span>
                          <span>{settingData.contact.address}</span>
                        </address>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
