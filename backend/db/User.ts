const knex = require('./connection')

function getOne(id: number, withpassword: boolean = true) {

    if (!withpassword) return knex('users').select('id', 'phone', 'email').where('id', id).first();

    return knex('users').where('id', id).first();
}
function getOneByEmail(email: string) {
    return knex('users').where('email', email).first();
}
function getOneByPhone(phone: string) {
    return knex('users').where('phone', phone).first();
}
function createUserWithEmail(user: { email: string, password: string }) {
    return knex('users').insert(user, 'id').then((ids: any[]) => {
        return ids[0]
    })
}

function createUserWithPhone(user: { email: string, password: string }) {
    return knex('users').insert(user, 'id').then((ids: any[]) => {
        return ids[0]
    })
}


export { getOne, getOneByEmail, getOneByPhone, createUserWithEmail, createUserWithPhone }