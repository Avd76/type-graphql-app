import { MikroORM } from "@mikro-orm/postgresql"
import { Todo } from "./entities/todo"
import path from 'path'
import { Users } from "./entities/users"
require("dotenv").config();
const pass: string = process.env.DB_PASSWORD as string;
export default {

    migrations: {
        path: path.join(__dirname, './migrations'), // pat
        glob: '!(*.d).{js,ts}'
    },
    entities: [Todo, Users],
    user: process.env.DB_USER,
    password: pass,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dbName: 'postgres',
    type: 'postgresql',
    debug: true
} as unknown as Parameters<typeof MikroORM.init>

