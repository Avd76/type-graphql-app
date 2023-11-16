import { myContext } from "../types";
import { JwtPayload, verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";

export type payload = {

   userid: string
}

export const auth: MiddlewareFn<myContext> = ({context}, next)=>{
   const authorization = context.req.headers["authorization"]!
   console.log(`AUTHORIZATION`, authorization)
   if(!authorization){
    throw new Error(`Not authenticted`)
   }

   try{
       const token = authorization.split(" ")[1]

       context.token = token;
         
       console.log('context token', context.token)
        
       const payload = verify(token, process.env.JWT_SECRET! as string)
         
       console.log('payload id', payload)


     context.payload = payload as payload
      console.log(context.payload.userid)
      
                                        
      


   }catch(err) {
      throw new Error(err as string)
   }

   return next()
}