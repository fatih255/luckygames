
import express from 'express'
import dotenv from 'dotenv'
import { createGameRoom, deleteGameRoom, getAllGameRooms, updateGameRoom, updateGameRoomStatus } from '../db/Game';

dotenv.config();
const router = express.Router()

interface room {
    user_total: number,
    participation_fee: number,
    label: string,
}
function isValidRoom(room: room) {

    return !Object.values(room).every(o => o == null);
}

router.post('/add-game', (req, res) => {

    const isValid = isValidRoom(req.body)

    if (isValid) {
        createGameRoom(req.body)
            .then((id: number) => {
                res.json({
                    id,
                    message: 'Oyun Odası Oluşturuldu'
                });
            });
    } else {
        res.status(400).json({
            message: 'Tüm Alanlar Zorunludur',
        })
    }

});

router.get('/getallgamerooms', (req, res) => {
    getAllGameRooms()
        .then((rooms: []) => {
            res.json([...rooms])
        })
});

router.post('/update-gameroom', async (req, res) => {
    try {
        if (await updateGameRoom(req.body)) {
            res.status(200).json({ message: 'Oyun Odası Güncellendi' })
        } else {
            res.status(404).json({ message: 'Kayıtlı Oyun Odası Bulunamadı' })
        }
    } catch (error) {
        res.status(500).json({ message: "Oyun Odası Güncellenirken Bir Hata Oluştu", error: error })
    }
});


router.delete('/delete-gameroom/:id', (req, res) => {
    if (req.params.id) {
        if (deleteGameRoom(parseInt(req.params.id))) {
            res.status(200).json({ message: 'Oyun Odası Silindi' })
        } else {
            res.status(500).json({ message: 'Oyun Odası Silinirken Bir Hata Oluştu' })
        }
    } else {
        res.status(404).json({ message: 'Kayıtlı Oyun Odası Bulunamadı' })
    }

})

router.post('/update-gameroom-status', async (req, res) => {

    const update = await updateGameRoomStatus(req.body.id, req.body.status)


    if (!update.error) {
        res.status(200).json({ message: 'Oyun Odası Durumu Güncellendi' })
    } else {
        res.status(500).json({ message: update.message })
    }

});
export default router