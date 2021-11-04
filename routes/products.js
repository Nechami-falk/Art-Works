const express = require('express');
const router = express.Router();
const { Product, validateProduct } = require('../models/product');
const _ = require('lodash');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


    

router.get('/', async (req, res)=>{
    try{
    const products = await Product.find({category:req.query.category});
    if ( ! products ) return res.status(500).send('אין מוצרים');
    res.send(products);
    }
    catch(ex){
        console.log('error get product:', ex.massege);
        res.status(500).send();
    }
});


router.get('/search', async (req, res)=> {
    let searchTags = req.query.search;
        try{
            const searchProduct = await Product.find({"tags":new RegExp(searchTags)});
            if ( ! searchProduct ) return res.status(500).send('אין מוצרים תואמים לחיפוש');
            res.send(searchProduct)
        }
        catch(ex){
            res.status(500).send();
        }
}) ;


router.get('/:id', authAdmin, async (req, res) => {
    const product = await Product.findOne({_id:req.params.id});
    if( ! product ) return res.status(404).send('מוצר לא קיים');

    res.send(product);
});


router.delete('/:id', authAdmin, async(req, res)=>{
    const product = await Product.findOneAndRemove({_id:req.params.id });
    if ( ! product ) return res.status(404).send('מוצר לא קיים במערכת');
    res.send (product);
}); 



router.put('/:id', authAdmin, async (req, res) => {
    const { error} = validateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let product = await Product.findOneAndUpdate({_id: req.params.id}, req.body)
    if( ! product) return res.status(404).send('מוצר  לא  קיים');

    res.send(product);
});


router.post('/', authAdmin, async(req,res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{

    let prod = await Product.findOne({ catalogNumber: req.body.catalogNumber});
    if (prod) return res.status(409).send();
    let product = new Product(
        {
            name:req.body.name,
            tags: req.body.tags,
            description: req.body.description,
            price: req.body.price,
            catalogNumber: req.body.catalogNumber,
            sale: req.body.sale,
            age: req.body.age,
            category: req.body.category,
            image:req.body.image
        });
    await product.save();
    res.send(product);
    }
    catch(e){
        console.log('error save product:', e);
        res.status(500).send(e.massege);
    }
});



module.exports = router;