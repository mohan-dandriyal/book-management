
import express from 'express'
import { CreateBook, DeleteBook, FindBook, UpdateBook } from '../controller/bookController.js'
import userAuth from '../auth/userAuth.js';

const book = express.Router()

book.post('/add_new_book', CreateBook)
book.get('/book/:author?/:book_title?', userAuth,  FindBook);
book.delete('/book/:id', DeleteBook);
book.put('/book/:id', UpdateBook);

export default book