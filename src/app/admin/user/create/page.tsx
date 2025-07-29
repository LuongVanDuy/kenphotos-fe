"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createUser } from "@/store/actions/users";
import { Form, message } from "antd";
import UserForm from "@/components/Admin/User/UserForm";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/store/store";

const CreateUser: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSuccess = () => {
    message.success("User created successfully!");
    router.push("/admin/user/list");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(error);
    setLoading(false);
  };

  const handleFinish = async (values: any) => {
    dispatch(
      createUser(
        values,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  return (
    <UserForm
      form={form}
      onFinish={handleFinish}
      mode="create"
      loading={loading}
    />
  );
};

export default CreateUser;
