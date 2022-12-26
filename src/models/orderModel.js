import { Schema , model } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: 'product',
            _id : 0
        },
        quantity: {
            type: Number,
            min: 1
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
        trim: true,
    },        
    totalItems: {
        type: Number,
        required: true,
        trim: true,
    },  
    totalQuantity : {
        type: Number,
        required: true,
        trim: true,
    },  
    cancellable : {
        type : Boolean ,
        default : true
    }   ,
    status : {
        type : String ,
        enum : ["pending", "completed", "cancled"],
        default : 'pending'
    } ,
    isDeleted : {
        type: Boolean,
        default : false
    },
    deletedAt : Date
}, { timestamps: true })
 
const orderModel =new model('Order', orderSchema)
export default orderModel

