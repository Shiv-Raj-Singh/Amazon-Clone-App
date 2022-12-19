import joi from "joi";

export const userValidSchema = joi.object({
    fname: joi.string().required().trim().regex(/^[a-zA-Z]*$/).min(3).max(25),
    lname: joi.string().required().trim().regex(/^[a-zA-Z]*$/).min(3).max(25),
    phone: joi.string().required().trim().min(10).max(10).regex(/^[6-9]{1}[0-9]{9}$/),
    profileImage: joi.string().required().trim(),
    email: joi.string().required().trim().email(),
    password: joi.string().required().trim().min(8).max(15).regex(/^[a-zA-Z0-9]*$/),
    address: joi.object().required().keys({
        shipping: joi.object().required().keys({
            street: joi.string().required().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            city: joi.string().required().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            pincode: joi.string().required().trim().min(6).max(6).regex(/^[0-9]*$/)
        }),
        billing: joi.object().required().keys({
            street: joi.string().required().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            city: joi.string().required().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            pincode: joi.string().required().trim().min(6).max(6).regex(/^[0-9]*$/)
        }),
    })
})

export const loginSchema = joi.object({
    phone: joi.string().optional().trim().min(10).max(10).regex(/^[6-9]{1}[0-9]{9}$/),
    email: joi.string().optional().trim().email(),
    password: joi.string().required().trim().min(8).max(15).regex(/^[a-zA-Z0-9]*$/)
})

export const userUpdateSchema = joi.object({
    fname: joi.string().optional().trim().regex(/^[a-zA-Z]*$/).min(3).max(25),
    lname: joi.string().optional().trim().regex(/^[a-zA-Z]*$/).min(3).max(25),
    phone: joi.string().optional().trim().min(10).max(10).regex(/^[6-9]{1}[0-9]{9}$/),
    profileImage: joi.string().optional().trim(),
    email: joi.string().optional().trim().email(),
    password: joi.string().optional().trim().min(8).max(15).regex(/^[a-zA-Z0-9]*$/),
    address: joi.object().optional().keys({
        shipping: joi.object().optional().keys({
            street: joi.string().optional().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            city: joi.string().optional().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            pincode: joi.string().optional().trim().min(6).max(6).regex(/^[0-9]*$/)
        }),
        billing: joi.object().optional().keys({
            street: joi.string().optional().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            city: joi.string().optional().trim().regex(/^[a-zA-Z0-9( ,\)]*$/),
            pincode: joi.string().optional().trim().min(6).max(6).regex(/^[0-9]*$/)
        }),
    })
})