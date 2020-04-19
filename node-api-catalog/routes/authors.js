const express = require('express');
const router = express.Router();
const { connection } = require("../models/mysql");

router.get('/', (req,res) => {
    let sql = `SELECT * FROM authors WHERE status = 1;`;
     connection.query(sql, (err,data) =>{
        if(err){
       res.status(400).send(err);
        } else {
       res.status(200).send(data);
    }
   });
});

router.get('/:id', (req,res) => {
    let id = req.params.id;
    let sql = `SELECT a.*, b.name book FROM authors a 
    JOIN author_books ab ON ab.user_id = a.id
    JOIN books b ON b.id = ab.book_id
    WHERE a.id = ? AND b.status = 1 AND a.status = 1;`;
    connection.query(sql,[id], (err,data) => {
        if(err){
            res.status(400).send(err);
        } else {
            let author = JSON.stringify(data);
            res.status(200).send(author);
        }
    });
});

router.get('/search/:term', (req ,res) => {
    let searchVal =`%${req.params.term}%`;
    let sql = `SELECT * FROM authors WHERE first_name LIKE ? OR last_name LIKE ?`;
    connection.query(sql,[searchVal, searchVal], (err, data) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});


module.exports = router;