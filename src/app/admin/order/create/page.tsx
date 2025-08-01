"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@/store/actions/services";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import OrderForm from "@/components/Admin/Order/OrderForm";
import { createOrder } from "@/store/actions/orders";

const CreateServicePage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { list: serviceList = [] } = useSelector((state: RootState) => state.services || {});

  const handleQuery = useCallback(() => {
    const queryParams: any = {
      status: 1,
      deleteFlg: 0,
      page: 1,
      itemsPerPage: 100,
    };

    dispatch(fetchServices(queryParams, session?.accessToken || "") as any);
  }, [dispatch, session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) {
      handleQuery();
    }
  }, [session?.accessToken, handleQuery]);

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

  const onSuccess = () => {
    message.success("Orrder created successfully!");
    router.push("/admin/order/list");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(error);
    setLoading(false);
  };

  const handleFinish = async (values: any) => {
    const payload = {
      ...values,
      items: values.items.map((item: any) => ({
        ...item,
        price: String(item.price),
      })),
    };

    setLoading(true);
    dispatch(createOrder(payload, session?.accessToken || "", onSuccess, onFailure) as any);
  };

  return <OrderForm form={form} onFinish={handleFinish} serviceOptions={serviceOptions} mode="create" loading={loading} />;
};

export default CreateServicePage;
