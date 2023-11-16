import {PrimaryKey, Property, Entity, Unique} from '@mikro-orm/core'
import { UniqueArgumentNamesRule } from 'graphql'
import { Field, ObjectType } from 'type-graphql'
import {v4} from 'uuid'
import { Todo } from './todo'
@ObjectType()
@Entity()
export class Users {
   
        
    @Field(()=> String)
    @PrimaryKey({type: 'string'})
    userid = v4()

    @Field()
    @Property()
    @Unique()
    username!: string
   
   @Field()
   @Property()
   password!: string

    @Field(()=> [Todo])
    todos?: Todo[]

   @Field(()=> String)
   token!: string
}