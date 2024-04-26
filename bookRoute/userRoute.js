
import Express from 'express'
import { CreateUser, LoginUser, findAllUser } from '../controller/userController.js'

const user = Express.Router()

user.post('/user', CreateUser) // create new user
user.get('/user/:id?', findAllUser) // find the user 

user.post('/login', LoginUser) //login user

export default user