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

export async function PUT(request: Request) {
  try {
    const body: TMeterData = await request.json();

    const updated = await prisma.meter.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        threshold: body.threshold,
      },
    });
    if (updated)
      NextResponse.json({
        status: 200,
        data: updated,
        message: "Meter updated successfully",
      });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await prisma.meter.findMany({ where: { id } });
    return NextResponse.json({
      status: 200,
      data: data,
      message: "Data fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await prisma.meter.delete({ where: { id } });
    
    return NextResponse.json({
      status: 200,
      data: data,
      message: "Data deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
