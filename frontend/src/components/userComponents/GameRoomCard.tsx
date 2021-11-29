import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { inRoom, isJoining, joinAttempt } from '../../../redux/slices/gameSlice';
import socketService from '../../../services/socketService'
import gameService from '../../../services/gameService';
import roomService from '../../../services/roomService';
import { Check } from '../../../redux/slices/authSlice';

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
    const user = useAppSelector(state => state.auth.user)





    //prive states component
    const [OnlineUsersSize, setOnlineUsersSize] = useState(0)


    //room join method
    const joinRoom = async () => {
        dispatch(isJoining(true))
        const JoinResponse: Promise<{ message: string, roomid: number, AvailableBalance: number }> = new Promise((rs, rj) => {
            dispatch(joinAttempt({ userid: user.id, roomid: id })).then(({ payload: { message, roomid, AvailableBalance } }) => {
                rs({ message, roomid, AvailableBalance })
            }).catch((err) => {
                rj(err.message)
            })
        })


        if ((await JoinResponse).roomid === id) {

            const socket = socketService.socket;
            if (!id || !socket) return;

            const joined = await gameService.joinGameRoom(socket, id).catch((err) => {
                alert(err);
            });

            if (joined) {
                dispatch(inRoom(id));
                getUsersInRoom()
                changeRoomValuesHandler(OnlineUsersSize + 1, id)
                dispatch(Check())

                router.push({
                    pathname: '/game/[roomId]',
                    query: { roomId: id },
                })


            }
            dispatch(isJoining(false))
        }
    }

    const changeRoomValuesHandler = (onlineUsers: number, id: number) => {
        setOnlineUsersSize(onlineUsers)
        if (socketService.socket) {
            roomService.updateRoom(socketService.socket, { onlineUsers, id })
        }
    }

    const handleRoomValuesUpdate = () => {
        if (socketService.socket)
            roomService.onRoomUpdate(socketService.socket, (roomvalues) => {
                id === roomvalues.id && setOnlineUsersSize(roomvalues.onlineUsers)

            });
    };



    //TODO:: get online user game/home page inside and show number , suan emit mesajlar kayit olunmuyor
    //method to show online users in the room
    const getUsersInRoom = async () => {
        const socket = socketService.socket;
        if (!id || !socket) return;
        const OnlineUsersSize = await roomService.getJoinedUsersSize(socket, id)
        if (OnlineUsersSize) {
            setOnlineUsersSize(OnlineUsersSize)
        }
    }





    let mounted = false;
    useEffect(() => {

        if (id && !mounted) {
            getUsersInRoom()
            handleRoomValuesUpdate()
        }

        return () => {
            mounted = true
        }
    }, [])

    const test = () => {
        if (socketService.socket) {
            roomService.checkUserInRoom(socketService.socket, id)
        }
    }
    return (
        <div className="flex justify-center mx-20 my-20 ">
            <button onClick={() => test()}>im already in room</button>
            <div className="py-4  px-4 rounded-xl centered-shadow bg-white">
                <h2 className="text-4xl">{`No: ${id} | ${label}`}</h2>
                <div className="mt-8 mb-8" >
                    <p>Katılım Ücreti : </p>
                    <span><b className="font-semibold text-blue-800 text-2xl">{participation_fee}</b></span>
                </div>
                <div className="flex justify-between" >

                    <button
                        onClick={() => joinRoom()}
                        disabled={game.isJoining}
                        className="rounded-lg transition duration-200 hover:bg-blue-500 hover:scale-110 self-center px-8 py-2 font-semibold text-white bg-blue-800">
                        {game.isJoining ? 'Katılıyorsunuz...' : 'Katıl'}
                    </button>
                    <div className="flex flex-col justify-center items-center">
                        <FaUsers className="text-blue-700 w-12" />
                        <span className="font-semibold text-xl">{`${OnlineUsersSize}/${user_total}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
