"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createService } from "@/store/actions/services";
import ServiceForm from "@/components/Admin/Service/ServiceForm";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/store/store";

const CreateServicePage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSuccess = () => {
    message.success("Service created successfully!");
    router.push("/admin/service/list");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(error);
    setLoading(false);
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    const serviceData = {
      ...values,
      status: 1,
    };

    dispatch(
      createService(
        serviceData,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  const handleDraft = async (values: any) => {
    setLoading(true);
    const draftValues = {
      ...values,
      status: 0,
    };

    dispatch(
      createService(
        draftValues,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  return (
    <ServiceForm
      form={form}
      onFinish={handleFinish}
      onSaveDraft={handleDraft}
      mode="create"
      loading={loading}
    />
  );
};

export default CreateServicePage;
