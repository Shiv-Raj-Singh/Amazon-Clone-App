// if We Have Any Error then Error Should be Pass in this Class /or Make Instance of This Class 

export default class AppError extends Error{
    constructor(message , statusCode ){
        super(message)
        this.status = false
        this.message = message
        this.statusCode = statusCode
    }
}

// For Successful Response -

export class sucResponse {
    constructor(message , data ){
        this.status = true 
        this.message = message 
        this.data = data
    }
}