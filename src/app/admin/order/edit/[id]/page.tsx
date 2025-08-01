"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@/store/actions/services";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import OrderForm from "@/components/Admin/Order/OrderForm";
import { fetchOrder, updateOrder } from "@/store/actions/orders";

const EditServicePage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const orderId = Number(params.id);
  const router = useRouter();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const [loading, setLoading] = useState(false);

  // Get state from Redux store (sẽ tạo sau)
  const orderDetail = useSelector((state: RootState) => state.orders?.detail);
  const orderLoading = useSelector((state: RootState) => state.orders?.loading);
  const orderError = useSelector((state: RootState) => state.orders?.error);

  const { list: serviceList = [] } = useSelector((state: RootState) => state.services || {});

  const serviceOptions = serviceList.map((service: any) => {
    const hasDiscount = typeof service.discountedPrice === "number" && service.discountedPrice > 0;
    const price = hasDiscount
      ? service.discountedPrice
      : typeof service.originalPrice === "number" && service.originalPrice > 0
      ? service.originalPrice
      : 0;

    return {
      label: service.title,
      value: service.id,
      price,
    };
  });

  const loadData = () => {
    const queryParams: any = {
      status: 1,
      deleteFlg: 0,
      page: 1,
      itemsPerPage: 100,
    };

    dispatch(fetchServices(queryParams, session?.accessToken || "") as any);
    dispatch(fetchOrder(orderId, session?.accessToken || "") as any);
  };

  useEffect(() => {
    if (session?.accessToken) {
      loadData();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (orderDetail && serviceList?.length > 0) {
      setFormField(orderDetail);
    }
  }, [orderDetail, serviceList]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      setTimeout(() => {
        form.setFieldsValue({
          name: formField.name,
          email: formField.email,
          phone: formField.phone,
          address: formField.address,
          note: formField.note,
          inputFileUrl: formField.inputFileUrl,
          outputFileUrl: formField.outputFileUrl,
          status: formField.status,
          items: formField.items?.map((item: any) => ({
            ...item,
            price: Number(item.price),
          })),
        });
      }, 0);
    }
  }, [formField]);

  const onSuccess = () => {
    message.success("Service updated successfully!");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(error?.message || "Failed to update service");
    setLoading(false);
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    const payload = {
      id: orderId,
      data: {
        ...values,
        items: values.items.map((item: any) => ({
          ...item,
          price: String(item.price),
        })),
      },
    };

    dispatch(updateOrder(payload, session?.accessToken || "", onSuccess, onFailure) as any);
  };

  if (orderLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service...</p>
        </div>
      </div>
    );
  }

  if (orderError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Service not found</p>
          <button onClick={() => router.push("/admin/service/list")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return <OrderForm form={form} onFinish={handleFinish} serviceOptions={serviceOptions} mode="edit" loading={loading} />;
};

export default EditServicePage;
