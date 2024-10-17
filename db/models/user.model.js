import {Schema,model} from 'mongoose'
//schema
 const userSchema = new Schema ({
    userName:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    otp:String,
    otpExpired:Date,

 },{timeStamp:true}) 
//model
export const User = model('/User',userSchema)