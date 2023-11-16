import { responsePathAsArray } from 'graphql/execution'
import {NextPage} from 'next'
import {useRouter as RouterHook} from 'next/router'
import {useRouter} from 'next/navigation'
import { useEffect, useImperativeHandle, useState } from 'react'
import {UseQueryState, gql, useMutation, useQuery} from 'urql'
import Todo from '@/components/Todos'
import TodoForm from '@/components/todoForm'
import UpdateTodo from '@/components/updateTodo'


export type todoType = {
  id: string
  desc: string
  createdAt: Date
  updatedAt: Date
  age: Date
}


const USER_QUERY = gql`

 
 query ($userid: String!){
    getUser(userid: $userid) {
      userid
      username
      password
      token

      todos {
        desc
        createdAt
        updatedAt
        id
        age
      }
    }



}

`
const DELETE_MUT = gql`

mutation($deleteTodoId: Float!) {
  deleteTodo(id: $deleteTodoId)
}
`


const CREATE_MUT = gql`
mutation($data: String!) {
  createTodo(data: $data) {
     desc
     createdAt
     updatedAt
     userid
     id
     age
  }
}
`


function search(arr: any[]){
                                                                        
  
}


const UserPage: NextPage = ()=> {

  const [todos, setTodos] = useState<todoType[]>([])


  const [,deletetodo] = useMutation(DELETE_MUT)

  const [,createtodo] = useMutation(CREATE_MUT)


     
 async function deleteTodo(id: string) {
       await deletetodo({deleteTodoId: parseFloat(id)})
                

      const filter = todos.filter(todo=> todo.id !== id)
        
   console.log(todos)


        setTodos(filter)
        
  }

  
let token = "";
  
 const queryRouter = RouterHook()

      const {userid} = queryRouter.query  

      

console.log('id', userid)

  const router = useRouter()
       

  
      

        const [response] = useQuery({
          query: USER_QUERY,
          variables: {userid},
          
        })


       
      
       
      
   

     
    
    
      console.log("data", response)
    
    useEffect(()=> {
      
       console.log('data', response.data)

      localStorage.setItem('todos', JSON.stringify(response.data?.getUser.todos))

     token = localStorage.getItem('token')!

    
     if(!token){
      router.push("/login")
     }
    })

   
           
    
  
   
     console.log(response.data?.getUser)
      
     function logout(){
      localStorage.removeItem("token")
      router.push("/login")
     }


     async function createTodo(desc: string){
       const todo =  await createtodo({data: desc})

        console.log(todo)
        console.log(todo.data.age)
           
        setTodos([...todos, todo as unknown as todoType ])
     }
    
     function updateTodo(desc: string){
         console.log("...")
     }

  return (
    <>
    <button onClick={logout}>Logout</button>
    <h1>Hi {response.data?.getUser.username}</h1>

    <TodoForm createTodo={createTodo} />
     
     <div className="flex flex-wrap relative left-11">


      {
       
        response.data?.getUser.todos.map((todo: todoType) => 
         <>
        <Todo todo={todo} deleteTodo={deleteTodo}   />  
            

              </>

        )
      }
   </div>
     
    </>
  )


  }
export default UserPage