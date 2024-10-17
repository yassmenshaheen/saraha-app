import {AppError} from '../utils/appError.js'
export const asyncHandler = (callBack) => {
   return (req,res,next)=>{
       callBack(req,res,next).catch((error)=>{
           next(new AppError(error.message, error.statusCode))

       })
   }
}
export const globalErrorHandling = (err,req,res,next) => {
   return res.status(err.statusCode ||500 ).json({message:err.message, success:false})
   
}