import MeterList from "@/components/meter/MeterList";
import Logout from "@/components/others/Logout";
import RequireAuth from "@/components/others/RequireAuth";
import Image from "next/image";

export default function Home() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
        <div className="h-20"></div>
        <Logout></Logout>
        <MeterList></MeterList>
      </div>
    </RequireAuth>
  );
}
