import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";
import { sendMail } from "@/services/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: Partial<TUser> = await request.json();

    const find = await prisma.user.findUnique({
      where: { email: body.email as string },
    });

    if (find) {
      return NextResponse.json({
        status: 401,
        message: "Already registered. Try to login",
      });
    }
    const code = Math.floor(1000 + Math.random() * 9000);

    const ok = await sendMail(body?.email as string, String(code));

    if (!ok) {
      return NextResponse.json({
        status: 400,
        message: "Invalid email",
      });
    } else {
      const created = await prisma.user.create({
        data: {
          email: body.email as string,
          code: String(code),
          password: body.password as string,
          isVerified: false,
        },
      });
      if (created.id)
        return NextResponse.json({
          status: 201,
          data: created,
          message: "An email has been sent with verification code",
        });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
