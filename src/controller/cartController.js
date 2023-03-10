import productModel from "../models/productModel.js"
import cartModel from "../models/cartModel.js"
import userModel from "../models/userModel.js"

import catchAsync from "./catchAsync.js" 
import Error, { sucResponse } from "../validator/AppError.js"
import { isValidObjectId } from "mongoose"

export const createCart = catchAsync( async(req, res ,next)=>{
    const {cartId , productId} = req.body
    if(!isValidObjectId(req.params.userId)) return next(new Error (`InValid User-Id -> ${req.params.userId} !` , 400))
    const user = await userModel.findById(req.params.userId)
    if(!user) return next(new Error (`User Not Exist For Id -> ${req.params.userId} !` , 404))
    if (req.params.userId !== req.decode.userId) return next(new Error(`Not Authorized !`, 403))
  
    if(!productId) return next(new Error (`Enter Product-Id in Body !` , 400))
    if(!isValidObjectId(productId)) return next(new Error (`InValid Product-Id -> ${productId} !` , 400))
    const product = await productModel.findOne({_id : productId , isDeleted : false})
    if(!product) return next(new Error (`Product Not Found By Product-Id -> ${productId} !` , 400))

    const addProduct =  {productId : productId , quantity : 1}

                    //    if Cart-Id is Not Coming then Create a New Cart Try to find Cart by UserId ! 
    if(!cartId){
        const cart = await cartModel.findOne({userId : req.params.userId}) 
        if(cart){ 
            return next(new Error (`Cart Already Exist Enter A Cart-Id !` , 400))    

                                //  Optional -->  if we want we can add the product in cart by user's id also --! 
            // const {items} = cart
            // items.forEach(a=>{ if( a.productId == productId ) a.quantity = a.quantity + 1  })
            // const newProduct = items.find(a => a.productId == productId)
            // if(!newProduct)  items.push(addProduct)
            // cart.items = items
            // cart.totalPrice = cart.totalPrice + product.price
            // cart.totalItems =  items.length
            // cart.save()
            // return res.status(200).json(new sucResponse(" Product Added in Cart Successfully !" , cart))
        }   
                       //  Create A New Cart For User that have no cart so-far !
        const cartObj = {}  
        cartObj.items = addProduct
        cartObj.userId = req.params.userId
        cartObj.totalPrice = product.price
        cartObj.totalItems = 1
        const cartData = await cartModel.create(cartObj)
        return res.status(201).json(new sucResponse("Cart Created Successfully !" , cartData))
    }

 //  Add To Cart Product if Cart id is Coming __ !

    if(!isValidObjectId(cartId)) return next(new Error (`InValid cart-Id -> ${cartId} !` , 400))
    const cart = await cartModel.findById(cartId)
    if(!cart)  return next(new Error (`Cart Not Found !` , 404))  
    if(cart.userId != req.params.userId )  return next(new Error (`Cart User-Id And User-Id Mis-Match !` , 400))  

    const {items} = cart
    items.forEach(a=>{ if( a.productId == productId ) a.quantity = a.quantity + 1  })
    const newProduct = items.find(a => a.productId == productId)
    if(!newProduct)  items.push(addProduct)
    cart.items = items
    cart.totalPrice = cart.totalPrice + product.price
    cart.totalItems =  items.length
    cart.save()
    return res.status(201).json(new sucResponse(" Product Added in Cart Successfully !" , cart))

})

// ****************************************************  Update Cart ************************************************

