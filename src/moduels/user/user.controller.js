import pkg from 'bcrypt'
import { User } from '../../../db/models/user.model.js'
import {AppError} from '../../utils/appError.js'
import { customAlphabet } from 'nanoid'
import { sendEmail } from '../../utils/constant/sendEmail.js'

// generate otp
const generateOtp = customAlphabet("0123456789",5)
//signup
export const signUp = async (req,res,next) => {
    try{
        // get data from req
        let {userName,email,password} = req.body
        //check existance
        const userExist =await User.findOne({email}) // {}, null
        if(userExist) {
            next(new AppError('user already exist',409))
        }
        //prepare data (hash password)
        password= pkg.hashSync(password, 8)
        //generate otp
        const otp = generateOtp();
        await sendEmail({
            to:email,
            subject:"confirm your email",
            text:`your OTP is ${otp}`,
        })
         
        const otpExpired = Date.now() + 3 * 60 * 1000

        const user = User({
            userName,
            email,
            password,
            otp,
            otpExpired
        })
        // add to db
        const createdUser = await user.save() // {}, null
        if(!createdUser){
            next(new AppError('fail to create user ',500))
        }
         //generate token
         const token = jwt.sign({email}, 'secretKey')
        sendEmail({
            to:email, subject:"verify your account",
            html:`<p>to verify your account chick <a href = 'http:/localhost:3000/user/verify/${token}'>link</a></p>`
        })
       
        // send response
        return res.status(201).json({
            message:"user created successfly",
            success:true,
            data:createdUser
        })

    } catch(error){
        return res.status(error.cause || 500).json({message:error.message, success:false})
    }
     
}
 export const verifyAccount = async (req,res,next)=>{
    try{
      const {token} = req.params
      const paylood = jwt.verify(token,'secretKey')
      const emailExist = await User.findOne({email:paylood.email})
      console.log(paylood);
      
      if(!emailExist) {
        next(new AppError('email not found',404))
      }
      await User.updateOne({email: paylood.email}, { isVerified:true })
      return res.status(200).json({message:"account verify successfully", success: true})
  
    } catch(error){
       return res.status(error.cause || 500).json({message:error.message, success:false})
    }
  }
  export const login = async (req,res)=>{
    let {email , password} = req.body
    let user =await User.findOne({email })
    if(user){
        let token = jwt.sign({email, password , id: user._id},'hti',(error,token)=>{
            res.json({message:'login successfully,',token,error})
        
        res.json({message:'user not found'})
        })}

    }

export const confirmEmail= async(req,res,next) => {
    const {email,otp} = req.body
    const user = await User.findOne({email})
    if(!user){
        req.status(404).json({message:'invalid email , please singup first ', success:false})
    }
    if(user.confirmEmail){
        req.status(400).json({message:'email already confirmed ', success:false})

    }
    if(user.otp != otp){
        req.status(404).json({message:'invalid otp ', success:false})

    }

}

        
    