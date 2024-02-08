import Form from "@/components/formulario"
export default function page({params}){
  return(
    <Form ListaId={params.ListaId}/>
  )
}