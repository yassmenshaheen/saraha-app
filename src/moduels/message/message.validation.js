import joi from 'joi'
export const addMessageVal = joi.object({
    content:joi.string().min(3).required(),
    receiverId:joi.string().hex().length(24)

})