"use client";
import { FiEdit } from "react-icons/fi";
import Modal from '@/components/modal'
import {useState } from "react";
function Edit({task}) {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  return (
    <>
      <FiEdit
        className="text-blue-500 hover:scale-125"
        cursor="pointer"
        size={25}
        onClick={() => {
          setModalEditOpen(true);
        }}
      />

      <Modal
        modalOpen={modalEditOpen}
        ChangeModal={setModalEditOpen}
        tareaActual={task}
      />
    </>
  );
}

export default Edit;
