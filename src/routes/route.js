import {Router} from "express";
import { createProduct, getProductbyfilter, getProductById } from "../controller/productController.js";
import { getUser, login, registerUser, UpdateUser } from "../controller/userController.js";
import { authentication } from "../middleware/auth.js";
import AppError from "../validator/AppError.js";
import { getProducts } from "../validator/productValidation.js";
const router = Router()
export default router

                               //     For User APIs

router.post('/register' , registerUser)
router.post('/login' , login)
router.get('/user/:userId/profile' ,authentication, getUser)
router.put('/user/:userId/profile' ,authentication, UpdateUser)

                            //     For Product APIs

router.post('/products' , createProduct)
router.get('/products' , getProductbyfilter)
router.get('/products/:productId' , getProductById)






// for wrong url 

router.all('/*' , (req , res , next )=>{
    next(new AppError(`URL -> ${req.url} not found on Server !` , 404))
})