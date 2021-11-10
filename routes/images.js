const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload');


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

router.post ('/', upload.single('image'), async(req, res) => {
    const image = req.file.path;
    const data= req.body.data;
    console.log(data);
    res.json({ msg :' image successfully created'})
    
});


module.exports = router;

