import {Schema ,model} from 'mongoose'
//schema
const messageSchema = new Schema({
    content:String,
    receiverId:{
        type:String,
        unique:true
    }

},{timeStamp:true})
//model
export const Message = model('/Message',messageSchema)