"use client"
import{useRouter} from "next/navigation";
export default function NombreLista({lista}){
    const router= useRouter()
    return(
        <div className="grid grid-cols-3 gap-3 mt-10"
        onClick={() => {router.push(`/editarNombre/${lista.id}`)}}
        >
          <h1 className="font-bold text-3xl">{lista.nombre}</h1>
        </div>
    )
}