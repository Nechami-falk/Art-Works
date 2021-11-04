const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const tokenAdmin = req.header('x-auth-token');
    if (!tokenAdmin) return res.status(401).send('Accgitess denied. No token provided.');
  
    try {
      const decoded = jwt.verify(tokenAdmin, config.get('adminKey'));
      req.user = decoded;
      next();
    }
    catch (ex) {
      res.status(400).send('Invalid token.');
    }
  }