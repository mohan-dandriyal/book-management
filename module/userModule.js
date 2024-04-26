
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name : { type : String, require : true},
    contact_no : { type : String, require : true},
    email : { type : String, require : true},
    password : { type : String, require : true}
},{
    timestamps: true
}
)

export const UserModule = mongoose.model('User', UserSchema)


