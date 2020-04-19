const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catalog'
});

connection.connect( error => {
    if(error){
        console.log(error);
    } else {
        console.log('connected to my sql');
    }
});

exports.connection = connection;
