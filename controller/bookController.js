import { BookModel } from "../module/bookModule.js";


// create the book 
export const CreateBook = async (req, res) => {

    const { publication_year, author, book_title } = req.body;

    try {

        const newBook = new BookModel({
            book_title: book_title,
            author: author,
            publication_year: publication_year
        })

        const findBook = await BookModel.find({ $and: [{ author: author }, { book_title: book_title }] })

        if (findBook.length > 0) {
            return res.status(401).json({
                message: "Book is Alredy Add "
            })
        } else {
            await newBook.save()
            return res.status(201).json({
                message: "book is created",
                book: newBook
            })
        }


    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}

// featch the data  in all books 
export const FindBook = async (req, res) => {
    let { author, book_title } = req.params
    try {

        let findBook = ""
        if (author) {
            findBook = await BookModel.find({ author: author })
        } else if (book_title) {
            findBook = await BookModel.find({ book_title: book_title })
        } else {
            findBook = await BookModel.find({})
        }

        res.status(200).json({
            message: "find book",
            books: findBook
        })

    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}

export const UpdateBook = async (req, res) => {
    const id = req.params.id;
    const { publication_year, author, book_title } = req.body;

    try {

        const updateBook = ({
            book_title: book_title,
            author: author,
            publication_year: publication_year
        })

        const updateBooks = await BookModel.findByIdAndUpdate(id, updateBook )
        console.log(updateBook);

            return res.status(200).json({
                message: "book is updeted",
                book: updateBooks
            })

    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}

 export const DeleteBook = async(req, res) => {
    const id = req.params.id

    try {
            let findandDelete = await BookModel.findByIdAndDelete({_id : id})
        res.status(200).json({
            message: "book record is remove",
            books: findandDelete
        })

    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}