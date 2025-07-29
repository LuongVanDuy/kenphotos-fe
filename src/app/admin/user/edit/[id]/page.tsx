"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "@/store/actions/users";
import { Form, message } from "antd";
import UserForm from "@/components/Admin/User/UserForm";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";

const UpdateUser: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const [loading, setLoading] = useState(false);

  // Get state from Redux store
  const userDetail = useSelector((state: RootState) => state.users.detail);
  const userLoading = useSelector((state: RootState) => state.users.loading);
  const usesError = useSelector((state: RootState) => state.users.error);

  const loadData = () => {
    dispatch(fetchUser(userId, session?.accessToken || "") as any);
  };

  useEffect(() => {
    if (session?.accessToken) {
      loadData();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (userDetail) {
      setFormField(userDetail);
    }
  }, [userDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        firstName: formField.firstName,
        lastName: formField.lastName,
        email: formField.email,
        phoneNumber: formField.phoneNumber,
        businessName: formField.businessName,
        country: formField.country,
        timezone: formField.timezone,
        postalCode: formField.postalCode,
        businessWebsite: formField.businessWebsite,
      });
    }
  }, [formField]);

  const onSuccess = () => {
    message.success("User updated successfully!");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(error);
    setLoading(false);
  };

  const handleFinish = async (values: any) => {
    const payload = {
      id: userId,
      data: {
        ...values,
      },
    };
    dispatch(
      updateUser(
        payload,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user...</p>
        </div>
      </div>
    );
  }

  if (usesError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">User not found</p>
          <button
            onClick={() => router.push("/admin/user/list")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserForm
      form={form}
      onFinish={handleFinish}
      mode="edit"
      loading={loading}
    />
  );
};

export default UpdateUser;
