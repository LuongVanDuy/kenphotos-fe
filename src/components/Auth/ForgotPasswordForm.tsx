"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customMessage } from "@/utils/message";
import { Button, Form, Input } from "antd";
import { postNoToken } from "@/app/api";
import authEndpoint from "@/store/endpoint/auth";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string }) => {
    setIsLoading(true);
    try {
      const res = await postNoToken(authEndpoint.forgotPassword(), {
        email: values.email,
      });

      if (res) {
        setIsEmailSent(true);
        customMessage.success(
          "Password reset email sent! Please check your email."
        );
      }
    } catch (error: any) {
      customMessage.error(
        error.message || "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 px-2">
        <div className="flex w-full bg-white h-full flex-col md:flex-row">
          {/* Left: Success Message */}
          <div className="w-full md:w-2/3 p-8 flex justify-center items-center h-full">
            <div className="flex flex-col justify-center w-full md:w-1/2 px-5 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-semibold mb-2">Email Sent!</h1>
                <p className="text-gray-500 text-sm md:text-base mb-6">
                  We've sent a password reset link to your email address. Please
                  check your inbox and follow the instructions to reset your
                  password.
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  type="primary"
                  className="w-full !rounded-[32px]"
                  onClick={() => router.push("/auth/login")}
                >
                  Back to Login
                </Button>
                <Button
                  className="w-full !rounded-[32px]"
                  onClick={() => setIsEmailSent(false)}
                >
                  Send Another Email
                </Button>
              </div>
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
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-2">
      <div className="flex w-full bg-white h-full flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-2/3 p-8 flex justify-center items-center h-full">
          <div className="flex flex-col justify-center w-full md:w-1/2 px-5">
            <h1 className="text-3xl font-semibold mb-2">Forgot Password</h1>
            <p className="mb-6 text-gray-500 text-sm md:text-base">
              Remember your password?{" "}
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
              <Button
                type="primary"
                htmlType="submit"
                className="w-full !rounded-[32px]"
                loading={isLoading}
              >
                Send Reset Email
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

export default ForgotPasswordForm;
