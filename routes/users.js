const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middleware/auth');
const { Product} = require('../models/product');

//get shopping cart 
const getCart= async (cartArry) => {
    const shopCart = await Cart.find({"":{ $in: cartArry}});
    return shopCart;
} 

router.get('/shopCart',auth, async(req, res)=>{
    if( ! req.query.category) res.status(400).send('אין מוצרים מתאימים לחיפוש');
    let data = {};
    data.shopCart = req.query.category.split(",");

    const shopCart = await getCart(data.shopCart);
    res.send(shopCart);
});
    

//get details of user
router.get('/me', auth, async (req, res) => {
    const user = User.findOne(req.user_id).select('-password');
    res.send(user);
})

//sigupmanager
router.post('/admin', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(400).send('משתמש רשום');
    
    user = new User (req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'last', 'email', 'manager']));

    });



//signup
router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(400).send('משתמש רשום');
    
    
    user = new User (req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'last', 'email','manager']));

});




module.exports = router;