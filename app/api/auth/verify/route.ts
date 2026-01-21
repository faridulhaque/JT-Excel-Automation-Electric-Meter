import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: Partial<TUser> = await request.json();

    const updated = await prisma.user.update({
      where: {
        email: body.email,
        code: body.code,
      },
      data: {
        isVerified: true,
      },
    });

    if (updated?.isVerified) {
      return NextResponse.json({
        status: 200,
        data: updated,
        message: "Successfully logged in",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Invalid code",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
