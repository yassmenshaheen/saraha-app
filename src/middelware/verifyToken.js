import { error } from 'console'
import jwt , {decode} from 'jsnowebtoken'
import {catchError} from './catcherror.js'
import {AppError} from '../utils/appError'
export const verifyToken = catchError(async(req,res,next)=>{
    let{token} = req.headers
    jwt.verify(token,'yassmen123',async(error,decode)=>{
        req.user = decode

        if(error)
            return next(new AppError('invalid token',401))
        next()
    })

})