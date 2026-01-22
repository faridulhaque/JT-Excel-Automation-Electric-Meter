"use client";

import { postData } from "@/services/apis/auth";
import { APIEndPoints } from "@/services/types";
import { Noto_Serif } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const code = e.target.code.value;

    if (!code) return toast.error("Code is required");

    try {
      const result = await postData(APIEndPoints.verify, { code });
      if (result.status === 200) {
        toast.success(result.message);
        localStorage.setItem("userId", result?.data?.id);
        localStorage.setItem("isUserVerified", result?.data?.isVerified);
        localStorage.setItem("userEmail", result?.data?.email);
        router.push("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {}
  };

  const handleResend = async () => {
    const email = searchParams.get("email");
    if (!email) return toast.error("Try logging or register again");
    const result = await postData<{ email: string }>(APIEndPoints.resend, {
      email: email as string,
    });

    if (result.status === 201) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full w-11/12 md:w-3/5 lg:w-1/2 border-[#3B82F6] border-2 rounded-md py-8 mx-auto">
      <h2
        className={`text-5xl md:text-6xl text-[#F8FAFC] text-center font-light tracking-wide ${notoSerif.className}`}
      >
        {searchParams.get("login") === "1"
          ? "You must verify your email before processing"
          : "Verify to continue"}
      </h2>
      <p className="pt-4 pb-8 text-center text-lg text-[#F8FAFC]">
        Enter the 4 digit code you have received in your email!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md space-y-5"
      >
        <div>
          <input
            type="text"
            name="code"
            placeholder="Enter your code"
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 outline-0 text-black"
          />
        </div>

        <button
          // disabled={loggingIn}
          type="submit"
          className="cursor-pointer w-full h-12 bg-[#3B82F6] text-white rounded-md text-lg font-medium hover:bg-[#2563EB] transition"
        >
          Verify
        </button>
      </form>
      <h2 className="text-center text-[#F5F7FA] text-base mt-6">
        <button
          type="button"
          onClick={handleResend}
          className="text-[#94A3B8] hover:underline cursor-pointer"
        >
          Resend code
        </button>
      </h2>
    </div>
  );
}

export default VerifyForm;
