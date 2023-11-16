import { Field, InputType } from "type-graphql";




@InputType()
export class todoInput {
  
    @Field()
    desc!: string
}