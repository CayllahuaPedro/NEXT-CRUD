/// aca se muestran las tareas propiamente dichas
import { RiUserShared2Fill } from "react-icons/ri";
import AddTask from "@/components/addTask";
import Edit from '@/components/editTask'
import Delete from '@/components/Delete'
import CheckList from '@/components/checklist'
import { prisma } from "@/libs/prisma";
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
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold flex flex-row justify-center">
          {lista.nombre} <RiUserShared2Fill className="ml-2"/>
        </h1>
        <AddTask listaId={parseInt(params.id)} />
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="w-1/10">Completed</th>
                <th>Task Name</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td><CheckList/></td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Edit task={task}/>
                    {/*
                    <FiEdit
                      className="text-blue-500 hover:scale-125"
                      cursor="pointer"
                      size={25}
                      onClick={() => {
                        ChangeModal(true);
                      }}
                    />*/}
                  </td>
                  <td><Delete tareaActual={task}/>
                    {/*
                    <MdDeleteForever
                      className="text-red-500"
                      cursor="pointer"
                      size={25}
                    />*/}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
