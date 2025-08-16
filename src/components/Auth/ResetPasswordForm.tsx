"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { customMessage } from "@/utils/message";
import { Button, Form, Input } from "antd";
import { postNoToken } from "@/app/api";
import authEndpoint from "@/store/endpoint/auth";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      customMessage.error("Invalid reset link. Please request a new one.");
      router.push("/auth/forgot-password");
    }
  }, [searchParams, router]);

  const onFinish = async (values: { newPassword: string }) => {
    if (!token) {
      customMessage.error("Invalid reset token. Please request a new one.");
      router.push("/auth/forgot-password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await postNoToken(authEndpoint.resetPassword(), {
        token: token,
        newPassword: values.newPassword,
      });

      if (res) {
        setIsSuccess(true);
        customMessage.success("Password reset successful!");
      }
    } catch (error: any) {
      customMessage.error(
        error.message || "Password reset failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
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
                <h1 className="text-3xl font-semibold mb-2">Password Reset!</h1>
                <p className="text-gray-500 text-sm md:text-base mb-6">
                  Your password has been successfully reset. You can now login
                  with your new password.
                </p>
              </div>
              <Button
                type="primary"
                className="w-full !rounded-[32px]"
                onClick={() => router.push("/auth/login")}
              >
                Go to Login
              </Button>
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

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 px-2">
        <div className="flex w-full bg-white h-full flex-col md:flex-row">
          {/* Left: Loading/Error */}
          <div className="w-full md:w-2/3 p-8 flex justify-center items-center h-full">
            <div className="flex flex-col justify-center w-full md:w-1/2 px-5 text-center">
              <div className="mb-6">
                <h1 className="text-3xl font-semibold mb-2">Loading...</h1>
                <p className="text-gray-500 text-sm md:text-base">
                  Validating reset token...
                </p>
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
            <h1 className="text-3xl font-semibold mb-2">Reset Password</h1>
            <p className="mb-6 text-gray-500 text-sm md:text-base">
              Enter your new password below.
            </p>
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
              requiredMark={false}
            >
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter your new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
                className="mb-2"
              >
                <Input.Password
                  placeholder="••••••"
                  autoComplete="new-password"
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
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
                Reset Password
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

export default ResetPasswordForm;
