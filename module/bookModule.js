
import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    book_title : { type : String, require : true},
    author :  { type : String, require : true},
    publication_year :  { type : String, require : true},
},{
    timetimestamps : true
}
)

export const BookModel = mongoose.model('Books', BookSchema);

