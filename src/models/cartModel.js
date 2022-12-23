import { Schema , model } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const cartSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true,
        trim: true,
        unique: true
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
}, { timestamps: true })
 
const cartModel =new model('Cart', cartSchema)
export default cartModel