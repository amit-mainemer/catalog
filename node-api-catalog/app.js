const express = require('express');
const app = express();
const http = require('http').Server(app);
const books = require('./routes/books');
const authors = require('./routes/authors');
const auth = require('./routes/auth');
const adminAuthor = require('./routes/adminAuthor');
const adminBook = require('./routes/adminBook');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/auth/admin', auth);
app.use('/books', books);
app.use('/authors', authors);
app.use('/admin/author', adminAuthor);
app.use('/admin/book', adminBook);

 
const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
