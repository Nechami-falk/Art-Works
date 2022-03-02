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
        const data = JSON.parse(req.body.data)
        cb (null, data.catalogNumber + '.png');
    }
});

const upload = multer({ storage});
module.exports = upload;

