"use client";

import MainTitle from "../Common/Title/MainTitle";
import {
  FacebookOutlined,
  HomeOutlined,
  MailOutlined,
  SendOutlined,
  SkypeOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { postNoToken } from "@/app/api";
import { useEffect, useRef, useState } from "react";
import { createContact } from "@/store/actions/orders";
import { message } from "antd";
import { AppDispatch } from "@/store/store";

const iconsMap: Record<string, JSX.Element> = {
  email: <MailOutlined style={{ fontSize: 18, color: "#2D6DFF" }} />,
  whatsapp: <WhatsAppOutlined style={{ fontSize: 18, color: "#25D366" }} />,
  skype: <SkypeOutlined style={{ fontSize: 18, color: "#00AFF0" }} />,
  telegram: <SendOutlined style={{ fontSize: 18, color: "#0088cc" }} />,
  facebook: <FacebookOutlined style={{ fontSize: 18, color: "#1877F2" }} />,
  address: <HomeOutlined style={{ fontSize: 18, color: "#2D6DFF" }} />,
};

const linkPrefix: Record<string, string> = {
  email: "mailto:",
  whatsapp: "https://wa.me/",
  skype: "",
  telegram: "https://t.me/+",
  facebook: "https://",
  address: "",
};

const contactOrder = [
  "email",
  "whatsapp",
  "skype",
  "telegram",
  "facebook",
  "address",
];

const ContactSection: React.FC = () => {
  const settingData = useSelector((state: RootState) => state.settings.detail);
  const dispatch = useDispatch<AppDispatch>();

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    note: "",
  });

  const handleCheckboxChange = async (
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e ? e.target.checked : true; // ✅ an toàn hơn
    setCaptchaChecked(checked);

    if (!checked) {
      setVerified(false);
      return;
    }

    setLoading(true);
    try {
      const token = await window.grecaptcha.execute(
        "6LfvyqYrAAAAACOms6yP9H3TowHoG082voRRc9sx",
        { action: "submit" }
      );

      const res = await postNoToken("captcha/verify", { token });
      if (res.verified) {
        setVerified(true);
        setCaptchaChecked(true);
        console.log("Captcha verified successfully");
      } else {
        setVerified(false);
        setCaptchaChecked(false);
        console.warn("Captcha verification failed");
      }
    } catch (err: any) {
      console.error("Captcha verification failed:", err);
      setVerified(false);
      setCaptchaChecked(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !verified && !loading) {
          handleCheckboxChange();
        }
      },
      { threshold: 0.5 } // khi Captcha hiển thị ≥50% trong màn hình
    );

    if (captchaRef.current) observer.observe(captchaRef.current);
    return () => observer.disconnect();
  }, [verified, loading]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSuccess = () => {
    message.success("Contact message sent successfully!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyAddress: "",
      note: "",
    });
    setVerified(false);
    setCaptchaChecked(false);
    setLoading(false);
  };

  const onFailure = (error: string) => {
    message.error(`Failed to send contact message: ${error}`);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify captcha first");
      return;
    }

    setLoading(true);
    dispatch(createContact(formData, onSuccess, onFailure) as any);
  };

  return (
    <section
      className="pb-10 pt-24  md:py-[120px] md:pt-[180px] bg-[rgba(220,237,248,0.6)]"
      aria-labelledby="free-test-heading"
    >
      <div className="max-w-content mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:pr-16">
            <MainTitle
              title={
                <>
                  Contact Our Team <br />
                  With{" "}
                  <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                    True Color
                  </span>
                </>
              }
              align="left"
            />
            <form
              onSubmit={handleSubmit}
              className="space-y-10 text-black mt-8"
              aria-label="Projektanfrage Formular"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-[48%]">
                    <label htmlFor="name" className="block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label htmlFor="email" className="block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email for order updates"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-[48%]">
                    <label htmlFor="phone" className="block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your contact number"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </div>

                  <div className="w-full md:w-[48%]">
                    <label htmlFor="city" className="block mb-1">
                      Property Address
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="Enter the property location "
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block mb-1">
                    Note
                  </label>
                  <textarea
                    id="description"
                    name="note"
                    rows={4}
                    required
                    value={formData.note}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    placeholder='Request or what you want. (We will send you the tested image within 24 hours, if you don&apos;t see our email in your main mailbox, you able check at "update" or "spam".)'
                  />
                </div>

                <div ref={captchaRef}>
                  <label className="block text-sm mb-2">
                    Captcha <span className="font-bold">(Required)</span>
                  </label>
                  <label className="flex items-center gap-3 border border-[#B1B1B1] rounded-md p-4 bg-white cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      name="captcha"
                      checked={captchaChecked}
                      onChange={handleCheckboxChange}
                      className="form-checkbox w-5 h-5 text-[#F7B500] border-[#B1B1B1] focus:ring-0 accent-[#F7B500]"
                    />
                    <span className="text-gray-900 font-medium">
                      {loading
                        ? "Verifying..."
                        : verified
                        ? "Verified"
                        : "Not verified"}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 inline-flex items-center justify-center bg-[#2D6DFF] min-w-[180px]  text-white rounded-full px-8 py-3 text-[18px] font-semibold hover:bg-gray-900 transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send →"}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-10 md:pl-12">
            <div className=" bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl shadow-sm">
              <p className="text-slate-800 dark:text-slate-100 text-[16px] leading-relaxed">
                <span className="block mb-2">
                  We’re here to assist you throughout the week.
                </span>
                <span className="block font-medium">
                  Monday – Saturday: <time>8:00 AM – 6:00 PM</time>
                </span>
                <span className="block font-medium">
                  Sunday: <time>Closed</time>
                </span>
                <span className="block mt-3">
                  Call us, email us, or send a message via the form below—our
                  team will respond promptly during business hours.
                </span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                {settingData?.contact &&
                  contactOrder.map((key) => {
                    const value = settingData.contact[key];
                    if (!value) return null;

                    const icon = iconsMap[key];
                    const prefix = linkPrefix[key] || "";
                    const href =
                      key === "whatsapp" || key === "telegram"
                        ? `${prefix}${value.replace(/\D/g, "")}`
                        : `${prefix}${value}`;

                    return (
                      <div
                        key={key}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        {icon}
                        {key === "address" ||
                        key === "telegram" ||
                        key === "skype" ? (
                          <span className="font-medium transition-colors duration-200 group-hover:text-current">
                            {value}
                          </span>
                        ) : (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium transition-colors duration-200 group-hover:text-current"
                          >
                            {value}
                          </a>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="w-full h-[250px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d476913.11073351983!2d105.823456!3d20.957186!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad06a8a34d89%3A0xc094b993f3b273d6!2zMzItMzMgVFQwMiwgS2h1IMSRw7QgdGjhu4sgVMOieSBOYW0gTGluaCDEkMOgbSwgSG_DoG5nIE1haSwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1754759562259!5m2!1svi!2sus"
                  width="100%"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
