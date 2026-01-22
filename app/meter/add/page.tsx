import AddForm from "@/components/meter/AddForm";
import Logout from "@/components/others/Logout";
import RequireAuth from "@/components/others/RequireAuth";
import React from "react";

function page() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
        <div className="h-20"></div>
        <Logout></Logout>
        
        <AddForm></AddForm>
      </div>
    </RequireAuth>
  );
}

export default page;
