import RequireAuth from "@/components/others/RequireAuth";
import React from "react";

function page() {
  return (
    <RequireAuth>
      <div className="min-h-screen flex items-center justify-center">
      
      </div>
    </RequireAuth>
  );
}

export default page;
