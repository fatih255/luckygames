import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { GiTwoCoins } from 'react-icons/gi'
import { MdPayment } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import Navlinks from '../utils/Navlinks'
interface Nav {
    disableFixed: boolean
}

export default function Navbar({ disableFixed = true }: Nav) {

    const client = Cookies.get('UserLoggedIn') ? 'user' : 'guest'
    const { user } = useAppSelector(state => state.auth) //from redux
    return (
        <nav className={`bg-black  w-full z-30 ${disableFixed ? '' : 'fixed'}`}>
            <div className="mx-20  flex h-14 justify-between items-center ">
                <span className="font-bold text-3xl text-white"><Link href="/">LuckyGames</Link></span>
                <ul className="flex self-stretch">
                    <Navlinks client={client} links={[
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
                            path: `/profile/${user.id}`,
                            show: 'user',
                            icon: <AiOutlineUser className="text-white w-6 h-6 mr-3" />
                        },
                        {
                            name: 'Oyun Parası Yükle',
                            path: `/profile/${user.id}/buygamecoin`,
                            show: 'user',
                            icon: <MdPayment className="text-white w-6 h-6 mr-3" />
                        },
                        {
                            name: 'Oyuna Katıl',
                            path: '/game/home',
                            show: 'user'
                        }
                    ]} />

                </ul>
            </div>
        </nav>
    )
}
