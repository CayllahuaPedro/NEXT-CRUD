/// aca se muestran las tareas propiamente dichas
import TaskCard from "@/components/TaskCard";
import NombreLista from "@/components/nombreLista";
import { prisma } from "@/libs/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const userEmail = session.user.email;
  const userFound = await prisma.users.findUnique({
    where: {
      email: userEmail,
    },
  });

  const tasks = await prisma.task.findMany({
    where: {
      listaId: parseInt(params.id),
    },
  });
  
  const lista = await prisma.listaTareas.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <>
      <NombreLista lista={lista}></NombreLista>
      <section className="container mx-auto">
        <div className="grid grid-cols-3 gap-3 mt-10">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id}>
              {" "}
            </TaskCard>
          ))}
        </div>
      </section>
      {userFound.id == lista.userId && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href={`/tasks/new/${params.id}`}>Nueva Tarea</Link>
        </button>
      )}
    </>
  );
}
