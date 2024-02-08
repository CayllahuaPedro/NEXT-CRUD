"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function FormShare({ listaId, users }) {
  const [usernameToShare, SetUsernameToShare] = useState(users.length >0 ? users[0].username : '');
  const router = useRouter();
 

  async function handleChange(e) {
    //console.log(e.target.value);
    SetUsernameToShare(e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault();
    console.log(usernameToShare);
    const res= await fetch(`/api/users/${usernameToShare}`)
    const data= await res.json()
    const userId= data.id
    const newRelation = await fetch(`/api/share/${listaId}`,{
        method: "POST",
        body: JSON.stringify({userId,listaId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    const dataRelation= await newRelation.json();
    console.log(dataRelation);
    router.push('/dashboard')
  }
  

  return (
    <div className="container mx-auto">
      <h1 className=" mt-5 mb-4 font-bold">
        Elegir usuario al cual compartir:
      </h1>
      <form onSubmit={onSubmit}>
        <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 text-black"
          placeholder="eliga usuario"
          value={usernameToShare}
          onChange={ (e) => SetUsernameToShare(e.target.value)}
        >
          {users.map((user) => (
            <option className="text-black" key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <div className="mt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            share
          </button>
        </div>
      </form>
    </div>
  );
}
