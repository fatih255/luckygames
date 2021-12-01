import jwt, { JwtPayload } from 'jsonwebtoken'
import { getOne } from './db/User';

interface validUserInterface {
    id: number,
    email: string,
    phone: string,
    password: string,
    balance: number,
    role: string
}

function validUser(user: validUserInterface) {

    let validate = false;
    let signupType = !isEmpty(user.email) ? 'email' : 'phone'

    if (!isEmpty(user.email) || !isEmpty(user.phone) && !isEmpty(user.password)) {
        validate = true
    }
    return { signupType, validate }
}

function isEmpty(value: string) {
    /*check this types undefined, null, [], ""   Because undefined == null */
    return (value == null || value.length === 0);

}

function generateAccessToken(infos: object) {
    return jwt.sign(infos, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRE });
}



async function validateToken(userToken: string | null, getinfo: boolean = false): Promise<boolean | object> {


    return new Promise((rs, rj) => {

        //if token  have
        if (userToken) {
            // invalid token
            const token = userToken?.split(' ')[1] || ''
            jwt.verify(token, process.env.JWT_SECRET as string, function (err, decoded) {
                if (!err) {
                    if (decoded?.exp as number * 1000 > new Date().getTime()) {
                        if (getinfo) {
                            getOne(Number(decoded.id))
                                .then(async (user: object) => {
                                    rs({ ...user })
                                }).catch((err: any) => {
                                    rj(false)
                                })
                        }
                    }
                } else {

                }
            })
        } else {
            rj(false)
        }
    });


}

export { validUser, isEmpty, generateAccessToken, validateToken }
