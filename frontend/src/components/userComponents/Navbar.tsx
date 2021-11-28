import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { GiTwoCoins } from 'react-icons/gi'
import { MdPayment } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { IoExitOutline } from 'react-icons/io5'
import Navlinks from '../../utils/Navlinks'
import { Logout } from '../../../redux/slices/authSlice'
import { useRouter } from 'next/router'
import { FaGamepad } from 'react-icons/fa'
interface Nav {
    disableFixed?: boolean
}

export default function Navbar({ disableFixed = true }: Nav) {



    const router = useRouter()
    const { user } = useAppSelector(state => state.auth) //from redux
    const dispatch = useAppDispatch()
    return (
        <nav className={`bg-black  w-full z-30 ${disableFixed ? '' : 'fixed'}`}>
            <div className="mx-20  flex h-14 justify-between items-center ">
                <span className="font-bold text-3xl text-white"><Link href="/">LuckyGames</Link></span>
                <ul className="flex self-stretch">
                    {<Navlinks client={user.id ? 'user' : 'guest'} links={[
                        {
                            name: "Kaydol",
                            path: '/signup',
                            show: 'guest'
                        },
                        {
                            name: 'Giriş Yap',
                            path: '/login',
                            show: 'guest'
                        },
                        {
                            name: `Bakiyeniz ${user.balance}`,
                            extraclass: 'bg-blue-600 px-3',
                            show: 'user',
                            icon: <GiTwoCoins className="text-white w-6 h-6 mr-3" />
                        },
                        {
                            name: 'Profilim',
                            path: `/profile`,
                            show: 'user',
                            icon: <AiOutlineUser className="text-white w-6 h-6 mr-3" />
                        },
                        {
                            name: 'Oyun Parası Yükle',
                            path: `/profile/buygamecoin`,
                            show: 'user',
                            icon: <MdPayment className="text-white w-6 h-6 mr-3" />
                        },
                        {
                            name: 'Oyuna Katıl',
                            path: '/game/home',
                            show: 'user',
                            icon: <FaGamepad className="text-white w-6 h-6 mr-3" />
                        },
                        {
                            name: 'Çıkış Yap',
                            show: 'user',
                            icon: <IoExitOutline className="text-white w-6 h-6 mr-3" />,
                            onClick: () => {
                                dispatch(Logout())
                                router.push('/')
                            }
                        }
                    ]} />}

                </ul>
            </div>
        </nav>
    )
}
