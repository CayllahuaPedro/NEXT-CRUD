import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  //return NextResponse.json('obteniendo tarea' + params.id)
  console.log(task);
  return NextResponse.json(task);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const taskUpdated = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });

  return NextResponse.json(taskUpdated);
}

export async function DELETE(request, { params }) {

    const taskRemoved = await prisma.task.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    const data = taskRemoved.json();
    console.log("se ha removida la tareaa", taskRemoved);
    return NextResponse.json(taskRemoved);

}
