"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form({ListaId, tareaActual,ChangeModal }) {
  console.log(ListaId, "esta en Form")
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
    ChangeModal(false)
    router.refresh();
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-5 w-full" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-bold text-sm">
          Task title:
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
          Task description:
        </label>

        <textarea
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          rows="3"
          placeholder="escribe tu tarea"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        { tareaActual?  <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Update
        </button>: 
         <button
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         type="submit"
       >
          Create
       </button>
        }
      </form>
    </div>
  );
}


