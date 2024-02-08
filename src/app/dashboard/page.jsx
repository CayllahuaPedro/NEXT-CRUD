import { prisma } from "@/libs/prisma";
import ListCard from "@/components/ListCard";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function findUser() {
  const session = await getServerSession(authOptions);
  const userEmail = session.user.email;
  const userFound = await prisma.users.findUnique({
    where: {
      email: userEmail,
    },
  });
  return userFound;
}
async function loadSharedLists() {
  const userFound = await findUser();
  const relaciones = await prisma.relaciones.findMany({
    where: {
      userId: userFound.id,
    },
  });
  console.log(relaciones[0]);
  let sharedLists = [];

  for (let i = 0; i < relaciones.length; i++) {
    let lista = await prisma.listaTareas.findUnique({
      where: {
        id: relaciones[i].listaId,
      },
    });

    sharedLists.push(lista);
  }

  return sharedLists;
}

async function loadListas() {
  const userFound = await findUser();
  return await prisma.listaTareas.findMany({
    where: {
      userId: userFound.id,
    },
  });
}

async function HomePage() {
  const session = await getServerSession(authOptions);
  const userFound = await findUser();
  const listas = await loadListas();
  const sharedLists = await loadSharedLists();

  return (
    <>
      <section className="container mx-auto">
        {session.user && (
          <h1 className="font-bold text-4xl mt-5">
            Bienvenido, {session.user.name}!
          </h1>
        )}
        <h2 className="font-bold text-2xl mt-8">Listas de tareas:</h2>

        {userFound && (
          <>
            <div className="grid grid-cols-3 gap-3 mt-10">
              {listas.map((lista) => (
                <ListCard lista={lista} userId={userFound.id} key={lista.id}></ListCard>
              ))}
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-7 rounded">
              <Link href="/listas/new">Crear nueva lista</Link>
            </button>
          </>
        )}
      </section>
      {sharedLists && (
        <section className="container mx-auto">
          <h2 className="font-bold text-slate-200 text-4xl mt-4">
            Listas compartidas
          </h2>
          <div className="grid grid-cols-3 gap-3 mt-10">
            {sharedLists.map((lista) => (
              <ListCard
                lista={lista}
                userId={userFound.id}
                key={lista.id}
              ></ListCard>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;
