import FormShare from "@/components/formularioShare";
import SelectShare from "@/components/selectShare";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Share({ params }) {
  const session = await getServerSession(authOptions);
  const userEmail = session.user.email;
  const userFound = await prisma.users.findUnique({
    where: {
      email: userEmail,
    },
  });
  const excludedUserIds = await prisma.relaciones.findMany({
    where: {
      listaId: parseInt(params.listaId), // params.id es el ID de la lista que pasas como parámetro
    },
    select: {
      userId: true,
    },
  });
  const users = await prisma.users.findMany({
    where: {
      AND: [
        {
          NOT: {
            id: userFound.id,
          },
        },
        {
          NOT: {
            id: {
              in: excludedUserIds.map((user) => user.userId),
            },
          },
        },
      ],
    },
    select: {
      username: true,
      id: true,
    },
  });
  return (
    <>
     
        <>
          <div className="container mx-auto">
            <FormShare listaId={params.listaId} users={users}></FormShare>
          </div>
          <div className="w-7/10 mx-auto"></div>
        </>
      
    </>
  );
}
