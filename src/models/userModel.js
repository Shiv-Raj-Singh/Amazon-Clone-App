import bcrypt from "bcrypt"
import { model, Schema } from "mongoose"

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
},
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        shipping: {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            }
        },

        billing: {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            }
        }
    }
},
    { timestamps: true }
);



userSchema.pre('save' ,async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 10)
        console.log(this.password)
        next()
    } 
})



const userModel = new model('user' , userSchema)
export default userModel