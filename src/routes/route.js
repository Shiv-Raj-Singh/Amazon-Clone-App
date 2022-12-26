import {Router} from "express";
import { createProduct, deleteProduct, getProductbyfilter, getProductById, updateProduct } from "../controller/productController.js";
import { getUser, login, registerUser, UpdateUser } from "../controller/userController.js";
import  {createCart, deleteCart, getCart, updateCart}  from "../controller/cartController.js"
import { authentication } from "../middleware/auth.js";
import AppError from "../validator/AppError.js";
import { createOrder, updateOrder } from "../controller/orderController.js";
const router = Router()
export default router

// *******************************************  For User APIs *******************************************

router.post('/register' , registerUser)
router.post('/login' , login)
router.get('/user/:userId/profile' ,authentication, getUser)
router.put('/user/:userId/profile' ,authentication, UpdateUser)

// ******************************************  For Product APIs ********************************************

router.post('/products' , createProduct)
router.get('/products' , getProductbyfilter)
router.get('/products/:productId' , getProductById)
router.put('/products/:productId' , updateProduct)
router.delete('/products/:productId' , deleteProduct)

// *******************************************   For Cart APIs   *********************************************

router.post('/users/:userId/cart' , authentication , createCart)
router.put('/users/:userId/cart' , authentication , updateCart)
router.get('/users/:userId/cart' , authentication , getCart)
router.delete('/users/:userId/cart' , authentication , deleteCart)

// *******************************************   For Order APIs    ****************************************

router.post('/users/:userId/order' , authentication , createOrder)
router.put('/users/:userId/order' , authentication , updateOrder)

// for wrong url 

router.all('/*' , (req , res , next )=>{
    next(new AppError(`URL -> ${req.url} not found on Server !` , 404))
})