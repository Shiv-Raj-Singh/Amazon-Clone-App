const globalError = (err , req , res , next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"
    
    if(err.isJoi == true){
        err.statusCode = 400
        err.message = err.message
        const [details] = err.details
        if(details.type =='string.pattern.base'){
            err.message =  `${details.path} Should be Valid !`
        }
    }
    if(err.code == 11000){
        err.statusCode = 400
        const values = Object.keys(err.keyValue)
        err.message = `Duplicate Key Error For ${values[0]} !`  
    }

    res.status(err.statusCode).json({
        status : false,
        message : err.message
    })
}


export default globalError