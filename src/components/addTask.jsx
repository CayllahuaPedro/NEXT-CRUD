"use client";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/modal";
function AddTask({listaId}) {
  const [modalOpen, setModalOpen] = useState(false);
  const ChangeModal = (bool) => {
    setModalOpen(bool);
  };
  console.log(listaId,"esta en Add Task")
  return (
    <div >
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full bg-blue-500 hover:bg-blue-700 text-white">
        Add new task
        <AiOutlinePlus className="ml-1" size={21} />
      </button>
    
      <Modal modalOpen={modalOpen} ChangeModal={ChangeModal} listaId={listaId}/>
    </div>
  );
}

export default AddTask;
