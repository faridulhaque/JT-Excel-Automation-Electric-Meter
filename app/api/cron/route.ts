import { fetchMeterBalance } from "@/services/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("api hit before authentiacation");
  //   if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  //   }
  // const balance = await fetchMeterBalance('32016975');

  // console.log("CRON HIT", new Date().toISOString());
  // console.log("balance", balance)

  return NextResponse.json({ ok: true });
}
