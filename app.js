const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose =require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const products= require('./routes/products');
const images = require('./routes/images');
const cors = require('cors');
const path = require('path');


mongoose.connect('mongodb://localhost/tahasuka_rest_api')
.then(() => console.log('Connected to MongoDB...'));

app.use(cors());
app.use( express.json());
app.use('/uploads/action', express.static(path.join(__dirname, 'uploads/action')));


app.use(express.static('uploads'))
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/products',products)
app.use('/api/images', images)

const port = 8181;
http.listen(port, () => console.log(`Listening on port ${port}...`));

