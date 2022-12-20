import { productValidSchema , getProducts } from "../validator/productValidation.js";
import productModel from '../models/productModel.js'
import catchAsync from "./catchAsync.js";
import upload from "../awsConnection/aws.js";
import Error , {sucResponse} from "../validator/AppError.js";
import { isValidObjectId } from "mongoose";


export const createProduct = catchAsync(async (req, res ,next)=>{
    if(Object.keys(req.body).length < 1)  return next(new Error(` No Such Data in body for Product !` , 400))
    if(req.files.length < 1)   return next(new Error(`Product-image Must be Present  !` , 400))
    const productImage = await upload(req.files[0])
    req.body.productImage = productImage
    if(req.body.availableSizes){
        req.body.availableSizes = req.body.availableSizes.split(' ')
    }
    const data = await productValidSchema.validateAsync(req.body)
    const product = await productModel.create(data)
    res.status(201).json(new sucResponse('Product Created succesfully' , product))
})

// ****************************************************  Get Product **************************************************


export const getProductbyfilter = catchAsync(async (req, res ,next)=>{
    const filters = await getProducts.validateAsync(req.query)
    const {name , size , priceLessThan , priceGreaterThan} = filters
    const obj = {isDeleted : false}
    if(priceLessThan && priceGreaterThan){
        priceLessThan < priceGreaterThan ? next(new Error(`Less than Price ${priceLessThan} less than to Greater than Price ${priceGreaterThan} !` , 400)) : ""
    }
    if(name){
        obj.title = {$regex : name}    }
    if(size){
        obj.availableSizes = size}
    if(priceLessThan){
        obj.price = {$lt : priceLessThan}}
    if(priceGreaterThan){
        obj.price = {$gt : priceGreaterThan}}

    const data = await productModel.find(obj)
    if(data.length < 1) return next(new Error(`Products Not found !` , 404))
    res.status(200).json(new sucResponse('Products found succesfully' , data))
})

// *******************************   ********  Get Product By Id *************  **************************

export const getProductById = catchAsync( async (req,res,next)=>{
    if(!isValidObjectId(req.params.productId)) return next(new Error(`Enter Valid ( ${req.params.productId} ) Product Id !` , 400))
    const product = await productModel.findOne({_id : req.params.productId , isDeleted : false})

    if(!product) return next(new Error(`Product Not found !` , 404))
    res.status(200).json(new sucResponse('Product found succesfully' , product))
})