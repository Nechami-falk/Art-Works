const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const PasswordComplexity = require("joi-password-complexity");




const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:2,
        maxlength:255
    },
    email:{
        type:String,
        required: true,
        minlength:6,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        min: 8,
        max: 250,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        },
    phone:{
        type:String,
        minlength:2,
        maxlength:10,
        required:true
    },
    last:{
        type:String,
        minlength:2,
        maxlength:255,
        required:true
    },
    createAt:{ 
        type:Date,
        default:Date.now
     },
    admin:{
         type:Boolean,
         required: true
     },
    adress:{
         type:String
     }
});

userSchema.methods.generateAuthTokenAdmin = function(){
    const tokenAdmin = jwt.sign({_id: this._id, admin:this.admin }, config.get('adminKey'));
    return tokenAdmin;
}


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id }, config.get('jwtKey'));
    return token;
    
}


const User = mongoose.model( 'User', userSchema );

function validateUser(user){

    const schema = Joi.object({
        name:Joi.string().min(2).max(255).required(),
        last:Joi.string().min(2).max(255).required(),
        email: Joi.string().min(2).max(255).email().required(),
        password: new PasswordComplexity({min:8 ,max:25, lowerCase: 1, upperCase: 1, numeric: 1,}),
        phone: Joi.string().min(2).max(10).required(),
        adress: Joi.string().min(2).max(255),
        admin:Joi.boolean().required()
    });

    return schema.validate(user);
}

function validateShoppingCart(data){
    constSchema = joi.project({
        cart:Joi.array().min(1).required(),
    });
}
exports.User = User;
exports.validate = validateUser;
exports.validateShoppingCart = validateShoppingCart;




