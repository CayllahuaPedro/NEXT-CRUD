import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET(request, { params }) {
  const lista = await prisma.listaTareas.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  //return NextResponse.json('obteniendo tarea' + params.id)
  console.log(task);
  return NextResponse.json(lista);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const listaUpdated= await prisma.listaTareas.update({
    where: {
      id: parseInt(params.id),
    },
    data:data,
  });

  return NextResponse.json(listaUpdated);
}

export async function DELETE(request, { params }) {
  try {
    const listaRemoved = await prisma.listaTareas.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    console.log(listaRemoved);
    return NextResponse.json(listaRemoved);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
