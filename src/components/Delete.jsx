"use client";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
function Delete({ tareaActual }) {
  const router = useRouter();
  const handleDelete = async () => {
    console.log("esta es la tarea actual",tareaActual);
    const res = await fetch(`/api/tasks/${tareaActual.id}`, {
      method: "DELETE",
    });
    const data = res.json;
    console.log(data);
    router.refresh();
  };
  return (
    <>
      <MdDeleteForever
        onClick={handleDelete}
        className="text-red-500 hover:scale-125"
        cursor="pointer"
        size={25}
      />
    </>
  );
}

export default Delete;
