import {Router} from "express";
import { getUser, login, registerUser, UpdateUser } from "../controller/userController.js";
import { authentication } from "../middleware/auth.js";
import AppError from "../validator/AppError.js";
const router = Router()
export default router

// for wrong url 

router.post('/register' , registerUser)
router.post('/login' , login)
router.get('/user/:userId/profile' ,authentication, getUser)
router.put('/user/:userId/profile' ,authentication, UpdateUser)











router.all('/*' , (req , res , next )=>{
    next(new AppError(`URL -> ${req.url} not found on Server !` , 404))
})