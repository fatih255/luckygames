import React from 'react'
import Link from 'next/link'
import { FaUsers } from 'react-icons/fa'
import GameLayout from '../../layouts/GameLayout'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import GameRoomCard, { GameRoomCardProps } from '../../src/components/userComponents/GameRoomCard'
import useSWR from 'swr'
import { useAppSelector } from '../../redux/hooks'


export default function home() {

    const fetcher = (url: RequestInfo) => fetch(url, { credentials: 'include' }).then((res) => res.json())
    const user = useAppSelector(state => state.auth.user)
    const { data, mutate } = useSWR(`${process.env.SERVER_BASE_URL}/api/user/get-all-active-game-rooms`, fetcher)


    return (
        <div className=" h-screen bg-blue-800 py-10 px-5">

            <Link href="/">
                <div className="flex justify-start items-center cursor-pointer hover:bg-blue-600 max-w-min rounded-full px-2 py-2 ">
                    <AiOutlineArrowLeft className="text-white w-10 h-10 mr-2" />
                    <span className="text-white whitespace-nowrap">Anasayfaya Dön</span>
                </div>
            </Link>

            <h1 className="text-white text-2xl text-center">Mevcut Oyun Odaları</h1>
            <div className="flex justify-center mx-20 my-20 ">
                {data ? data?.map(({ id, label, user_total, participation_fee }: GameRoomCardProps) => (
                    <GameRoomCard
                        key={id}
                        id={id}
                        label={label}
                        user_total={user_total}
                        participation_fee={participation_fee} user={user} />
                )) : <span className="text-white text-2xl">Yükleniyor...</span>}
            </div>
        </div>
    )
}

home.layout = GameLayout
