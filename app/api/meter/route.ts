import { prisma } from "@/lib/prisma";
import { TMeterData } from "@/services/types";
import { fetchMeterBalance } from "@/services/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: TMeterData = await request.json();
    const balance = await fetchMeterBalance(body.meterNo);

    const created = await prisma.meter.create({
      data: {
        name: body.name,
        meterNo: body.meterNo,
        threshold: body.threshold,
        balance: Number(balance) ?? 0,
        user: {
          connect: { id: body.user.id },
        },
      },
    });
    if (created)
      NextResponse.json({
        status: 201,
        data: created,
        message: "Meter created successfully",
      });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
