import express from 'express'
import { connectDB } from './db/connection.js'
import userRouter from './src/moduels/user/user.router.js'
import messageRouter from './src/moduels/message/message.router.js'
import { sendEmail } from './src/utils/constant/sendEmail.js'
const app = express()
const port = 3000
connectDB()
sendEmail()
app.use(express.json())
app.use('/user',userRouter)
app.use('/message',messageRouter)
app.listen(port, ()=> console.log('server is running',port)
)