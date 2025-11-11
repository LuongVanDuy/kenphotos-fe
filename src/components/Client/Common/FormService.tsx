"use client";

import React, { useEffect, useRef, useState } from "react";
import MainTitle from "./Title/MainTitle";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchPublicServices } from "@/store/actions/services";
import { createPublicOrder, sendOrder } from "@/store/actions/orders";
import { useParams, useRouter } from "next/navigation";
import { postNoToken } from "@/app/api";
import { RootState } from "@/store/store";
import { message } from "antd";
import { AppDispatch } from "@/store/store";

const FormService = ({
  fetchPublicServices,
  serviceList,
  serviceLoading,
}: any) => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const slug = params?.slug;

  const [verified, setVerified] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    inputFileUrl: "",
    selectedServiceId: null as number | null,
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [loading, setLoading] = useState(false);
  const captchaRef = useRef<HTMLDivElement | null>(null);

  function handleQuery(page = 1, itemsPerPage = 20) {
    fetchPublicServices(
      {
        page,
        itemsPerPage,
        sortBy: "createdTime",
        sortDesc: true,
      },
      "formService"
    );

    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    handleQuery(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  const settingData = useSelector((state: RootState) => state.settings.detail);

  const isDetailPage = !!slug;

  const slugString = Array.isArray(slug) ? slug[0] : slug;

  const displayedServices =
    isDetailPage && !serviceLoading
      ? serviceList.filter(
          (service: any) =>
            service.slug.trim().toLowerCase() ===
            slugString?.trim().toLowerCase()
        )
      : serviceList;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      selectedServiceId: parseInt(e.target.value),
    }));
  };

  const onSuccess = (response?: any) => {
    if (response && response.id) {
      dispatch(
        sendOrder(
          response.id,
          () => {
            message.success("Order sent successfully!");
            setFormData({
              name: "",
              email: "",
              phone: "",
              address: "",
              note: "",
              inputFileUrl: "",
              selectedServiceId: null,
            });
            setVerified(false);
            setCaptchaChecked(false);
            setLoading(false);
          },
          (error) => {
            message.error(`Failed to send order: ${error}`);
            setLoading(false);
          }
        ) as any
      );
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        note: "",
        inputFileUrl: "",
        selectedServiceId: null,
      });
      setVerified(false);
      setCaptchaChecked(false);
      setLoading(false);
    }
  };

  const onFailure = (error: string) => {
    message.error(`Failed to create order: ${error}`);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify captcha first");
      return;
    }

    if (!formData.selectedServiceId) {
      alert("Please select a service");
      return;
    }

    const selectedService = displayedServices.find(
      (service: any) => service.id === formData.selectedServiceId
    );

    if (!selectedService) {
      alert("Selected service not found");
      return;
    }

    const price =
      selectedService?.discountedPrice || selectedService?.originalPrice || 0;

    const orderPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      inputFileUrl: formData.inputFileUrl,
      outputFileUrl: "",
      status: 0,
      items: [
        {
          serviceId: formData.selectedServiceId,
          quantity: 1,
          price: price.toString(),
        },
      ],
    };

    setLoading(true);
    dispatch(createPublicOrder(orderPayload, onSuccess, onFailure) as any);
  };

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

  return (
    <section
      className="py-10 md:py-[120px] bg-[rgba(220,237,248,0.6)]"
      data-form-service
    >
      <div className="max-w-content mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-10 md:pr-12 md:sticky md:top-24">
            <MainTitle
              title={
                <>
                  Start Your Project <br />
                  With{" "}
                  <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                    True Color
                  </span>
                </>
              }
              subTitle="Fast • Simple • Secure"
              content="Fill out the form below to send us your photos and requirements. Our team will review your request, recommend the best services, and get started right away—so you can receive stunning, market-ready visuals without delay."
              align="left"
            />

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0">
                <div className="flex flex-col gap-4">
                  {settingData?.contact?.whatsapp && (
                    <div className="flex items-center gap-4">
                      <PhoneOutlined
                        style={{ fontSize: 24, color: "#2D6DFF" }}
                      />
                      <a
                        href={`tel:${settingData.contact.whatsapp}`}
                        className="text-lg font-semibold"
                      >
                        {settingData.contact.whatsapp}
                      </a>
                    </div>
                  )}

                  {settingData?.contact?.email && (
                    <div className="flex items-center gap-4">
                      <MailOutlined
                        style={{ fontSize: 24, color: "#2D6DFF" }}
                      />
                      <a
                        href={`mailto:${settingData.contact.email}`}
                        className="text-lg font-semibold"
                      >
                        {settingData.contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-[350px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d476913.11073351983!2d105.823456!3d20.957186!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad06a8a34d89%3A0xc094b993f3b273d6!2zMzItMzMgVFQwMiwgS2h1IMSRw7QgdGjhu4sgVMOieSBOYW0gTGluaCDEkMOgbSwgSG_DoG5nIE1haSwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1754759562259!5m2!1svi!2sus"
                  width="100%"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="md:pl-16">
            <form
              onSubmit={handleSubmit}
              className="space-y-10 text-black"
              aria-label="Projektanfrage Formular"
            >
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Booking services
                </h2>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="w-full md:w-[48%]">
                      <label htmlFor="name" className="block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
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
                        value={formData.email}
                        onChange={handleInputChange}
                        required
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
                      <label htmlFor="address" className="block mb-1">
                        Property Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter the property location "
                        className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="inputFileUrl" className="block mb-1">
                      Link to Your Photos
                    </label>
                    <input
                      type="text"
                      id="inputFileUrl"
                      name="inputFileUrl"
                      value={formData.inputFileUrl}
                      onChange={handleInputChange}
                      placeholder="Paste the link to your photo files (Google Drive, Dropbox, etc.)"
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                    />
                  </div>

                  <div>
                    <label htmlFor="note" className="block mb-1">
                      Note
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full p-4 border border-[#B1B1B1] rounded-md focus:outline-none focus:ring-2 focus:#2D6DFF"
                      placeholder='Request or what you want. (We will send you the tested image within 24 hours, if you don&apos;t see our email in your main mailbox, you able check at "update" or "spam".)'
                    />
                  </div>

                  <div>
                    <span className="block mb-2">Services</span>
                    <div
                      className={`${
                        !isDetailPage ? "max-h-[200px] overflow-y-auto" : ""
                      } space-y-3`}
                    >
                      {displayedServices.map((service: any, index: any) => (
                        <label
                          key={service.id || index}
                          className="flex items-center gap-3 border bg-white border-[#B1B1B1] p-4 rounded-md cursor-pointer hover:border-gray-500"
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={formData.selectedServiceId === service.id}
                            onChange={handleServiceChange}
                            aria-label={`Select ${service.title} service`}
                            className="accent-black"
                          />
                          <span>{service.title}</span>
                        </label>
                      ))}
                    </div>
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
                    className="inline-flex items-center justify-center bg-[#2D6DFF] min-w-[180px] text-white rounded-full px-8 py-3 text-[18px] font-semibold hover:bg-gray-900 transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send →"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const key = ownProps.dataKey;
  const publicData = state.services.publicData[key] || {
    list: [],
    total: 0,
    loading: true,
    error: null,
  };

  return {
    serviceList: publicData.list,
    serviceTotal: publicData.total,
    serviceLoading: publicData.loading,
    serviceError: publicData.error,
  };
};

const mapDispatchToProps = {
  fetchPublicServices,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormService);
