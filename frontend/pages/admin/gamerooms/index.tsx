import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import Link from 'next/link'
import AdminLayout from '../../../layouts/AdminLayout'
import RoomCard, { RoomCardProps } from '../../../src/components/adminComponents/RoomCard'
import useSWR from 'swr'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { resetLoadings } from '../../../redux/slices/adminSlice'

export default function gamerooms() {



    const fetcher = (url: RequestInfo) => fetch(url, { credentials: 'include' }).then((res) => res.json())

    //const { mutate } = useSWRConfig()
    const { data, mutate } = useSWR(`${process.env.SERVER_BASE_URL}/api/admin/getallgamerooms`, fetcher)

    const [ResponseHave, setResponseHave] = useState(false)
    const { deleteLoading, updateStatusLoading, responsemessage } = useAppSelector(state => state.admin)


    const dispatch = useAppDispatch()


    useEffect(() => {
        if (deleteLoading === 'succeeded' || updateStatusLoading === 'succeeded') {

            mutate([...data])
            setResponseHave(true)
            dispatch(resetLoadings())
        }
    }, [deleteLoading, updateStatusLoading])

    return (
        <div>
            <Head>
                <title>Admin Paneli - Oyun Odaları</title>
            </Head>
            <div>

                <Link href="/admin/gamerooms/add">
                    <div className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold py-2 px-4 rounded-full flex items-center mb-4 fit">
                        <IoAddOutline className="text-white w-6 h-6 mr-2" />
                        <span>Oyun Odası Ekle</span>
                    </div>
                </Link>
                {ResponseHave && <div className=" flex flex-row fit px-2 py-2 mb-5 bg-blue-200 rounded-md">
                    <AiOutlineCheckCircle className="text-blue-600 w-6 h-6 mr-2" />
                    <span className="font-semibold text-blue-700">{responsemessage}</span>
                </div>}
                <div className="flex flex-row gap-x-4 gap-y-4 flex-wrap ">
                    {
                        data ? data.map((room: RoomCardProps, index: number) => (<RoomCard
                            key={index}
                            id={room.id}
                            label={room.label}
                            user_total={room.user_total}
                            participation_fee={room.participation_fee}
                            status={room.status}
                        />))
                            : <div>
                                Yükleniyor
                            </div>
                    }
                    {data && data.length === 0 && <div>
                        Kayıtlı Oda Bulunamadı
                    </div>}
                </div>

            </div>
        </div>

    )
}



gamerooms.layout = AdminLayout