"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Form({ListaId, tareaActual }) {
  const router = useRouter();
  const [title, setTitle] = useState(tareaActual?.title || "");
  const [description, setDescription] = useState(
    tareaActual?.description || ""
  );

  const onSubmit = async (e) => {
    if (tareaActual) {
      const res = await fetch(`/api/tasks/${tareaActual.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
    } else {
      e.preventDefault();
      const title = e.target.title.value;
      const description = e.target.description.value;
      const res = await fetch(`/api/tasks/crearTarea/${ListaId}`, {
        method: "POST",
        body: JSON.stringify({ title, description}),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.JSON;
      console.log(data);
    }
    router.push(`/listas/edit/${ListaId}`);
    router.refresh();
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 w-1/4" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-bold text-sm">
          Titulo de la tarea:
        </label>
        <input
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          type="text"
          placeholder="titulo"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="description" className="font-bold text-sm">
          Descripcion de la tarea:
        </label>

        <textarea
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          rows="3"
          placeholder="escribe tu tarea"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          crear
        </button>
        {tareaActual && (
          <button
            className="bg-red-500 hover:bg-red 700 text-white font-bold py-2 px-4 rounded ml-4"
            type="button"
            onClick={async () => {
              const res = await fetch(`/api/tasks/${tareaActual.id}`, {
                method: "DELETE",
              });
              const data = await res.json;
              router.back();
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


