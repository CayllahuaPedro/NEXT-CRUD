
import Form from "@/components/formulario"
import { prisma } from "@/libs/prisma";
export default async function Edit({ params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return(
    <Form tareaActual={task}/>
  )
}
