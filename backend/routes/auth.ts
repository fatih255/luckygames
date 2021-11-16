
import express from 'express'
import dotenv from 'dotenv'
import { getOneByEmail, getOneByPhone, createUserWithEmail, createUserWithPhone } from '../db/User'
import bcrypt from 'bcrypt'
import { validUser, generateAccessToken, validateToken } from '../functions'


dotenv.config();
const router = express.Router()

router.post('/signup', (req, res) => {

    let valid = validUser(req.body) // { signupType : email | phone , validate }
    if (valid.validate) {
        if (valid.signupType === 'email') {
            getOneByEmail(req.body.email)
                .then((user: object) => {
                    if (!user) {
                        //signup process
                        bcrypt.hash(req.body.password, 10)
                            .then((hash) => {
                                const userinfo = {
                                    email: req.body.email,
                                    password: hash
                                }
                                createUserWithEmail(userinfo)
                                    .then((id: number) => {
                                        res.json({
                                            id,
                                            message: 'Kayıt İşlemi Tamamlandı'
                                        });
                                    })
                            })
                    } else {
                        //error handling exist email
                        res.status(400).json({
                            message: 'Bu E-posta Kullanımda'
                        })
                    }
                })
        }
        if (valid.signupType === 'phone') {
            getOneByPhone(req.body.phone)
                .then((user: object) => {
                    if (!user) {
                        //signup process
                        bcrypt.hash(req.body.password, 10)
                            .then((hash) => {
                                const userinfo = {
                                    email: req.body.email,
                                    password: hash
                                }
                                createUserWithPhone(userinfo)
                                    .then((id: number) => {
                                        res.json({
                                            id,
                                            message: 'Kayıt İşlemi Tamamlandı'
                                        });
                                    })
                            })
                    } else {
                        //error handling exist phone
                        res.status(400).send('Bu Telefon Kullanımda')
                    }
                })
        }
    } else {
        res.status(500).send('Eksik Bİlgi Girdiniz')
    }
});

router.post('/signin', (req, res) => {

    let valid = validUser(req.body) // { signupType : email | phone , validate }
    if (valid.signupType === 'email') {
        getOneByEmail(req.body.email)
            .then((user: { id: number, email: string | null, password: string, phone: string | null, balance: number | 0 }) => {
                if (user) {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(function (result) {
                            //if the passwords matched
                            if (result) {
                                //generate token with user info
                                const token = generateAccessToken({ id: user.id, email: user.email, phone: user.phone, balance: user.balance });
                                //setting the 'set-cookie'
                                const isSecure = req.app.get('env') != 'development';

                                res
                                    .cookie('token', process.env.JWT_TOKEN_HEAD + ' ' + token, {
                                        httpOnly: true, //Flags the cookie to be accessible only by the web server.
                                        secure: isSecure, //Marks the cookie to be used with HTTPS only.
                                        signed: true //Indicates if the cookie should be signed.
                                    })
                                    .cookie('UserLoggedIn', true)
                                    .status(200).json({
                                        user: {
                                            id: user.id,
                                            email: user.email,
                                            phone: user.phone,
                                            balance: user.balance
                                        },
                                        message: 'Giriş Yapıldı'
                                    });
                            } else {
                                //if password not correct
                                res.status(403).send('Yanlış Şifre Girdiniz')
                            }
                        })

                } else {
                    //not have account
                    res.status(403).send('Bu Epostaya Ait Kayıtlı Bir Hesap Bulunamadı')
                }
            })
    }
    if (valid.signupType === 'phone') {
        getOneByPhone(req.body.phone)
            .then((user: { id: number, email: string | null, password: string, phone: string | null, balance: number | 0 }) => {
                if (user) {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(function (result) {
                            //if the passwords matched
                            if (result) {
                                const token = generateAccessToken({ id: user.id, email: user.email, phone: user.phone, balance: user.balance });
                                const isSecure = req.app.get('env') != 'development';
                                res
                                    .cookie('token', process.env.JWT_TOKEN_HEAD + ' ' + token, {
                                        httpOnly: true, //Flags the cookie to be accessible only by the web server.
                                        secure: isSecure, //Marks the cookie to be used with HTTPS only.
                                        signed: true //Indicates if the cookie should be signed.
                                    })
                                    .cookie('UserLoggedIn', true)
                                    .status(200).json({
                                        user: {
                                            id: user.id,
                                            email: user.email,
                                            phone: user.phone,
                                            balance: user.balance
                                        },
                                        message: 'Giriş Yapıldı'
                                    });
                            } else {
                                //if password not correct
                                res.status(403).send('Yanlış Şifre Girdiniz')
                            }
                        })

                } else {
                    //not have account
                    res.status(403).send('Bu Telefon Numarasına Ait Kayıtlı Bir Hesap Bulunamadı')
                }
            })
    }
});


router.post('/check', (req, res) => {
    const userLoggedIn = validateToken(req.signedCookies.token, true);
    if (typeof userLoggedIn === 'object') {

        return res
            .cookie('UserLoggedIn', true)
            .status(200).json(userLoggedIn)
    } else {
        if (userLoggedIn) {
            return res.status(200).send('User Have')
        } else {
            return res.status(401).clearCookie("UserLoggedIn").clearCookie("token").send('Havent User')
        }

    }



})


export default router