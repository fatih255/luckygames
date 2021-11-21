import Link from 'next/link'
import React from 'react'
import { FaUsers } from 'react-icons/fa'

export interface GameRoomCardProps {
    id: number
    label: string
    user_total: number
    participation_fee: number
}


export default function GameRoomCard({ id, label, user_total, participation_fee }: GameRoomCardProps) {
    return (
        <div className="flex justify-center mx-20 my-20 ">
            <div className="py-4  px-4 rounded-xl centered-shadow bg-white">
                <h2 className="text-4xl">{label}</h2>
                <div className="mt-8 mb-8" >
                    <p>Katılım Ücreti : </p>
                    <span><b className="font-semibold text-blue-800 text-2xl">{participation_fee}</b></span>
                </div>
                <div className="flex justify-between" >
                    <Link href={{
                        pathname: '/game/room',
                        query: { id }
                    }}
                    >
                        <a className="rounded-lg transition duration-200 hover:bg-blue-500 hover:scale-110 self-center px-8 py-2 font-semibold text-white bg-blue-800">Katıl</a></Link>
                    <div className="flex flex-col justify-center items-center">
                        <FaUsers className="text-blue-700 w-12" />
                        <span className="font-semibold text-xl">{`0/${user_total}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
