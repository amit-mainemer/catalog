const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validBook = require('../models/book');
const Joi = require('@hapi/joi');
const { connection } = require("../models/mysql");

router.post("/", auth, (req, res)=>{
    const { error } =  validBook(req.body);
    if(error) return res.status(400).send(error.details[0].message);
 
    const { authorId } = req.body;

    let sqlAuthor = `SELECT id FROM authors WHERE id = ?`;
    connection.query(sqlAuthor, [ authorId ], (err, data) => {
    if(err){
        res.status(400).send(err);
    } else {   
    if(!data[0]) return res.status(400).send('No such author!');
    insertBook(data[0].id);
    };
    });
    
    function insertBook(id){
        const { name, book_image, description } = req.body;
        let authorId = id;
        let sqlBooks = `INSERT INTO books VALUES('', ?, ?, ?, 1, NOW(), NOW());`
        connection.query(sqlBooks, [name, book_image, description] , (err,data) => {
          if(err){
             res.status(400).send(err);
            } else {
            setKeys(data.insertId, authorId)
            } 
        });
   

    function setKeys(bookId, authorId){
        let sqlKeys = `INSERT INTO author_books (id, user_id, book_id) VALUES (NULL, ${authorId}, ${bookId})`;
        connection.query(sqlKeys, (err) =>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send('book has been saved');
        };
    });
    };
   }
});


router.delete("/:id", auth ,(req,res) => {
    let id = req.params.id;
    let sql = `UPDATE books SET status = 0 WHERE id = ?;`;
    connection.query(sql, [id], (err) => {
        if(err){
            res.status(404).send(err);
        } else {
            res.status(200).send('book has been Deleted!');
        };
    });
});

router.patch("/:id", auth, (req, res) => {

    let id = req.params.id;
    const { error } = validUpdate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let sqlCheck = `SELECT * FROM books WHERE id = ?;`;
    connection.query(sqlCheck, [id], (err, data) => {
        if(err){
           res.status(400).send(err);
        } else {
            if(!data[0]) return res.status(400).send('No such book!');
        }
    });

    const { name, book_image, description } =  req.body;

    let sqlUpdate = `UPDATE books 
    SET name = ?, book_image = ?, description = ?, updated_at = NOW() 
    WHERE id = ?;`;
    connection.query(sqlUpdate, [ name, book_image, description, id ], (err) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send('book has been Updated!');
        };
    });
})

function validUpdate( book ){

    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        book_image: Joi.string().min(6).max(1024).required(),
        description: Joi.string().min(6).max(1024).required()
      });
     
      return schema.validate(book);
}

module.exports = router;