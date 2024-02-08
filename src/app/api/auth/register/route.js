import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  //try {

  //} catch (error) {
  //  return NextResponse.json(
  //    {
  //      message: error.message,
  //    },
  //    { status: 500 }
  //  );
  //}

  const data = await request.json();

  const userFound = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });
  console.log(userFound);

  if (userFound) {
    return NextResponse.json(
      { message: "email already exists" },
      { status: 400 }
    );
  }

  const usernameFound = await prisma.users.findUnique({
    where: {
      username: data.username,
    },
  });
  console.log(usernameFound);

  if (usernameFound) {
    return NextResponse.json(
      { message: "username already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.users.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });
  const { password: _, ...user } = newUser;

  return NextResponse.json(user);
}
