import cookieParser from 'cookie-parser';

import { NextRequest, NextResponse } from 'next/server'
import { cookieparser, validateToken } from '../../functions';


export function middleware(req: NextRequest, res: NextResponse) {

  const cookie = req.headers.get('cookie')

  return validateToken(cookieparser(cookie as string)?.token, ' ', true, true, req.nextUrl.pathname)

}