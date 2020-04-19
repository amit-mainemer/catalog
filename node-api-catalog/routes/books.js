const express = require('express');
const router = express.Router();
const { connection } = require("../models/mysql");

router.get('/', (req,res) => {
    const page = req.query.page - 1;
    let skip = 9;
    if(page === 0){
     skip = 0;
    }else{
     skip = skip * page;
    };
    let sql = `SELECT b.*, a.first_name, a.last_name
    FROM books b
    LEFT JOIN author_books ab 
    ON ab.book_id = b.id 
    LEFT JOIN authors a 
    ON a.id = ab.user_id 
    WHERE b.status = 1 
    LIMIT ?,9;`;
    connection.query(sql, [skip], (err,data) =>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
    };
   });
});


router.get('/:id', (req,res) => {
    let id = req.params.id;
    let sql = `SELECT  b.*, a.first_name, a.last_name  
               FROM books b 
               JOIN author_books ab ON ab.book_id = b.id 
               JOIN authors a ON a.id = ab.user_id  
               WHERE b.id = ?;`;
        connection.query( sql, [id],  (err, data) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        };
    });
});

router.get('/search/:term', (req ,res) => {
    let searchVal =`%${req.params.term}%`;
    let sql = `SELECT b.*, a.first_name, a.last_name FROM books b 
    LEFT JOIN author_books ab ON b.id = ab.book_id
    LEFT JOIN authors a ON ab.user_id = a.id 
    WHERE b.name LIKE ? AND b.status = 1;`;
    connection.query(sql,[searchVal], (err, data) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

module.exports = router;