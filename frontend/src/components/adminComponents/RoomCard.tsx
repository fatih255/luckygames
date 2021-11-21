import Link from 'next/link'
import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import { useAppDispatch } from '../../../redux/hooks'
import { deleteGameRoom, updateGameRoomStatus } from '../../../redux/slices/adminSlice'


export interface RoomCardProps {
    forPreview?: boolean
    id: number
    label: string
    user_total: number
    participation_fee: number
    status: 'active' | 'passive'
}

export default function RoomCard({ id, label, participation_fee, user_total, status, forPreview = false }: RoomCardProps) {

    const dispatch = useAppDispatch()

    function changeStatusHandler(id: number, status: string) {
        dispatch(updateGameRoomStatus({ id: id, status: status === 'passive' ? 'active' : 'passive' }))
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{label}</div>
                {
                    !forPreview && <div onClick={() => changeStatusHandler(id, status)} className="flex flex-row ">
                        <span className="text-gray-400 text-md mr-2 cursor-default">Oyun Durumu: </span>

                        <span className={`${status === 'active' ? 'bg-green-600' : 'bg-red-600'} rounded-full px-3 py-1 text-sm font-semibold cursor-pointer text-white mr-2 mb-2 transition duration-150 hover:scale-105 hover:${status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}>
                            {status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                    </div>
                }
                <div className="mt-3">
                    <p className="text-gray-700 text-base">Katılım Ücreti: {participation_fee}</p>
                    <p className="text-gray-700 text-base">Oyuncu Sayısı: {user_total}</p>
                </div>
            </div>
            {
                !forPreview && <div className="flex flex-row justify-end items-center px-6 pt-4 pb-4 space-x-3">
                    <div className="flex flex-row  cursor-pointer transition duration-150 hover:scale-105">
                        <FiEdit3 className="text-blue-600 w-5 h-5 " />
                        <Link href={{
                            pathname: '/admin/gamerooms/edit',
                            query: { id, label, participation_fee, user_total, status }
                        }}>Düzenle</Link>
                    </div>
                    <div className="flex flex-row  cursor-pointer transition duration-150 hover:scale-105">
                        <AiFillDelete className="text-red-600 w-5 h-5" />
                        <button onClick={() =>
                            dispatch(deleteGameRoom(id))
                        }>Sil</button>
                    </div>
                </div>
            }
        </div>
    )
}
