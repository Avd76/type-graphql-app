import Registerform, { registerData } from "@/components/RegisterForm";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React from "react";
import { gql, useMutation } from "urql";


const REGISTER_MUT = gql `

mutation($data: userInput!) {
  register(data: $data) {
     userid
     username
     password
     token
     
  }
}
`




const register: NextPage = ()=> {
  const router = useRouter()
         const [, register ] = useMutation(REGISTER_MUT)

          async function onSubmit(e: React.FormEvent, data: registerData){
          e.preventDefault()
          e.stopPropagation()
               
         const response =  await register({
            data
          })

            router.push("/login")

           
          }

   return (

    <>
    <h1 className="text-4xl relative top-52 flex justify-center">Register</h1>
    <div className="relative top-full mt-5">
         <Registerform onSubmit={onSubmit} />
      </div>
      </>

   )
} 



export default register