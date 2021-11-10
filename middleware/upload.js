const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function( req, file, cb){
        cb(null, 'uploads');
    }, 
    filename: function( req, file, cb ){
         const price = req.body.price;
        cb (null, price);
    }
});

const upload = multer({ storage});
module.exports = upload;

