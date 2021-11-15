
import { NextRequest, NextResponse } from 'next/server'
import { validateToken } from '../../functions';


export function middleware(req: NextRequest, res: NextResponse) {


  const cookie = req.headers.get('cookie')
  return validateToken(cookie, true)

}