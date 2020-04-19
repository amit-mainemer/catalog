const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = (req, res, next) => {

    console.log('enter auth middle ware');
    

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied!');

    try{

        const decoded = jwt.verify(token, config.get('jwtKey'));
        req.admin = decoded;
        next();

    } catch (err){

        res.status(400).send('invalid token');

    }


};