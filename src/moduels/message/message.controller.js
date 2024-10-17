import { Message } from "../../../db/models/message.model.js"

export const addMessage = (req,res,next)=>{
    const {content, receiverId} = req.body
    const createdMessage =Message.create({content, receiverId})
if (!createdMessage){
    next(new AppError('fail to create message ',500))
}
return res.status(201).json({message:'message created successfully',
    success:true,
    data:createdMessage
})

}
// read message
export const getMessage= async(req,res,next)=>{
    const {id} = req.user.id
    const getMessage = (await Message.find({receiverId:req.user.id}))
    return res.status(201).json({message:'get message successfully',id,data:getMessage})
}
//delete message
export const deletedMessage = async(req,res,next)=>{
    const {id}= req.user.id
    const deletedMessage = await Message.findByIdAndDelete({receiverId:req.user.id})
    return res.status(201).json({message:'message is deleted',id,data:deletedMessage})
}