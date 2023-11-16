import React, {useState} from 'react'
import 'graphql'


export type registerData = {
    username: string
    password: string

}

type registerFormProps = {
    onSubmit: (e: React.FormEvent, {username, password}: registerData) => void
}

 export const Registerform: React.FC<registerFormProps> = ({onSubmit}: registerFormProps)=> {
    
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")

       
    return(
        <>
       
      <div className="flex justify-center relative top-52">
      
        <form className=" w-1/2 relative top-3/4" onSubmit={(e)=> {onSubmit(e, {username, password})}}>
    
        <input type="text" placeholder="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={e => setPassword(e.target.value)}/>
          <button  className="bg-slate-700 h-1/2 w-full border rounded-md font-bold text-xl" onClick={e => onSubmit(e, {username, password})} >Submit</button>
    </form>
    
   
    </div>
    </>
    )
}

export default Registerform

