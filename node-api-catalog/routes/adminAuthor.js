const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validAuthor = require('../models/author');
const { connection } = require("../models/mysql");

router.post("/", auth, (req, res)=>{

    const { error } =  validAuthor(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {  first_name, last_name, email, phone } = req.body;
    
    let sql = `INSERT INTO authors VALUES("", ?, ?, ?, ?, 1, NOW(), NOW());`;
    connection.query(sql, [first_name, last_name, email, phone ] , (err) => {
        if(err){
            res.status(400).send("author Last Name is already in use!");
        } else {
         res.status(200).send('Author has been saved!');
        };
    });
});

router.delete("/:id", auth , (req,res) => {
    let id = req.params.id;
    let sqlBooks = `DELETE FROM books WHERE books.id IN(SELECT book_id FROM author_books WHERE user_id = ?);`;
    connection.query(sqlBooks, [id], (err) => {
        if(err) res.status(400).send(err);
    });

    let sqlAuthor = `DELETE FROM authors WHERE id = ?;`;
    connection.query(sqlAuthor,[id], (err) => {
        if(err) res.status(400).send(err);
    });

    let sql = "COMMIT;";
    connection.query(sql, (err) => {
        if(err){
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send('Author has been deleted!');
        }
    });
});


router.patch("/:id", auth, (req,res) => {
    
    let id = req.params.id;
    const { error } = validAuthor(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let sqlCheck = `SELECT * FROM authors WHERE id = ?;`;
    connection.query(sqlCheck, [id], (err, data) => {
        if(err){
           res.status(400).send(err);
        } else {
            if(!data[0]) return res.status(400).send('No such Author!');
        }
    });

    const { first_name, last_name, email, phone  } =  req.body;

    let sqlUpdate = `UPDATE authors 
    SET first_name = ?, last_name = ?, email = ?,phone = ?, updated_at = NOW() 
    WHERE id = ?;`;
    connection.query(sqlUpdate, [ first_name, last_name, email, phone, id ], (err, data) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send('Author has been Updated!');
        }
    });
});




module.exports = router;