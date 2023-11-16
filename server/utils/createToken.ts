import {sign} from 'jsonwebtoken'

export function createToken(userid: string): string{
   
 const token = sign({userid}, process.env.JWT_SECRET! as string)

    return token
}