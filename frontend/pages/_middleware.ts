import cookieParser from 'cookie-parser';

import { NextRequest, NextResponse } from 'next/server'
import { cookieparser, validateToken } from '../functions';


export function middleware(req: NextRequest, res: NextResponse) {


  const cookie = req.headers.get('cookie')

  const haveUser = validateToken(cookieparser(cookie as string)?.token, false, ' ')

  if (haveUser && req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
    return NextResponse.redirect('/')
  }

  return NextResponse.next()

}