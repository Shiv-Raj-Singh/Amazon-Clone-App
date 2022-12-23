import joi from 'joi'

export const productValidSchema = joi.object({
    title: joi.string().required().lowercase().trim().regex(/^[a-zA-Z(, \)]*$/).min(3).max(25),
    description: joi.string().required().trim().regex(/^[a-zA-Z(, \)]*$/).min(3).max(100),
    price: joi.number().required().min(0),
    currencyId: joi.string().required().uppercase().trim().regex(/^[INR]*$/i).messages({"string.pattern.base" : `CurrencyId Should be Indian`}),
    currencyFormat: joi.string().required().trim().regex(/^[₹]*$/),
    isFreeShipping: joi.boolean().optional(),
    productImage : joi.string(),
    style: joi.string().optional() ,
    availableSizes : joi.array().items(joi.string().optional().uppercase().valid("S","XS","M","X", "L","XXL", "XL")) ,
    installments : joi.string().optional() ,
    isDeleted : joi.boolean().optional(),
    deletedAt : joi.string().optional().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])*$/ ).messages({"string.pattern.base" : `Date Should be like this-> YYYY-MM-DD`})
})

export const getProducts = joi.object({
    name : joi.string().optional().lowercase().trim().regex(/^[a-zA-Z(, \)]*$/).min(3).max(25),
    size : joi.string().optional().uppercase().valid("S", "XS","M","X", "L","XXL", "XL"),
    priceGreaterThan : joi.number().optional(),
    priceLessThan :joi.number().optional()
})

export const productUpadateValidation = joi.object({
    title: joi.string().optional().lowercase().trim().regex(/^[a-zA-Z(, \)]*$/).min(3).max(25),
    description: joi.string().optional().trim().regex(/^[a-zA-Z(, \)]*$/).min(3).max(100),
    price: joi.number().optional().min(0),
    currencyId: joi.string().optional().uppercase().trim().regex(/^[INR]*$/i) ,
    currencyFormat: joi.string().optional().trim().regex(/^[₹]*$/),
    isFreeShipping: joi.boolean().optional(),
    productImage : joi.string(),
    style: joi.string().optional() ,
    availableSizes : joi.array().items(joi.string().uppercase().valid("S","XS","M","X", "L","XXL", "XL")).optional() ,
    installments : joi.string().optional() ,
    isDeleted : joi.boolean().optional(),
    deletedAt : joi.string().optional().regex(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])*$/ ).messages({"string.pattern.base" : `Date Should be like this-> YYYY-MM-DD`})
})