import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { inRoom, isJoining } from '../../../redux/slices/gameSlice';
import socketService from '../../../services/socketService'
import gameService from '../../../services/socketService/gameService';

export interface GameRoomCardProps {
    id: number
    label: string
    user_total: number
    participation_fee: number
    user: object
}


export default function GameRoomCard({ id, label, user_total, participation_fee }: GameRoomCardProps) {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const game = useAppSelector(state => state.game)

    const joinRoom = async () => {
        const socket = socketService.socket;
        if (!id || !socket) return;
        dispatch(isJoining(true))
        const joined = await gameService.joinGameRoom(socket, label).catch((err) => {
            alert(err);
        });

        if (joined) dispatch(inRoom(true));

        dispatch(isJoining(false))
    }

    if (game.inRoom) {
        router.push({
            pathname: '/game/[roomId]',
            query: { roomId: id },
        })
    }



    return (
        <div className="flex justify-center mx-20 my-20 ">
            <div className="py-4  px-4 rounded-xl centered-shadow bg-white">
                <h2 className="text-4xl">{label}</h2>
                <div className="mt-8 mb-8" >
                    <p>Katılım Ücreti : </p>
                    <span><b className="font-semibold text-blue-800 text-2xl">{participation_fee}</b></span>
                </div>
                <div className="flex justify-between" >

                    <button
                        onClick={joinRoom}
                        disabled={game.isJoining}
                        className="rounded-lg transition duration-200 hover:bg-blue-500 hover:scale-110 self-center px-8 py-2 font-semibold text-white bg-blue-800">
                        {game.isJoining ? 'Katılıyorsunuz...' : 'Katıl'}
                    </button>
                    <div className="flex flex-col justify-center items-center">
                        <FaUsers className="text-blue-700 w-12" />
                        <span className="font-semibold text-xl">{`0/${user_total}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
