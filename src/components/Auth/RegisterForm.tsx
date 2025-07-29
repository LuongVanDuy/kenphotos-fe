"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customMessage } from "@/utils/messageHelper";
import { Button, Form, Input } from "antd";
import { postNoToken } from "@/app/api";
import authEndpoint from "@/store/endpoint/auth";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await postNoToken(authEndpoint.register(), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      if (res) {
        customMessage.success(
          "Registration successful! Please check your email to verify your account."
        );
        router.push("/auth/login");
      }
    } catch (error: any) {
      customMessage.error(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-2">
      <div className="flex w-full bg-white h-full flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-2/3 p-8 flex justify-center items-center h-full">
          <div className="flex flex-col justify-center w-full md:w-1/2 px-5">
            <h1 className="text-3xl font-semibold mb-2">Create Account</h1>
            <p className="mb-6 text-gray-500 text-sm md:text-base">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-link hover:underline">
                Login here.
              </Link>
            </p>
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
              requiredMark={false}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                  className="mb-2"
                >
                  <Input placeholder="First Name" autoComplete="given-name" />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                  className="mb-2"
                >
                  <Input placeholder="Last Name" autoComplete="family-name" />
                </Form.Item>
              </div>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
                className="mb-2"
              >
                <Input placeholder="Email" autoComplete="email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
                className="mb-2"
              >
                <Input.Password
                  placeholder="••••••"
                  autoComplete="new-password"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full !rounded-[32px]"
                loading={isLoading}
              >
                Create Account
              </Button>
            </Form>
          </div>
        </div>
        {/* Right: Brand */}
        <div className="hidden md:flex w-1/3 flex-col items-center justify-center bg-gray-100 p-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 tracking-tight">
              KenPhoto
            </div>
            <div className="text-gray-500 text-base md:text-lg">
              The secret to success for <br />
              real estate media <br />
              companies.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
