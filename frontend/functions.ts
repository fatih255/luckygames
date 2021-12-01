import { NextResponse, NextRequest } from 'next/server';
import jwt_decode from 'jwt-decode';

interface tokeninterface {
    id: number,
    role: 'admin' | 'user'
    email: string,
    iat: number,
    exp: number
    // whatever else is in the JWT.
}

function validateToken(userToken: string | null, split: string = '%20', requireUser: boolean, requireAdmin: boolean = false, nextUrl: String | null = null) {

    let tokenvalidate: NextResponse | boolean = false;

    if (userToken) {
        const token = userToken?.split(split)[1] || ''
        const decoded: tokeninterface = jwt_decode(token);
        //not expired token time
        tokenvalidate = decoded.exp * 1000 > new Date().getTime()


        if (tokenvalidate) {
            //If it is mandatory to be an admin on the page that the user wants to enter, 
            //and if he is not an administrator, 
            //check the user role, 
            //if he is not admin, direct him to the home page.
            //and if user role is admin , he can access the admin route pages

            if (requireAdmin) {
                if (decoded.role !== 'admin') {
                    //   console.log('1')
                    return NextResponse.redirect(`/`)
                } else {
                    return NextResponse.next()
                }
            }

            // if admin is not required page, user can access the page
            if (!requireAdmin && requireUser) {
                //  console.log('2')
                return NextResponse.next()
            }

            //If the user is logged in but trying to go to the login and signup pages, redirect him to the home page.
            if (nextUrl === '/login' || nextUrl === '/signup') {
                // console.log('3')
                return NextResponse.redirect(`/`)
            }

        } else {
            //If require user and jwt token is expired, redirect user to login page
            if (requireUser || requireAdmin) {
                //console.log('4')
                return NextResponse.redirect(`/login`)
            } else {
                return NextResponse.next()
            }
        }

    } else {
        //If not have token
        if (requireUser || requireAdmin) {
            // console.log('6')
            return NextResponse.redirect(`/login`)
        } else {
            return NextResponse.next()
        }
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