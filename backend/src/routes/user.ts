
import express from 'express'
import dotenv from 'dotenv'
import { getOne, updateUser } from '../db/User';
import { getAllGameRooms, getOneById } from '../db/Game';

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

router.get('/get-all-active-game-rooms', (req, res) => {
    getAllGameRooms(true)
        .then((rooms: []) => {
            res.json([...rooms])
        })
})


router.get('/getgameinfo/:id', (req, res) => {
    getOneById(Number(req.params.id))
        .then((info: object) => {
            res.json({ ...info })
        }).catch((err: object) => {
            res.status(404).send(err)
        })
})

router.post('/addgamecoin', (req, res) => {
    const { userid, amount } = req.body
    getOne(Number(userid))
        .then(async ({ balance }) => {
            //Payment Process Papara or iyzico or paytr -
            if (await updateUser(userid, { balance: balance + Number(amount) })) {
                res.status(200).json({ message: 'Oyun Parası Başarıyla Yüklendi', currentBalance: balance + Number(amount) })
            } else {
                res.status(400).json({ message: 'Oyun Parası Yüklenirken Bir Sorun Oluştu', currentBalance: balance })
            }
        }).catch((err: any) => {
            res.status(404).json({ message: err.message })
        })


})



export default router