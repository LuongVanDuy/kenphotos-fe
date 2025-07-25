"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customMessage } from "@/utils/messageHelper";
import { CustomButton } from "@/components/Admin/UI/CustomButton";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {};

  const handleGoogleLogin = async () => {
    customMessage.info("Tính năng đăng nhập Google sẽ được cập nhật sớm!");
  };

  const handleFacebookLogin = async () => {
    customMessage.info("Tính năng đăng nhập Facebook sẽ được cập nhật sớm!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden ">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Login to KenPhoto</h1>
          <p className="mb-6 text-gray-500">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Create an account here.
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••"
                required
              />
            </div>
            <div className="flex justify-end mb-2">
              <Link href="/auth/forgot-password" className="text-blue-600 text-sm hover:underline">
                Forgot your password?
              </Link>
            </div>
            <CustomButton type="primary" isLoading={isLoading} htmlType="submit" className="w-full bg-black text-white py-2 rounded-lg font-semibold">
              Login
            </CustomButton>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t" />
              <span className="mx-2 text-gray-400">OR</span>
              <div className="flex-grow border-t" />
            </div>
            <CustomButton
              type="white"
              className="w-full bg-white border text-black flex items-center justify-center gap-2 mb-2"
              onClick={handleGoogleLogin}
            >
              {/* Có thể thêm icon Google ở đây nếu muốn */}
              Continue with Google
            </CustomButton>
            <CustomButton
              type="primary"
              className="w-full bg-blue-700 text-white flex items-center justify-center gap-2"
              onClick={handleFacebookLogin}
            >
              {/* Có thể thêm icon Facebook ở đây nếu muốn */}
              Continue with Facebook
            </CustomButton>
          </form>
        </div>
        {/* Right: Brand */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">KenPhoto</div>
            <div className="text-gray-500">
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

export default LoginForm;
