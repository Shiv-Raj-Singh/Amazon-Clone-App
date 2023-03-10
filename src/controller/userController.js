import Error, { sucResponse } from '../validator/AppError.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { loginSchema, userUpdateSchema, userValidSchema } from '../validator/userValidation.js'
import catchAsync from './catchAsync.js'
import upload from '../awsConnection/aws.js'
import userModel from '../models/userModel.js'
import { isValidObjectId } from 'mongoose'

// ********************************************* Register User ***************************************************

export const registerUser = catchAsync(async (req, res, next) => { 
    console.log(req.body);
    if (Object.keys(req.body).length < 1) return next(new Error(` No Such Data in body !`, 400))
    if (!req.files || req.files.length < 1) return next(new Error(`Profile-image Must be Present  !`, 400))
    try {
        if(req.body.address && typeof req.body.address !== 'object') req.body.address = JSON.parse(req.body.address)
    } catch (err) {
        next(new Error('Enter Valid JSON Address !' , 400)) 
    }
    // console.log(req.files);
    const url = await upload(req.body.profileImage)
    console.log(url);
    req.body.profileImage = url

    const validUser = await userValidSchema.validateAsync(req.body)
    const user = await userModel.create(validUser)
    res.status(201).json(new sucResponse('User Registered successfully', user))
})

// ********************************************* login User ***************************************************

export const login = catchAsync(async (req, res, next) => {
    if (Object.keys(req.body).length < 1) return next(new Error(` No Such Data for Login !`, 400))
    const validData = await loginSchema.validateAsync(req.body)
    if (!validData.email && !validData.phone) return next(new Error(`for Login Enter phone or email !`, 400))
    if (validData.email && validData.phone) return next(new Error(`for Login Enter Only phone or email !`, 400))
    console.log(validData)
    const finduser = await userModel.findOne({ $or: [{ email: validData.email }, { phone: validData.phone }] })
    // const finduser = await userModel.findOne({email: validData.email})
    if (!finduser) return next(new Error(` No Such User Found !`, 404))

    const validPass = await bcrypt.compare(validData.password, finduser.password)
    if (!validPass) return next(new Error(`Incorrect Password !`, 400))

    const payload = { userId: finduser._id, project: 'product-management-system' }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIREDIN })
    res.setHeader('x-api-token', token)
    res.status(200).json(new sucResponse('User Logedin Succesfully', { userId: finduser._id, token: token }))

})


// ********************************************* Get User ***************************************************

export const getUser = catchAsync(async (req, res, next) => {
    const userid = req.params.userId
    if (!userid) return next(new Error(`UserId IS Mandatory !`, 400))
    if (!isValidObjectId(userid)) return next(new Error(`UserId Should be Valid !`, 400))

    const user = await userModel.findById(userid)
    if (!user) return next(new Error(` No Such User Found !`, 404))
    res.status(200).json(new sucResponse('User found Succesfully', user))

})

// ********************************************* Update User ***************************************************

export const UpdateUser = catchAsync(async (req, res, next) => {
    if (!isValidObjectId(req.params.userId)) return next(new Error(`UserId Should be Valid !`, 400))
    const user = await userModel.findById(req.params.userId)
    if (!user) return next(new Error(` No Such User Found !`, 404))
    if (req.params.userId !== req.decode.userId) return next(new Error(`Not Authorised !`, 403))
    if (req.files){
        if (req.files.length > 0) {
            const url = await upload(req.files[0])
            req.body.profileImage = url 
    }}
    if (Object.keys(req.body).length < 1) return next(new Error(` No Such Data for Update !`, 400))
    if(req.body.address)
    try {
        if(typeof req.body.address !== 'object') req.body.address = JSON.parse(req.body.address)
    } catch (err) {
        next(new Error('Enter Valid JSON Address !' , 400))
    }
    const data1 = await userUpdateSchema.validateAsync(req.body)
    const {address} = data1
    const update = {...data1}
    delete update.address
    if (address) {
        if (address.shipping) {
            if (address.shipping.street) {
                update["address.shipping.street"] = address.shipping.street
            }
            if (address.shipping.city) {
                update["address.shipping.city"] = address.shipping.city
            }
            if (address.shipping.pincode) {
                update["address.shipping.pincode"] = address.shipping.pincode
            }
        }
     if (address.billing) {
            if (address.billing.street) {
                update["address.billing.street"] = address.billing.street
            }
            if (address.billing.city) {
                update["address.billing.city"] = address.billing.city
            }
            if (address.billing.pincode) {
                update["address.billing.city"] = address.billing.pincode
            }
    }}

    const data = await userModel.findByIdAndUpdate(req.params.userId, update, { new: true })
    res.status(200).json(new sucResponse('User Updated Succesfully', data))
})

