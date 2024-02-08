import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function POST(request) {
  const { userId, listaId } = await request.json();
  const newRelacion = await prisma.relaciones.create({
    data: {
      listaId: parseInt(listaId),
      userId: parseInt(userId),
    },
  });
  return NextResponse.json(newRelacion);
}

