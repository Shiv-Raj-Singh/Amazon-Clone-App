import productModel from "../models/productModel.js"
import cartModel from "../models/cartModel.js"
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"

import catchAsync from "./catchAsync.js" 
import Error, { sucResponse } from "../validator/AppError.js"
import { isValidObjectId } from "mongoose"

export const createOrder = catchAsync( async(req, res ,next)=>{
    if(!isValidObjectId(req.params.userId)) return next(new Error (`InValid User-Id -> ${req.params.userId} !` , 400))
    const user = await userModel.findById(req.params.userId)
    if(!user) return next(new Error (`User Not Exist For Id -> ${req.params.userId} !` , 404))
    if (req.params.userId !== req.decode.userId) return next(new Error(`Not Authorised !`, 403))

    const cart = await cartModel.findOne({userId : req.params.userId}).populate("items.productId" , "title productImage price availableSizes") 
    if(!cart)  return next(new Error (`Cart Not Found For this User !` , 404))  
    if(cart.totalItems == 0 ) return next(new Error (`Cart Have No Product For Order !` , 404)) 

    const cartorder = cart._doc
    const order = {...cartorder}

    cart.items = []
    cart.totalPrice = 0
    cart.totalItems =  0
    cart.save()

    delete order._id
    const {items} = order
    let totalQuantity = 0
    items.forEach(a=>{totalQuantity = totalQuantity + a.quantity  })
    order.totalQuantity = totalQuantity

    const orderData = await orderModel.create(order)
    return res.status(201).json(new sucResponse(" Order Created Successfully !" , orderData))
})

// ****************************************************  Update Cart ************************************************

export const updateOrder = catchAsync(async(req,res,next)=>{
    const {orderId , status} = req.body
    if(!isValidObjectId(req.params.userId)) return next(new Error (`InValid User-Id -> ${req.params.userId} !` , 400))
    const user = await userModel.findById(req.params.userId)
    if(!user) return next(new Error (`User Not Exist For Id -> ${req.params.userId} !` , 404))
    if (req.params.userId !== req.decode.userId) return next(new Error(`Not Authorised !`, 403))
  
    if(!orderId) return next(new Error (`Enter Order-Id in Body !` , 400))
    if(!isValidObjectId(orderId)) return next(new Error (`InValid Order-Id -> ${orderId} !` , 400))
    if(!status) return next(new Error (`Enter Status in Body !` , 400))
    if(!['completed' , 'cancled'].includes(status.toLowerCase())) return next(new Error (`InValid Status -> ${status} Status from ['completed' , 'canceled'] !` , 400))

    const order = await orderModel.findOne({_id : orderId, isDeleted : false ,status : "pending"}).populate("items.productId" , "title productImage price availableSizes")
    if(!order) return next(new Error (`Order Not Found By Order-Id -> ${orderId} - Either Order Status is Not Pending !` , 400))    
    if(order.userId != req.params.userId )  return next(new Error(`Order User-Id And User-Id Mis-Match !` , 400))  
    if(status == 'cancled'){
        if(order.cancellable == false ) return next(new Error('Your Order is Not Cancellable' , 400))
    }
    order.status = status
    order.save()
 
    return res.status(200).json(new sucResponse("Cart Updated Successfully !" , order))     
})


