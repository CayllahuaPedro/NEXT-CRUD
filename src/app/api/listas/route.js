import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const tasks = await prisma.listaTareas.findMany();
  return NextResponse.json(tasks);
}


export async function POST(request) {
  const session = await getServerSession(authOptions);
  const userEmail=session.user.email
  console.log(userEmail)
  const userFound= await prisma.users.findUnique({
    where:{
      email:userEmail,
    }
  })
  console.log(userFound)
  const { nombre} = await request.json();
  console.log(nombre, userFound.id)
  const newLista = await prisma.listaTareas.create({
    data: {
      nombre: nombre,
      userId: parseInt(userFound.id),
      
    }
  })
  console.log(newLista)
  return NextResponse.json(newLista);
}
