import {Field, ID, ObjectType} from 'type-graphql'
import {Entity, Property, ManyToOne,PrimaryKey} from '@mikro-orm/core'
import { v4 } from 'uuid'
import { payload } from '../middleware/auth'
import { isContext } from 'vm'


@ObjectType()
@Entity()
export class Todo {
     

    @Field(()=> ID)
    @PrimaryKey({autoincrement: true})
    id!: number
    

    @Field(()=> String)
    @Property()
    desc!: string
   

     @Field(()=> String)
     @Property({type: 'date'})
     createdAt = new Date()

     @Field(()=> String)
     @Property({type: 'date', onUpdate: ()=> new Date()}) 
     updatedAt = new Date() 

     @Field(()=> String)
     @ManyToOne("Users", {type: 'string', name: 'userid'})
     userid!: string 

     @Field(()=> String)
     @Property({type: 'date'})
     age = new Date()

}