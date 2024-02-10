"use client";
import Form from "@/components/formulario";

function Modal({ modalOpen, ChangeModal, listaId, tareaActual }) {
  console.log(listaId, "esta en Modal");
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Please enter your task data</h3>

        <Form className="" ChangeModal={ChangeModal} ListaId={listaId} tareaActual={tareaActual}/>

        <div className="modal-action">
          <label
            htmlFor="my_modal_6"
            className="btn"
            onClick={() => ChangeModal(false)}
          >
            Close!
          </label>
        </div>
      </div>
    </div>
  );
}

export default Modal;
