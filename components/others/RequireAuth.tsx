"use client";
import { getUser } from "@/services/apis/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        console.log("token", localStorage.getItem("token"));
        const result = await getUser();
        console.log("result", result);
        setLoading(false);
        if (!result?.data) return router.push("/auth/register");
        if (!result?.data?.isVerified) return router.push("/auth/verify");
      } catch (error) {}
    };
    run();
  }, [router]);

  if (loading)
    return <h2 className="text-center text-4xl text-blue-500">Loading...</h2>;

  return <div>{children}</div>;
}

export default RequireAuth;
