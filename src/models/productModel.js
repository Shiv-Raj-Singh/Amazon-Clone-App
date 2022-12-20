import { model, Schema } from "mongoose"

    const productSchema = new Schema({
        title: {
            type: String,
            required: true,
            unique:true
        },
        description: {
            type: String,
            required: true,
    },
        price: {
            type: Number,
            required: true,
        },
        currencyId: {
            type: String,
            required: true,
        },
        currencyFormat: {
            type: String,
            required: true,
        },
        isFreeShipping: {
            type: Boolean,
            default : false
        },
        productImage : {
            type : String ,
            required : true 
        },
        style :  String ,
        availableSizes : {
            type : [String],
            enum : ["S", "XS","M","X", "L","XXL", "XL"] ,
        },
        installments : String,
        isDeleted : {
            type: Boolean,
            default : false
        },
        deletedAt : Date
    } ,
        { timestamps: true }
    );

    const productModel = new model('product' , productSchema)
    export default productModel