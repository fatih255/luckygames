const knex = require('./connection')

function getOne(id: number, withpassword: boolean = true) {

    if (!withpassword) return knex('users').select('id', 'phone', 'email', 'balance').where('id', id).first();

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

//TODO: error have when user add game coin
//update "user" set "balance" = $1 where "id" = $2 returning "balance" - relation "user" does not exist

function updateUser(id: number, user: {
    email?: string,
    password?: string,
    phone?: string,
    balance?: number, 
    role?: 'user' | 'admin'
}) {

    const getFilledValues = Object.fromEntries(Object.entries(user).filter((val) => val !== undefined));
    const getFilledValuesKeys = Object.keys(getFilledValues)

    return knex('user')
        .where({ id: id })
        .update({
            ...getFilledValues
        }, getFilledValuesKeys)
}


export { updateUser, getOne, getOneByEmail, getOneByPhone, createUserWithEmail, createUserWithPhone }