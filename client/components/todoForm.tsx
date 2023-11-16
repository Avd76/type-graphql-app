import React, {useState} from 'react'


type todoProps = {
    createTodo: (desc: string) => void
}


const TodoForm = ({createTodo}: todoProps)=> {
  const [desc, setDesc] = useState<string>("")
  
  






    return(
        <>
        <form className="grid col-span-1 relative left-1/4" onSubmit={(e)=> {e.preventDefault(), createTodo(desc)}}>
         <input type="text" placeholder="Enter todo" className="shadow appearance-none border rounded w-1/2 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setDesc(e.target.value)} />
         <input type="submit" placeholder="Create todo" className="shadow appearance-none border-rounded w-1/2 h-8 bg-blue-500"  />
         </form>
        </>
    )
}


export default TodoForm