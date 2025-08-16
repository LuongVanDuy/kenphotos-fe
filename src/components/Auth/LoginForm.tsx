"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customMessage } from "@/utils/message";
import { Button, Form, Input } from "antd";
import { signIn, getSession } from "next-auth/react";
import Image from "next/image";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.ok) {
        const session = await getSession();
        if (session?.user?.role === "ADMIN") {
          customMessage.success(
            "Login successful! Redirecting to admin dashboard..."
          );
          router.push("/admin");
        } else {
          customMessage.success("Login successful!");
          router.push("/");
        }
      } else {
        customMessage.error(
          res?.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      customMessage.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-2">
      <div className="flex w-full  bg-white h-full flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 flex justify-center items-center h-full">
          <div className="flex flex-col justify-center w-full md:w-2/3 px-5">
            <h1 className="text-3xl font-semibold mb-2">Login to KenPhoto</h1>
            <p className="mb-6 text-gray-500 text-sm md:text-base">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-link hover:underline">
                Create an account here.
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
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
                className="mb-2"
              >
                <Input.Password
                  placeholder="••••••"
                  autoComplete="current-password"
                />
              </Form.Item>
              <div className="flex justify-end mb-2">
                <Link
                  href="/auth/forgot-password"
                  className="!text-link text-sm  hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full !rounded-[32px]"
                loading={isLoading}
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
        {/* Right: Brand */}
        <div className="hidden  md:flex w-1/2 flex-col  justify-center bg-[#012fa6] p-8  bg-center">
          <div className="flex justify-center items-center">
            <Image
              src="/images/login-page.png"
              alt="Login Page"
              width={500}
              height={500}
            />
          </div>
          <div className="text-white text-start mt-10">
            <h1 className="text-4xl font-bold mb-2"> Welcome to KenPhoto</h1>
            <p className=" text-base md:text-[14px]">
              We cherish the trust and value each user places in us. With over
              10,000 new members joining our global community daily, we are
              dedicated to enhancing your digital life experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
