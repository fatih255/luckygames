const knex = require('./connection')
interface room {
    id?: number | undefined | null
    user_total: number,
    participation_fee: number,
    label: string,
    status?: 'active' | 'passive' | undefined | null
}


function getOneById(id: number) {
    return knex('game').where('id', id).first();
}

function createGameRoom(room: room) {
    return knex('game').insert(room, 'id').then((ids: any[]) => {
        return ids[0]
    })
}

function getAllGameRooms(justActiveRooms: boolean = false) {

    if (justActiveRooms) {
        return knex('game').select().where({ status: 'active' }).orderBy('id', 'desc').then((rooms: any[]) => {
            return rooms
        })
    } else {
        return knex('game').select().orderBy('id', 'desc').then((rooms: any[]) => {
            return rooms
        })
    }
}

async function updateGameRoom(room: room) {
    return knex('game')
        .where({ id: room.id })
        .update({
            user_total: room.user_total,
            participation_fee: room.participation_fee,
            label: room.label,
            status: room.status
        }, ['user_total', 'participation_fee', 'label', 'status'])

}


function deleteGameRoom(id: number) {
    return knex('game')
        .where('id', id).del().then((deleted: any) => {
            return deleted
        })
}

function updateGameRoomStatus(id: number, status: string) {
    return knex('game')
        .where({ id: id })
        .update({
            status: status
        }, ['status']).then((updated: any) => {
            return { message: 'Oyun Durumu Güncellendi', error: false }
        }).catch((error: any) => {
            return { message: error.message, error: true }
        })
}

export { getOneById, createGameRoom, getAllGameRooms, updateGameRoom, deleteGameRoom, updateGameRoomStatus }