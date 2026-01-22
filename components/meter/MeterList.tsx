"use client";
import { useRouter } from "next/navigation";
import React from "react";

function MeterList() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-4 gap-10 py-10 w-11/12 mx-auto">
      <div
        onClick={() => router.push("/meter/add")}
        className="border-blue-400 border-2 rounded-md h-64 bg-dark-400 flex items-center justify-center cursor-pointer"
      >
        <button className="text-white w-20 h-20 bg-blue-400 rounded-full text-4xl cursor-pointer">
          +
        </button>
      </div>

      <div className="border-blue-400 border-2 rounded-md h-64 bg-dark-400"></div>
    </div>
  );
}

export default MeterList;
