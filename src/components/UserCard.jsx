"use client"

import { useRouter } from "next/router"

export default function UserCard({user}){
    const router=useRouter()
    return(
        <div className='bf-slate-900 p-3 hover:bg-slate-800
        hover:cursor-pointer'
        onClick={() => {router.push(``)}}
        >
          <h3 className='font-bold text-2xl mb-2'>{user.nombre}</h3>
        </div>
    )
}