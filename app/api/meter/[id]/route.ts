import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const token = request.headers.get("authorization");
    if (!token)
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    const { id } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { id: string };

    const data = await prisma.meter.findFirst({
      where: { userId: id, id: params?.id },
    });
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
