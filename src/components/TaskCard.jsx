"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import Modal from "@/components/modal";

function TaskCard({ task }) {
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const ChangeModal = (bool) => {
    setModalOpen(bool);
  };
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={`${checked ? "checked" : ""}`}
            onClick={() => setChecked(!checked)}
            className="checkbox checkbox-primary"
          />
        </td>
        <td className={`w-50 ${checked ? "line-through" : ""}`}>
          {task.title}
        </td>
        <td className="w-50">{task.description}</td>
        <td>
          {isClient && (
            <FiEdit
              className="text-blue-500 hover:scale-125"
              cursor="pointer"
              size={25}
              onClick={() => {
                ChangeModal(true);
              }}
            />
          )}
        </td>
        <td>
          {isClient && (
            <MdDeleteForever
              className="text-red-500"
              cursor="pointer"
              size={25}
            />
          )}
        </td>
      </tr>
      <Modal
        modalOpen={modalOpen}
        ChangeModal={ChangeModal}
        tareaActual={task}
      />
    </>
  );
}

export default TaskCard;
