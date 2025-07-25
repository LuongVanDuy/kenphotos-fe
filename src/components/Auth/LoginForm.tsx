"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customMessage } from "@/utils/messageHelper";
import { CustomButton } from "@/components/Admin/UI/CustomButton";
import { signIn, getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (res?.ok) {
        // Lấy lại session để lấy role
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
        <div className="w-full md:w-2/3 p-8 flex justify-center items-center h-full">
          <div className="flex flex-col justify-center w-full md:w-2/5 ">
            <h1 className="text-3xl font-bold mb-2">Login to KenPhoto</h1>
            <p className="mb-6 text-gray-500 text-sm md:text-base">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:underline"
              >
                Create an account here.
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="••••••"
                  required
                />
              </div>
              <div className="flex justify-end mb-2">
                <Link
                  href="/auth/forgot-password"
                  className="text-blue-600 text-xs hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <CustomButton
                type="dark"
                isLoading={isLoading}
                htmlType="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-semibold text-base "
              >
                Login
              </CustomButton>
            </form>
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

export default LoginForm;
