const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { connection } = require("../models/mysql");

router.post("/", (req,res) => {

    const { error } = validateAdmin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let sql = 'SELECT * FROM admins WHERE email = ? AND password = ?;';
    connection.query(sql, [req.body.email, req.body.password] , (err,data) => {
        if(err){
            res.status(400).send('Invalid email or password');
        } else {
         if(!data[0]) return res.status(400).send('no such admin');
         const { id , email } = data[0]
         res.json({ token: createToken(id, email)});
       }
   });
    
});

  function createToken(id, email){
    let token = jwt.sign({id: id, email: email }, config.get('jwtKey'));
    return token;
   };

  function validateAdmin(admin){

    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(4).max(1024).required()
    });

    return schema.validate(admin);

}

module.exports = router;