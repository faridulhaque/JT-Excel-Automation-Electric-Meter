import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

async function GET(request: Request) {
  try {
    const token = request.headers.get("token");
    if (!token)
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    const { id } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { id: string };
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return NextResponse.json({
        status: 200,
        message: "user info retrieved successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to get the user",
    });
  }
}
