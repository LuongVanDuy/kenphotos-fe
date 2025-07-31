"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchService, updateService } from "@/store/actions/services";
import ServiceForm from "@/components/Admin/Service/ServiceForm";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";

const EditServicePage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const serviceId = Number(params.id);
  const router = useRouter();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const [loading, setLoading] = useState(false);

  // Get state from Redux store (sẽ tạo sau)
  const serviceDetail = useSelector(
    (state: RootState) => state.services?.detail
  );
  const serviceLoading = useSelector(
    (state: RootState) => state.services?.loading
  );
  const serviceError = useSelector((state: RootState) => state.services?.error);

  const loadData = () => {
    dispatch(fetchService(serviceId, session?.accessToken || "") as any);
  };

  useEffect(() => {
    if (session?.accessToken) {
      loadData();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (serviceDetail) {
      setFormField(serviceDetail);
    }
  }, [serviceDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        title: formField.title,
        content: formField.content,
        slug: formField.slug,
        status: formField.status,
        type: formField.type,
        originalPrice: formField.originalPrice,
        discountedPrice: formField.discountedPrice,
        rating: formField.rating,
        orderCount: formField.orderCount,
        images: formField.images,
        styles: formField.styles,
        steps: formField.steps,
        idealFors: formField.idealFors,
        includes: formField.includes,
        addOns: formField.addOns,
      });
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
      id: serviceId,
      data: {
        ...values,
        authorId: 1, // Default author ID
      },
    };

    dispatch(
      updateService(
        payload,
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
      status: 0, // Draft
      authorId: 1, // Default author ID
    };

    dispatch(
      updateService(
        draftValues,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  if (serviceLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service...</p>
        </div>
      </div>
    );
  }

  if (serviceError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Service not found</p>
          <button
            onClick={() => router.push("/admin/service/list")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <ServiceForm
      form={form}
      onFinish={handleFinish}
      onSaveDraft={handleDraft}
      mode="edit"
      loading={loading}
      initialValues={formField}
    />
  );
};

export default EditServicePage;
