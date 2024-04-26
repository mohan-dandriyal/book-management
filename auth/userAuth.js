
import JsonWebToken from "jsonwebtoken";
import { config } from 'dotenv'
config();

const SECURTYKEY = process.env.SECUERTY_KEY;

export default async function userAuth(req, res, next) {
    let tokan = req.headers.authorization

    if(tokan) {
       tokan = tokan.split(',')[1]

      await JsonWebToken.verify(tokan, SECURTYKEY, (err, vali) => {
        if(err) {
            res.status(402).json({
                message : "Enter Valid Tokan"
            })
        } else{
            next()
        }   
      })
     
    } else{
        res.status(402).json({
            message : "try agane letter"
        })
    }
}
