import { NextResponse } from 'next/server';
import jwt_decode from 'jwt-decode';

interface tokeninterface {
    id: number,
    email: string,
    iat: number,
    exp: number
    // whatever else is in the JWT.
}
function validateToken(userToken: string | null, forNextMiddleware: boolean = true) {

    let tokenvalidate = false;
    if (userToken) {
        const token = userToken?.split('%20')[1] || ''
        const decoded: tokeninterface = jwt_decode(token);

        //not expired token time
        tokenvalidate = decoded.exp * 1000 > new Date().getTime()
    }

    if (forNextMiddleware) {
        return tokenvalidate ? NextResponse.next() : NextResponse.redirect('/login')
    } else {
        return tokenvalidate
    }

}
export { validateToken }