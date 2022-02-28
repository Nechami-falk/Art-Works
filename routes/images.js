const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload');
const { Product, validateProduct } = require('../models/product');
const authAdmin = require('../middleware/authAdmin');

router.get('/', (req, res)=> {
    
    const uploadsDirectory = path.join('uploads');
    fs.readdir(uploadsDirectory, (err, files)=>{
        if(err){
            return res.json( { msg:err})
        }
        if(files.length === 0 ){ 
            return res.json( { msg: 'No Images Uploaded!'})
        }
        return res.json({ files})
    })
});

router.post ('/', authAdmin, upload.single('image'), async(req, res) => {
    console.log("hi");
    
    const data = JSON.parse(req.body.data);
    console.log('data', data);
    /* const image = req.file.path; */
    console.log(data.name);
    
    const { error } = validateProduct(data);
    if (error) return res.status(400).send(error.details[0].message);
    console.log("e", error);
    console.log(data.catalogNumber);
    
    try{
    let prod = await Product.findOne({ catalogNumber: data.catalogNumber});
    if (prod) return res.status(409).send();
    console.log("r", req.body.name);
        let product = new Product(
        {
            name:data.name,
            tags:data.tags,
            description:data.description,
            price:data.price,
            catalogNumber:data.catalogNumber,
            sale:data.sale,
            age:data.age,
            category:data.category,
           
        });
    await product.save();
    res.send(product);
    console.log("success");
    }
    catch(e){
        res.status(500).send();
    }

    
    
});


module.exports = router;

