import { RequiredEntityData } from "@mikro-orm/core";
import {Resolver, Query, Mutation, Arg, Ctx, Args, UseMiddleware} from 'type-graphql'
import {Users} from '../entities/users'
import { myContext, userTodoType} from "../types";
import { userInput } from "./userInput";
import { createToken } from "../utils/createToken";
import * as bcrypt from 'bcrypt'
import express, { query } from "express";
import { Todo } from "../entities/todo";
import { AbstractSqlDriver, EntityManager, EntityRepository, QueryBuilder, SqlEntityManager, SqlEntityRepository } from "@mikro-orm/postgresql";
import { auth } from "../middleware/auth";




@Resolver()
export class userResolver {
 
  
 

 @Query(()=> Users)
 @UseMiddleware(auth)
 async getUser(@Arg('userid') userid: string, @Ctx() {em, payload, req, token}: myContext): Promise<Users | Error>{
     if(!payload || !token){
      return new Error("Not authorized")
     }
    try {
        
      console.log(`user token`, token)

        const user = await em.fork().findOne(Users, {userid: payload.userid})

        const todos = await em.fork().find(Todo, {userid: payload.userid})

      
        
        return  {...user, todos, token} as Users
    } catch(err){
        return Error("User does not exist")
    }


    
 }

  @Mutation(()=> Users)
  async register(@Arg("data") userData: userInput, @Ctx() context: myContext): Promise<Users | Error>{
       
       try {
           const {username, password} = userData 


           const hashedPassword = await bcrypt.hash(password as string, 10)

          const user = await context.em.fork().create(Users, {...userData, password: hashedPassword} as unknown as Users)
           await context.em.fork().persistAndFlush(user)
        
           const token = createToken(user.userid)
           
           context.token = token

           

          return user
       }catch(err){
           return Error(err as string )
       }

    
  

      
  } 

  @Mutation(()=> Users)
  async login(@Arg('data') data: userInput, @Ctx() context: myContext): Promise<Users | Error | undefined>{
    const {username, password} = data

    let user = await context.em.fork().findOne(Users, {username})

    const correctPass = await bcrypt.compare(password, user?.password as string)

    try{
      if(user && correctPass){
       const token = createToken(user.userid)

        const todos = await context.em.fork().find(Todo, {userid: user.userid})

      
          
       console.log("req token", context.req.headers["authorization"])
       return {username, password, userid: user.userid, todos, token}
      }else {
        return new Error("Invalid credentials")
      }
    }catch(err){
      return new Error(err as string)
    }
           
  }
   
 


}