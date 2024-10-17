import joi from 'joi'
export const signUpVal = joi.object({
    name:joi.string().min(2).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegXap('^[a-zA-Z0-9]{3,30}$')).requried(),
    cPassword:joi.string().valid(joi.ref('password')).requried()
})