import { fetchMeterBalance } from "@/services/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("api hit before authentiacation");
  //   if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  //   }
  try {
    const balance = await fetchMeterBalance("12343435");
    console.log("balance", balance);
  } catch (error) {
    console.log("error", error);
  }

  // console.log("CRON HIT", new Date().toISOString());

  return NextResponse.json({ ok: true });
}
