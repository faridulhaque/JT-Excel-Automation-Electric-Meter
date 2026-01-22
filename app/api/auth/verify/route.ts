import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: Partial<TUser> = await request.json();

    console.log("body", body);
    const found = await prisma.user.findFirst({
      where: {
        email: body.email,
        code: body.code,
      },
    });

    if (!found) {
      return NextResponse.json({
        status: 400,
        message: "Invalid code",
      });
    }

    const updated = await prisma.user.update({
      where: {
        id: found.id,
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json({
      status: 200,
      data: updated,
      message: "Successfully verified",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
