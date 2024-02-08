import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  const userToShare = await prisma.users.findUnique({
    where: {
      username: params.usernameToShare,
    },
  });
  
  return NextResponse.json(userToShare);
}
