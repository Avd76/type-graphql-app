import { InputType, Field } from "type-graphql";





@InputType()
export class userInput {

    @Field(()=> String)
    username!: string 
   

     @Field(()=> String)
     password!: string

}