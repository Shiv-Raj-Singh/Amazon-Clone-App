import jwt from 'jsonwebtoken'
import catchAsync from '../controller/catchAsync.js'
import AppError from '../validator/AppError.js'

export const authentication = catchAsync((req,res,next)=>{
    const token1 = req.headers.authorization
    if(!token1) return next(new AppError('Token Mandatory in Header Bearer !' , 400))
    const token = token1.split(' ')[1]
    jwt.verify(token , process.env.SECRET_KEY , (err , decode)=>{
        if(err){
            if(err.message == "jwt expired") return next(new AppError('Token Expired !' , 400))
            return next(new AppError('Un-Authonticated Person !' , 401))
        }
        req.decode = decode
        next()
    })
})


