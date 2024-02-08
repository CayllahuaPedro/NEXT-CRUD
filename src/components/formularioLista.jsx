"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function FormLista({ listaActual }) {
    const router = useRouter();
    const [nombre, setNombre] = useState(listaActual?.nombre || "");
   
  
    const onSubmit = async (e) => {
      // actualizar si existe un una lista actual pasada por parametro
      e.preventDefault()
      if (listaActual) {
        const res = await fetch(`/api/listas/${listaActual.id}`, {
          method: "PUT",
          body: JSON.stringify({ nombre, }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        router.push(`/listas/edit/${listaActual.id}`);
        router.refresh();

      } else {
        const nombre = e.target.nombreLista.value
      
        const res = await fetch("/api/listas", {
          method: "POST",
          body: JSON.stringify({ nombre }),
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();

        router.push(`/listas/edit/${data.id}`)
        router.refresh()
        router.refresh()
        
      }
      
    }

    return (
      <div className="h-screen flex justify-center items-center">
        <form className="bg-slate-800 p-10 w-1/4" onSubmit={onSubmit}>
          <label htmlFor="title" className="font-bold text-sm">
            Nombre de la lista:
          </label>
          <input
            className="border border-gray-400 p-2 mb-4 w-full text-black"
            type="text"
            placeholder="Insertar un nombre para la lista"
            id="nombreLista"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
  
        
       
  
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {listaActual ? "Actualizar" : "Crear"}
          </button>
          {listaActual && (
            <button
              className="bg-red-500 hover:bg-red 700 text-white font-bold py-2 px-4 rounded ml-4"
              type="button"
              onClick={async () => {
                const res = await fetch(`/api/listas/${listaActual.id}`, {
                  method: "DELETE",
                });
                const data = await res.json;
                  router.push("/")
                  router.refresh();
              }}
            >
              Delete
            </button>
          )}
        </form>
      </div>
    );
  }
  
  
  
