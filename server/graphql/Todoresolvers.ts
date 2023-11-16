import { Loaded, RequiredEntityData } from "@mikro-orm/core";
import { Resolver, Query, Mutation, Arg, Ctx, Int, UseMiddleware} from "type-graphql";
import { isContext } from "vm";
import { Todo } from "../entities/todo";
import { auth } from "../middleware/auth";
import { myContext, userTodoType } from "../types";
import { todoInput } from "./todoType";




@Resolver(Todo)
export class todoResolver {
    @Query(()=> String)
   Hello(){
      return "Hello world!"
    }

         


    @Query(()=> [Todo])
    @UseMiddleware(auth)
   async Newest(@Ctx() {em, payload}: myContext): Promise<Todo[] | Error>{
            if(!payload){
                return new Error("Not authorized")
            }
          try{
            let todos = await em.fork().getConnection().execute("SELECT * FROM todo WHERE userid_userid = ? ORDER BY created_at DESC", [payload.userid]);
              
                 
            let arr: Todo[] = []
           
            todos.map((todo: any) =>  arr.push({...todo, createdAt: todo.created_at, updatedAt: todo.updated_at, age: todo.age}))
            
      

           return arr;
          }catch(err){
            return new Error(err as string)
          }
            
    }

    @Query(() => [Todo])
    @UseMiddleware(auth)
    async getTodos(@Ctx() ctx: myContext): Promise<Todo[] | Error> {
        
        const {em, payload} = ctx

         
        try{
              
          
         
        if(!payload){
            
            return new Error("Not authorized")
        }

        let todo: Todo;
                   
        const {userid} = payload

         
        const todos = em.fork().find(Todo, {userid})

    await (await todos).map(todo => todo.userid = userid)
          
        return todos;
    }catch(err){
        return new Error(err as string)
    }
    }
    @UseMiddleware(auth)
    @Query(()=> Todo)
   async getTodo(@Arg("id", ()=> Int) id: number, @Ctx() {em, payload}: myContext): Promise<Todo | null | Error>{
           
    if(!payload){
        return new Error("Not authorized")
    }
  const todo: Loaded<Todo, never> | null= await em.fork().findOne(Todo, {id})
 if(!todo){
    return new Error("Todo does not exist")
 }
 console.log(todo.userid as string)
    return {...todo, userid: payload.userid}
    } 

    @Mutation(()=> Todo)
    @UseMiddleware(auth)
    async createTodo(@Arg('data') desc: string, @Ctx() {em, payload}: myContext ): Promise<Todo | Error>{

        console.log('resolver payload', payload)
             
        if(payload){
        
        const {userid} = payload

        let id: string = userid
           
        console.log('userid', userid)
        
       const todo = await em.fork().create(Todo, {desc, userid: id as string} as unknown as RequiredEntityData<Todo>) 

       console.log(todo)
       console.log(todo.id)
            
        await em.fork().persistAndFlush(todo)
        

        return {id: todo.id, desc, createdAt: todo.createdAt, updatedAt: todo.updatedAt, userid, age: todo.age}
        }else {
            return new Error(`${payload}`)
        } 
    }
    @UseMiddleware(auth)
    @Mutation(()=> Todo)
    async updateTodo(@Arg("desc") desc: string,@Arg("id") id: number , @Ctx() {em, payload}: myContext): Promise<Todo | null | string | Error>{
        
         if(!payload){
            return new Error("Not authorized")
         }

         const todo = await em.fork().findOne(Todo, {id})
        
        if(todo && todo !== null){
            todo.desc = desc 
            todo.updatedAt = new Date()
            await em.fork().persistAndFlush(todo)
        }else if(!todo){
          return "This todo does not exist"
        }else {
            return null
        }

     return {id: todo.id, desc: todo.desc, createdAt: todo.createdAt, updatedAt: todo.updatedAt, userid: payload.userid, age: todo.age}
    }
    @UseMiddleware(auth)
    @Mutation(()=> String)
    async deleteTodo(@Arg("id") id: number, @Ctx() {em, payload}: myContext): Promise<string | null | Error>{
        if(!payload){
           return new Error("Not authorized")
        }
        const post = await em.fork().findOne(Todo, {id})

        if(post){
            em.fork().removeAndFlush(post)

            return "Todo deleted!"
        }else {
            return "That todo does not exist"
        }

    }
}