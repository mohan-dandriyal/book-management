
import { UserModule } from "../module/userModule.js";
import { userValid } from "../validetion/userValidetion.js";
import Joi from "joi";

import JsonWebToken from "jsonwebtoken";
import bcrypt from 'bcrypt'

import { config } from 'dotenv'
config();

const SECURTYKEY = process.env.SECUERTY_KEY;
const SALT_FACTOR = parseInt(process.env.SALT_FACTOR)

export const CreateUser = async (req, res) => {
    const { name, email, password, contact_no } = req.body;
    console.log(password);
    try {
        await userValid.validateAsync(req.body);
        const finduser = await UserModule.findOne({ email: email })
        const findContact = await UserModule.findOne({ contact_no: contact_no })

        const newUser = new UserModule({
            name: name,
            contact_no: contact_no,
            email: email,
            password: password
        })

        if (finduser) {
            return res.status(402).json({
                message: "user is alredy exits"
            })
        }

        if (findContact) {
            return res.status(402).json({
                message: "Contact Number is Alredy Exit"
            })
        }

        const hashPass = await bcrypt.hash(password, SALT_FACTOR)
        newUser.password = hashPass

        await newUser.save()
        res.status(201).json({
            message: "ok",
            user: newUser
        })

    }
    catch (err) {
        if (err instanceof Joi.ValidationError) {
            res.status(402).json({
                message: err.message
            })
        } else {
            res.status(403).json({
                message: err.message
            })
        }
    }
}

// find the all user 
export const findAllUser = async (req, res) => {
    const id = req.params.id
    try {
        let finduser = "";

        if (id) {
            finduser = await UserModule.findOne({ _id: id });
        } else {
            finduser = await UserModule.find({});
        }

        res.status(200).json({
            message: "find all user",
            data: finduser
        })
    }
    catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

export const LoginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const find = await UserModule.findOne({ $or: [{ email: email }, { contact_no: email }] })
        console.log(find);
        if (find) {
            // let findPass = find.password === password;

            let findPass = await bcrypt.compareSync(password, find.password)
            console.log(findPass);

            if (findPass) {
                let token = await JsonWebToken.sign(req.body, SECURTYKEY)
                res.status(201).json({
                    message: "login successfull",
                    token: token
                })
            } else {
                res.status(401).json({
                    message: "Invalid Password"
                })
            }
        } else {
            res.status(401).json({
                message: "Invalid Username & Email"
            })
        }
    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}