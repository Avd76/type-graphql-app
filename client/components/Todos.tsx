import React, { useState } from 'react'
import { gql, useMutation } from 'urql'
import { todoType } from '@/pages/[userid]'
import UpdateTodo from './updateTodo'



type todoProps = {
  todo: todoType,
  deleteTodo: (id: string) => void
}


const UPDATE_MUT = gql`
mutation($updateTodoId: Float!, $desc: String!) {
  updateTodo(id: $updateTodoId, desc: $desc) {
     createdAt
     updatedAt
     desc
     id
  }
}


`



const Todo: React.FC<todoProps> = ({todo, deleteTodo}: todoProps)=> {

   const [,updatetodo]  = useMutation(UPDATE_MUT)
          
      
    
      let age: string = "todo.age"

      let Age = parseInt(age)


      if((((Age - Date.now())/1000)/3600)/24 >= 1){
                deleteTodo(todo.id)
                alert("Sorry, but some of your todos have been deleted after 24 hours, please make sure to complete all of them on time!")
      }
   
 
  
  
  async function updateTodo(e: React.FormEvent, desc: string){

       e.preventDefault()

     await updatetodo({updateTodoId: parseInt(todo.id), desc})

     todo.desc = desc

    
    

  }
 

  


    return (
        <>
          <div className="flex space-x-3/4 text-center items-end w-1/3 m-4 h-14 border rounded-md bg-slate-200 border-slate-500">
                <div className="relative bottom-1/2 left-1/2 flex text-center ">{todo.desc}</div>

                  <UpdateTodo  todo={todo} updateTodo={updateTodo} />
             
                <button className="relative top-0 right-0 bg-red-500" onClick={()=> deleteTodo(todo.id)}>Delete Todo</button>
          </div>

          
        </>
    )
}


export default Todo