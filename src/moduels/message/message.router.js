import { Router } from 'express'
import { isValidMessage } from '../../middelware/validation.js'
import { addMessage, deletedMessage, getMessage } from './message.controller.js'
import { addMessageVal } from './message.validation.js'
import { asyncHandler } from '../../middelware/asyncHandler.js'
const messageRouter = Router()
// add message
messageRouter.post('/',isValidMessage(addMessageVal),asyncHandler(addMessage))
messageRouter.get('/',getMessage)
messageRouter.delete('/',deletedMessage)
export default messageRouter