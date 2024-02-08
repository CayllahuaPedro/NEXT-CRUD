"use client";

import { useRouter } from "next/navigation";

export default function ListCard({ lista, userId }) {
  const router = useRouter();
  return (
    <div className="container ">
      <div
        className="bf-slate-900 p-3 border hover:bg-slate-800
        hover:cursor-pointer"
        onClick={() => {
          router.push(`/listas/edit/${lista.id}`);
        }}
      >
        <h1 className="font-bold text-2xl mb-2">{lista.nombre}</h1>
      </div>

      {userId == lista.userId && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
          onClick={() => {
            router.push(`/listas/share/${lista.id}`);
          }}
        >
          Share
        </button>
      )}
    </div>
  );
}
