
import express  from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import book from './bookRoute/bookRoute.js'
import user from './bookRoute/userRoute.js'
config()

const app = express()
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json({ extended : true }))
app.use(cors())


// create a coustum route 
app.use('/api/v1', user)
app.use('/api/v1', book)


// connection to the database 
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
.then(() => console.log("db is conected"))
.catch(() => console.log("db connection is faild") )

// create a server 
const PORT = process.env.PORT || 4000
app.listen(PORT, function() {
    console.log("server is listen Port", PORT);
})
