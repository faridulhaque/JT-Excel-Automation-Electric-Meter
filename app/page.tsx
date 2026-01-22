import MeterList from "@/components/meter/MeterList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <MeterList></MeterList>
    </div>
  );
}
