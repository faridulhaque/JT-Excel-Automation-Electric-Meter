"use client";

import { Noto_Serif } from "next/font/google";
import React, { useState } from "react";
import { toast } from "react-toastify";
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function VerifyForm() {

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-center h-full w-11/12 md:w-3/5 lg:w-1/2 border-[#3B82F6] border-2 rounded-md py-8">
      <h2
        className={`text-5xl md:text-6xl text-[#F8FAFC] text-center font-light tracking-wide ${notoSerif.className}`}
      >
        Verify Code
      </h2>
      <p className="pt-4 pb-8 text-center text-lg text-[#F8FAFC]">
        Enter the 4 digit code you have received in your email!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md space-y-5"
      >
        <div>
          <label className="block text-white text-sm mb-2">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
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
        <button className="text-[#94A3B8] hover:underline">Resend code</button>
      </h2>
    </div>
  );
}

export default VerifyForm;
