const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose =require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const products= require('./routes/products');
const cors = require('cors');
 
mongoose.connect('mongodb://localhost/tahasuka_rest_api')
.then(() => console.log('Connected to MongoDB...'));

app.use(cors());
app.use( express.json());
app.use(express.static('public'));

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/products',products)


const port = 8181;
http.listen(port, () => console.log(`Listening on port ${port}...`));

