import express, {Request, Response} from 'express'
import { myContext } from './types'
import {ApolloError, ApolloServer} from 'apollo-server-express'
import { MikroORM } from '@mikro-orm/core'
import cors from 'cors'
import { Todo } from './entities/todo'
import { Users } from './entities/users'
import "reflect-metadata"
import MikroConfig from './mikro-orm.config'
import { buildSchema } from 'type-graphql'
import { todoResolver } from './graphql/Todoresolvers'
import mikroOrmConfig from './mikro-orm.config'
import { userResolver } from './graphql/UserResolver'


async function main(){
   
    const orm = await MikroORM.init(MikroConfig)
     
    


    const app = express()

      app.use(cors())

   const schema = await buildSchema({
      resolvers: [todoResolver, userResolver],
      validate: false
   })

   const server = new ApolloServer({
    schema,
    context: ({req, res}: myContext)=> ({req, res, em: orm.em.fork()})
   })
   await server.start()
   server.applyMiddleware({app})

   app.listen(5000, ()=>{
    console.log("App on port 5000")
   })
    
    
}

main()