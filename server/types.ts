import {Request, Response} from 'express'
import {Connection, EntityManager, IDatabaseDriver, MikroORM} from '@mikro-orm/core'
import { Users } from './entities/users'
import { Todo } from './entities/todo'
import { payload } from './middleware/auth'


export type myContext = {
    req: Request,
    res: Response,
   em: EntityManager<IDatabaseDriver<Connection>>
   token: string
   payload: payload
}

export type userTodoType = {
    user: Users,
    token: string,
    todos: Todo[]
}
       