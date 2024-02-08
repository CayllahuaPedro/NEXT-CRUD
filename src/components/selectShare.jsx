"use client";
import Select from "react-select";
import { useState } from "react";
const customStyles = {
  control: (provided) => ({
    ...provided,
    margin: "auto", // centra horizontalmente
    backgroundColor: "#eee0cb",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "#eee0cb",
    color: "black",
  }),
};
export default function SelectShare({ listaId, users }) {
  const options = Array.isArray(users)
    ? users.map((user) => ({
        value: user.id,
        label: user.username,
      }))
    : [];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    // Aquí puedes enviar las opciones seleccionadas al backend
    if (selectedOptions.length > 0) {
      const optionsId = selectedOptions.map((option) => option.id);
      console.log(optionsId[0])
      for (let i = 0; i < optionsId; i++) {
        let userId = optionsId[i];
        const res= await fetch(`/api/share/${listaId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, listaId }),
        })
        const data= await res.json()
        console.log(data)
      }
    }
  };

  return (
    <div className="mx-auto mt-4" style={{ width: "70%" }}>
      <form onSubmit={handleSubmit}>
        <Select
          key={listaId}
          isMulti
          options={options}
          styles={customStyles}
          value={selectedOptions}
          onChange={(selectedOptions) => {
            setSelectedOptions(selectedOptions);
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700
          mt-5 text-white font-bold py-2 px-4 rounded"
        >
          Share
        </button>
      </form>
    </div>
  );
}
