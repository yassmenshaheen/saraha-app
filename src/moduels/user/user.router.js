import {Router} from 'express'
import { confirmEmail, signUp, verifyAccount } from './user.controller.js'
import { asyncHandler, globalErrorHandling } from '../../middelware/asyncHandler.js'
 import {signUpVal} from '../user/user.validation.js'
import { isValid } from '../../middelware/validation.js'
const userRouter = Router()
//sing up 
userRouter.post('/',isValid(signUpVal),asyncHandler(signUp ))
userRouter.post('/',asyncHandler(confirmEmail))
userRouter.get('/verify/:token',asyncHandler(verifyAccount))
app.use(globalErrorHandling)
export default userRouter