export const updateCart = catchAsync(async(req,res,next)=>{
    const {cartId , productId , removeProduct} = req.body
    if(!isValidObjectId(req.params.userId)) return next(new Error (`InValid User-Id -> ${req.params.userId} !` , 400))
    const user = await userModel.findById(req.params.userId)
    if(!user) return next(new Error (`User Not Exist For Id -> ${req.params.userId} !` , 404))
    if (req.params.userId !== req.decode.userId) return next(new Error(`Not Authorized !`, 403))
  
    if(!productId) return next(new Error (`Enter Product-Id in Body !` , 400))
    if(!isValidObjectId(productId)) return next(new Error (`InValid Product-Id -> ${productId} !` , 400))
    const product = await productModel.findById(productId, {isDeleted : false})
    if(!product) return next(new Error (`Product Not Found By Product-Id -> ${productId} !` , 400))   
    
    if(!cartId) return next(new Error (`Enter Cart-Id in Body !` , 400))
    if(!isValidObjectId(cartId)) return next(new Error (`InValid Cart-Id -> ${productId} !` , 400))
    // const cart = await cartModel.findOne({_id : cartId , totalPrice : {$gt : 0} , totalItems : {$gt : 0}})
    const cart = await cartModel.findById(cartId)
    if(!cart)  return next(new Error (`Cart Not Found !` , 404))  
    if(cart.userId != req.params.userId )  return next(new Error (`Cart User-Id And User-Id Mis-Match !` , 400))  

    if(!removeProduct || removeProduct != 0 && removeProduct != 1){
        return next(new Error (`removeProduct key Mandatory Should be Equal to 0 or 1 Only !` , 400))
    }
    const {items} = cart
    const findProduct = items.find(a => a.productId == productId)
    if(!findProduct)   return next(new Error (`Cart Have No Product to Update for this Product-id !` , 400))  
    const productPrices = findProduct.quantity * product.price

    if(removeProduct == 1 ){
        items.forEach(a=>{ if( a.productId == productId && a.quantity > 0 ) a.quantity = a.quantity - 1  })
        const item = items.filter(a=> a.quantity!==0 )
        cart.items = item
        cart.totalPrice = cart.totalPrice - product.price  
        cart.totalItems =  item.length
        cart.save()
        return res.status(200).json(new sucResponse("Cart Updated Successfully !" , cart))
    } 
    items.forEach(a=>{ if( a.productId == productId && a.quantity > 0 ) a.quantity = 0 })
    const item = items.filter(a=> a.quantity!==0 )
    cart.items = item
    cart.totalPrice =cart.totalPrice - productPrices
    cart.totalItems =  item.length
    cart.save()

    return res.status(200).json(new sucResponse("Cart Updated Successfully !" , cart))     
})


// **********************************************  Get Cart Details ^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

export const getCart = catchAsync(async(req ,res ,next )=>{

    if(!isValidObjectId(req.params.userId)) return next(new Error (`InValid User-Id -> ${req.params.userId} !` , 400))
    const user = await userModel.findById(req.params.userId)
    if(!user) return next(new Error (`User Not Exist For Id -> ${req.params.userId} !` , 404))
    if (req.params.userId !== req.decode.userId) return next(new Error(`Not Authorised !`, 403))  

    const cart = await cartModel.findOne({userId : req.params.userId}).populate("items.productId" , "title productImage price availableSizes")
    if(!cart)  return next(new Error (`Cart Not Found !` , 404))  
    return res.status(200).json(new sucResponse("Cart Found Successfully !" , cart)) 

})

// *************************************************** Delete Cart ***************************************************

export const deleteCart = catchAsync(async(req ,res ,next )=>{
    if(!isValidObjectId(req.params.userId)) return next(new Error (`InValid User-Id -> ${req.params.userId} !` , 400))
    const user = await userModel.findById(req.params.userId)
    if(!user) return next(new Error (`User Not Exist For Id -> ${req.params.userId} !` , 404))
    if (req.params.userId !== req.decode.userId) return next(new Error(`Not Authorised !`, 403))  

    const cart = await cartModel.findOne({userId : req.params.userId})
    if(!cart)  return next(new Error (`Cart Not Found !` , 404))  
    if(cart.totalItems == 0)   return next(new Error (`Cart Already Deleted !` , 400))  
    cart.items = []
    cart.totalPrice = 0
    cart.totalItems =  0
    cart.save()
    return res.status(204).send()
})


