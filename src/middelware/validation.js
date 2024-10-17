import {AppError} from '../utils/appError.js'
export const isValid = (schema) => {
    return(req,res,next) => {
        const {error} = schema.validate( req.body , {abortEarly : false})
        const errArr=[]
        error.details.forEach(err => {
            errArr.push(err.message)
            
        });
        if(error) return next(new AppError(errArr,409))
            next()
    }
}
export const isValidMessage = (schema) => {
    return(req,res,next) => {
        const {error} = schema.validate( req.body , {abortEarly : false})
        const errArr=[]
        error.details.forEach(err => {
            errArr.push(err.message)
            
        });
        if(error) return next(new AppError(errArr,409))
            next()
    }
}