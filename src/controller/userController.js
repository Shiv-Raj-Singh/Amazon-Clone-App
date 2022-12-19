import Error, { sucResponse } from '../validator/AppError.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import {loginSchema, userUpdateSchema, userValidSchema} from '../validator/userValidation.js'
import catchAsync  from './catchAsync.js'
import  upload  from '../awsConnection/aws.js'
import userModel from '../models/userModel.js'
import { isValidObjectId } from 'mongoose'

// ********************************************* Register User ***************************************************

export const registerUser = catchAsync( async(req , res , next)=>{
    if(Object.keys(req.body).length < 1)  return next(new Error(` No Such Data in body !` , 400))
    const obj = JSON.parse(req.body.address)
    req.body.address = obj

    if(req.files.length < 1)   return next(new Error(`Profile-image Must be Present  !` , 400))
    const url = await upload(req.files[0])
    req.body.profileImage = url

    const validUser = await userValidSchema.validateAsync(req.body)
    const user = new userModel(validUser)
    await user.save()

    res.status(201).json(new sucResponse('User Registered succesfully' , user))

})

// ********************************************* login User ***************************************************

export const login = catchAsync(async (req , res , next)=>{

    if(Object.keys(req.body).length < 1)  return next(new Error(` No Such Data for Login !` , 400))
    const validData = await loginSchema.validateAsync(req.body)
    if(!validData.email && !validData.phone) return next(new Error(`for Login Enter phone or email !` , 400))
    if(validData.email && validData.phone) return next(new Error(`for Login Enter Only phone or email !` , 400))

    const finduser = await userModel.findOne({$or : [{email : validData.email} ,{phone : validData.phone}]})
    if(!finduser) return next(new Error(` No Such User Found !` , 404))

    const validPass = await bcrypt.compare(validData.password , finduser.password)
    if(!validPass) return next(new Error(`Incoorect Password !` , 400))

    const payload = { userId : finduser._id , project: 'product-management-system'}
    const token = jwt.sign(payload , process.env.SECRET_KEY , {expiresIn: process.env.EXPIREDIN})
    res.setHeader('x-api-token' , token)
    res.status(200).json(new sucResponse('User Logedin Succesfully' , { userId : finduser._id , token : token}))

})


// ********************************************* Get User ***************************************************

export const getUser = catchAsync(async(req,res,next)=>{
    const userid = req.params.userId
    if(!userid) return next(new Error(`UserId IS Mandatory !` , 400))
    if(!isValidObjectId(userid)) return next(new Error(`UserId Should be Valid !` , 400))

    const user = await userModel.findById(userid)
    if(!user) return next(new Error(` No Such User Found !` , 404))
    res.status(200).json(new sucResponse('User found Succesfully' , user))

})

// ********************************************* Update User ***************************************************

export const UpdateUser = catchAsync(async(req,res,next)=>{
    const userid = req.params.userId
    if(!userid) return next(new Error(`UserId IS Mandatory !` , 400))
    if(!isValidObjectId(userid)) return next(new Error(`UserId Should be Valid !` , 400))
    const user = await userModel.findById(userid)
    if(!user) return next(new Error(` No Such User Found !` , 404))

    if(userid !== req.decode.userId) return next(new Error(`Not Authorised !` , 400))
    if(Object.keys(req.body).length < 1)  return next(new Error(` No Such Data for Update !` , 400))
    
    const data1 = await userUpdateSchema.validateAsync(req.body)
    if(req.files.length > 0)  {
        const url = await upload(req.files[0])
        req.body.profileImage = url
    }

    const data = await userModel.findByIdAndUpdate(userid , {$set : data1})
    res.status(200).json(new sucResponse('User Updated Succesfully' , data))
})

 