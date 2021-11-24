import jwt, { JwtPayload } from 'jsonwebtoken'

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



function validateToken(userToken: string | null, getinfo: boolean = false): boolean | object {

    let tokenvalidate: object | boolean = false;
    if (userToken) {
        const token = userToken?.split(' ')[1] || ''

        // invalid token
        jwt.verify(token, process.env.JWT_SECRET as string, function (err, decoded) {
            if (!err) {
                if (decoded?.exp as number * 1000 > new Date().getTime()) {
                    if (getinfo) {
                        tokenvalidate = {
                            id: decoded?.id,
                            email: decoded?.email,
                            phone: decoded?.phone,
                            balance: decoded?.balance,
                            role: decoded?.role
                        }
                    } else {
                        tokenvalidate = true
                    }
                }
            } else {
                tokenvalidate = false
            }
        });

    }

    return tokenvalidate

}

export { validUser, isEmpty, generateAccessToken, validateToken }
