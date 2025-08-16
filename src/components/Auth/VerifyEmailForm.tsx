"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { customMessage } from "@/utils/message";
import { Button, Form, Input } from "antd";
import { postNoToken } from "@/app/api";
import authEndpoint from "@/store/endpoint/auth";

const VerifyEmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [verifyToken, setVerifyToken] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setVerifyToken(tokenParam);
      // Auto-verify if both parameters are present
      handleAutoVerify(emailParam, tokenParam);
    }
  }, [searchParams]);

  const handleAutoVerify = async (email: string, token: string) => {
    setIsLoading(true);
    try {
      const res = await postNoToken(authEndpoint.verifyEmail(), {
        email: email,
        verifyToken: token,
      });

      if (res) {
        setIsSuccess(true);
        customMessage.success("Email verified successfully!");
      }
    } catch (error: any) {
      customMessage.error(
        error.message || "Email verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = async (values: { email: string; verifyToken: string }) => {
    setIsLoading(true);
    try {
      const res = await postNoToken(authEndpoint.verifyEmail(), {
        email: values.email,
        verifyToken: values.verifyToken,
      });

      if (res) {
        setIsSuccess(true);
        customMessage.success("Email verified successfully!");
      }
    } catch (error: any) {
      customMessage.error(
        error.message || "Email verification failed. Please try again."
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
                <h1 className="text-3xl font-semibold mb-2">Email Verified!</h1>
                <p className="text-gray-500 text-sm md:text-base mb-6">
                  Your email has been successfully verified. You can now login
                  to your account.
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

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-2">
      <div className="flex w-full bg-white h-full flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-2/3 p-8 flex justify-center items-center h-full">
          <div className="flex flex-col justify-center w-full md:w-1/2 px-5">
            <h1 className="text-3xl font-semibold mb-2">Verify Email</h1>
            <p className="mb-6 text-gray-500 text-sm md:text-base">
              Enter your email and verification token to verify your account.
            </p>
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
              requiredMark={false}
              initialValues={{
                email: email,
                verifyToken: verifyToken,
              }}
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
              <Form.Item
                label="Verification Token"
                name="verifyToken"
                rules={[
                  {
                    required: true,
                    message: "Please enter verification token",
                  },
                ]}
                className="mb-2"
              >
                <Input placeholder="Enter verification token" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full !rounded-[32px]"
                loading={isLoading}
              >
                Verify Email
              </Button>
            </Form>
            <div className="mt-4 text-center">
              <Link
                href="/auth/login"
                className="text-link text-sm hover:underline"
              >
                Back to Login
              </Link>
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
};

export default VerifyEmailForm;
