const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlenght:2,
        maxlenght:255
    },
    tags:{
        type:String
    },
    description:{
        type:String,
        minlenght:2,
        maxlenght:500
    },
    age:{
        type:String,
    },
    price:{
        type:Number,
        required: true,
        minlenght:2,
        maxlenght:255
    },
    catalogNumber:{
        type:Number,
        required: true,
        minlenght:1,
        maxlenght:10000000,
        unique: true
    },
    sale:{
        type:Number,
        minlenght:1,
        maxlenght:10000000
    },
    category:{
        type:String,
        minlenght:1,
        maxlenght:100,
        required: true,
    },
    image:{
        type:String
    },
     createdAt:{
        type:Date, default :Date.now
    }
    
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product){
    const schema = Joi.object({
        name:Joi.string().min(2).max(200).required(),
        description: Joi.string().min(2).max(500),
        price: Joi.number().min(1).max(1000000).required(),
        image: Joi.string().min(11).max(1000),
        sale: Joi.number().min(1).max(1000000),
        category:Joi.string().min(1).max(100),
        age:Joi.string(),
        tags:Joi.string(),
        catalogNumber: Joi.number().min(1).max(10000000).required()

    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;



