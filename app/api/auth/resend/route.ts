import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";
import { sendMail } from "@/services/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: Partial<TUser> = await request.json();

    const found = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });


    if (found) {
      const code = Math.floor(1000 + Math.random() * 9000);

      const ok = await sendMail(body?.email as string, String(code));
      if (ok) {
        const updated = await prisma.user.update({
          where: {
            email: body.email,
          },
          data: {
            code: String(code),
          },
        });
        return NextResponse.json({
          status: 201,
          data: updated,
          message: "An email has been sent with verification code",
        });
      }
    } else {
      return NextResponse.json({
        status: 400,
        message: "Invalid email",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
