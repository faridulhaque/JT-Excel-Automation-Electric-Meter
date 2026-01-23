"use client";
import { deleteMeter, getMeters } from "@/services/apis/meter";
import { APIEndPoints, TMeterData } from "@/services/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../others/Loading";

function MeterList() {
  const [meters, setMeters] = useState<TMeterData[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const run = async () => {
    const data = await getMeters(APIEndPoints.meter);
    setLoading(false);
    setMeters(data.data);
  };

  useEffect(() => {
    run();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Are you sure?");
    if (ok) {
      const result = await deleteMeter(APIEndPoints.meter, id);
      if (result.status === 200) {
        toast.success(result.message);
        run();
        return;
      } else return toast.error(result?.message);
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-4 gap-10 py-10 w-11/12 mx-auto">
      <div
        onClick={() => router.push("/meter/add")}
        className="border-blue-400 border-2 rounded-md h-48 bg-dark-400 flex items-center justify-center cursor-pointer"
      >
        <button className="text-white w-20 h-20 bg-blue-400 rounded-full text-4xl cursor-pointer">
          +
        </button>
      </div>

      {meters?.length > 0 ? (
        <>
          {meters?.map((m: TMeterData) => (
            <div
              key={m.meterNo}
              className={`
            relative border-2  rounded-md h-48 bg-dark-400 p-4 flex flex-col justify-between
            ${m?.balance < m?.threshold ? "border-red-500" : "border-blue-400"}
            `}
            >
              <div className="flex justify-between items-start">
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                  <h3 className="text-md font-semibold text-white">
                    Balance: {m.balance}
                  </h3>
                  <p className="text-sm text-gray-300 mt-2">
                    Meter No: {m.meterNo}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-200">
                <p>
                  <span className="text-gray-400">Threshold:</span>{" "}
                  {m.threshold}
                </p>
              </div>

              <div className="flex gap-5 absolute right-3 bottom-3">
                <button
                  onClick={() => router.push(`/meter/${m?.id}`)}
                  className="cursor-pointer text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleDelete(m?.id)}
                  className="cursor-pointer text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-blue-500">
          No meters data found.
        </div>
      )}
    </div>
  );
}

export default MeterList;
