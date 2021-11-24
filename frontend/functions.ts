import { NextResponse } from 'next/server';
import jwt_decode from 'jwt-decode';

interface tokeninterface {
    id: number,
    role: 'admin' | 'user'
    email: string,
    iat: number,
    exp: number
    // whatever else is in the JWT.
}
function validateToken(userToken: string | null, forNextMiddleware: boolean = true, split: string = '%20', requireAdmin: boolean = false) {
   
    let tokenvalidate = false;
    if (userToken) {
        const token = userToken?.split(split)[1] || ''
        const decoded: tokeninterface = jwt_decode(token);

        if (requireAdmin && decoded.role !== 'admin') {
            return NextResponse.redirect(`/profile/${decoded.id}`)
        }
        //not expired token time
        tokenvalidate = decoded.exp * 1000 > new Date().getTime()
        //console.log(decoded)
    } 
 
    if (forNextMiddleware) {
        return tokenvalidate ? NextResponse.next() : NextResponse.redirect('/login')
    } else {
        return tokenvalidate
    }

}


function cookieparser(cookieString: string) {

    // Return an empty object if cookieString
    // is empty
    if (cookieString === "")
        return {};

    // Get each individual key-value pairs
    // from the cookie string
    // This returns a new array
    let pairs = cookieString?.split(";");

    // Separate keys from values in each pair string
    // Returns a new array which looks like
    // [[key1,value1], [key2,value2], ...]
    let splittedPairs = pairs?.map((cookie: string) => cookie.split("="));

    //token1=41561651; token2=65465165156
    // Create an object with all key-value pairs
    const cookieObj = splittedPairs?.reduce(function (obj: any, cookie: any) {

        // cookie[0] is the key of cookie
        // cookie[1] is the value of the cookie
        // decodeURIComponent() decodes the cookie
        // string, to handle cookies with special
        // characters, e.g. '$'.
        // string.trim() trims the blank spaces
        // auround the key and value.
        obj[decodeURIComponent(cookie[0].trim())]
            = decodeURIComponent(cookie[1].trim());

        return obj;
    }, {})

    return cookieObj;
}
export { validateToken, cookieparser }