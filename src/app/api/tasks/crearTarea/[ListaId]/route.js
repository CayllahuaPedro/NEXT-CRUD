import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function POST(request,{params}) {
  const listaId= parseInt(params.ListaId);
  const { title, description } = await request.json();
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      listaId:listaId
    },
  });
  return NextResponse.json(newTask);
}
