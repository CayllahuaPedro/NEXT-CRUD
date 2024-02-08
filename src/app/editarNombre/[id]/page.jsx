import FormLista from "@/components/formularioLista";
import { prisma } from "@/libs/prisma";

export default async function Page({params}){
    const lista = await prisma.listaTareas.findUnique({
        where: {
          id: parseInt(params.id),
        },
      });
    return(
        <FormLista listaActual={lista}></FormLista>
    )
}