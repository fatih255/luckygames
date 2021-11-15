
import express from 'express'
import dotenv from 'dotenv'
import { getOne } from '../db/User';

dotenv.config();
const router = express.Router()

router.get('/info/:id', (req, res) => {

    if (req.params && req.params.id && typeof req.params.id === "string") {
        let userID = Number(req.params.id);
        getOne(userID, false)
            .then((user: object) => {
                if (user) {
                    res.status(200).json({
                        ...user
                    })
                }
            }).catch((error: any) => {
                res.status(404).json({
                    message: '✔ Kullanıcı Bulunamadı'
                })
            })


    } else {
        res.status(404).json({
            message: '✔ Invalid User Params'
        })
    }



})


export default router