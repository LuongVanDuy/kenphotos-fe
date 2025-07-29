"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { createUser } from "@/store/actions/users";
import { Form, message } from "antd";
import UserForm from "@/components/Admin/User/UserForm";
import { useSession } from "next-auth/react";

const CreateUser: React.FC = (props: any) => {
  const { createUser, updateUser } = props;
  const { data: session } = useSession();
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
    createUser(values, session?.accessToken, onSuccess, onFailure);
  };

  return <UserForm form={form} onFinish={handleFinish} mode="create" loading={loading} />;
};

const mapDispatchToProps = {
  createUser: createUser,
};

export default connect(null, mapDispatchToProps)(CreateUser);
