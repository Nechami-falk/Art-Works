const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');



//get token
router.post('/', async (req, res) => {

    const { error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

    let user = await User.findOne({ email: req.body.email});
    if ( ! user ) return res.status(400).send('אימייל או הסיסמא אינם נכונים');

    const validaPassword = await bcrypt.compare(req.body.password, user.password);
    if (! validaPassword ) return res.status(400).send('אימייל או סיסמא אינם נכונים');

    
    res.json({token: user.generateAuthToken()}); 
});

//token to admin
router.post('/admin', async (req, res) => {

    const { error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

    let user = await User.findOne({ email: req.body.email});
    if ( ! user ) return res.status(400).send('אימייל או הסיסמא אינם נכונים');

    const validaPassword = await bcrypt.compare(req.body.password, user.password);
    if (! validaPassword ) return res.status(400).send('אימייל או סיסמא אינם נכונים');

    
    res.json({tokenAdmin: user.generateAuthTokenAdmin()}); 
});




function validate(req) {

    const schema = Joi.object({
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(1024).required()
    });
  
    return schema.validate(req);
  }



module.exports = router;