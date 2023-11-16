import RegisterForm, { registerData } from "@/components/RegisterForm";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React from "react";
import {gql, useMutation } from 'urql'


const LOGIN_MUT = gql`
mutation($data: userInput!) {
    login(data: $data) {
      userid
      username
      password
      token

     
    }
  }
`





const Login: NextPage = ()=> {
  



    const [, login] = useMutation(LOGIN_MUT)

    const router = useRouter()
        
    async function handleSubmit(e: React.FormEvent, data: registerData){
       e.preventDefault()
       e.stopPropagation()

       const response = await login({ data })

       console.log("login", response)

       const {error} = response

         if(error){
            console.log(error)

            return
            
           

           
         }
  
         
          console.log(response.data?.login.token)

       localStorage.setItem('token', "bearer " + response.data?.login.token)

        const token = localStorage.getItem('token')

        if(token === `bearer ${response.data?.login.token}`){
          router.push(`/${response.data?.login.userid}`)
        }

       router.push(`/${response.data?.login.userid}`)
       
    }

    return (
        <>
        <h1 className="text-4xl relative top-52 flex justify-center">Login</h1>
      <div className="relative top-full mt-5">
      <RegisterForm onSubmit={handleSubmit} />

      {
        
      }
      </div>
     
     
        </>
    )
}


export default Login