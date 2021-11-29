import express from 'express'
import dotenv from 'dotenv'
import { getOne as getUserById, updateUser } from '../db/User';
import { getOneById as getRoomById } from '../db/Game';


dotenv.config();

const router = express.Router()



router.post('/join', async (req, res) => {

    const { userid, roomid } = req.body

    //get user balance
    const userBalance = await getUserById(userid, false)
        .then((user: any) => {
            return user.balance
        })

    //get room participation_fee
    const roomParticipationFee = await getRoomById(roomid).then((room: any) => {
        return room.participation_fee
    })

    //insufficient balance to join room.
    if (userBalance - roomParticipationFee < 0) {
        res
            .status(400)
            .json({
                roomid: roomid,
                message: 'Oyuna Katılmak İçin Yeterli Bakiyeniz Yok'
            })
    } else {
        if (await updateUser(userid, { balance: userBalance - roomParticipationFee })) {
            res.status(200).json({
                roomid: roomid,
                message: 'Oyuna Katılabilir',
                AvailableBalance: userBalance - roomParticipationFee
            })
        } else {
            res.status(400).json({
                roomid: roomid,
                message: 'Oyuna Katılmak İçin Yeterli Bakiyeniz Yok',
                AvailableBalance: null
            })
        }


    }
})
export default router