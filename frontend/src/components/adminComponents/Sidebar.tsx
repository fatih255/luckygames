import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { HiOutlineLogout } from 'react-icons/hi'
import { ImUserTie } from 'react-icons/im'
import { CgGames } from 'react-icons/cg'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Logout } from '../../../redux/slices/authSlice'

export default function Sidebar() {
    const { id, email, phone, balance } = useAppSelector(state => state.auth.user)
    const router = useRouter()

    const dispatch = useAppDispatch()
    return (
        <div className="w-3/12 bg-white rounded p-3 shadow-lg">
            <div className="flex items-center space-x-4 p-2 mb-5">
                <ImUserTie className="text-blue-600 w-5 h-5" />
                <div>
                    <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">Admin</h4>
                    <span className="text-sm tracking-wide flex items-center space-x-1">
                        <svg className="h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg><span className="text-gray-600">{email}</span>
                    </span>
                </div>
            </div>
            <div className="space-y-2 text-sm">
                <Link href="/admin">
                    <div className={`cursor-pointer flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-blue-50 ${router.pathname === '/admin' ? 'bg-blue-100' : ''} focus:shadow-outline`}>
                        <AiOutlineHome className="text-blue-600 w-5 h-5" />
                        <span>Anasayfa</span>
                    </div>
                </Link>
                <Link href="/admin/gamerooms">
                    <div className={`cursor-pointer flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-blue-50 ${router.pathname.includes('/admin/gamerooms') ? 'bg-blue-100' : ''} focus:shadow-outline`}>
                        <CgGames className="text-blue-600 w-5 h-5" />
                        <span> Oyun Odaları</span>
                    </div>
                </Link>
                <div onClick={() => {
                    dispatch(Logout());
                    router.push('/');
                }} className="cursor-pointer flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-blue-50 focus:bg-gray-200 focus:shadow-outline">
                    <HiOutlineLogout className="text-blue-600 w-5 h-5" />
                    <span>Çıkış Yap</span>
                </div>
            </div>
        </div>
    )
}
