import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv'


type authToken = {
    id: number
    role: string
    email: string
    iat: number
    exp: number
}


function requireAdmin(req: Request, res: Response, next: NextFunction) {

    if (req.signedCookies.token) {
        const token = req.signedCookies.token?.split(' ')[1] || ''
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as authToken;

        if (decodedToken.role !== 'admin') {
            return res
                .status(401)
                .json({
                    message: 'You Are Not Admin'
                })
        }
    }
    return next();
}
function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
    //console.log(req.signedCookies)
    dotenv.config();

    if (req.signedCookies.token) {
        //TODO verify token from server side
        const token = req.signedCookies.token?.split(' ')[1] || ''

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as authToken;



        //not expired token time
        if (decodedToken.exp * 1000 > new Date().getTime()) {
            return next()
        } else {
            return res
                .status(401)
                .json({
                    message: 'Un-Authorized'
                })
        }
    } else {
        res
            .status(401)
            .json({
                message: 'Un-Authorized'
            })
    }
}


export { ensureLoggedIn, requireAdmin }