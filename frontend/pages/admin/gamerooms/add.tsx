import Head from 'next/head'
import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import AdminLayout from '../../../layouts/AdminLayout'
import RoomCard from '../../../src/components/adminComponents/RoomCard'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { GameRoomSchema } from '../../../yupschemas'
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { addGameRoom } from '../../../redux/slices/adminSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

export default function addgameroom() {

    const [submitted, SetSubmitted] = useState(false);

    type Inputs = {
        user_total: number,
        participation_fee: number,
        label: string
    };

    const { register, handleSubmit, setValue, clearErrors, reset, getValues, setError, trigger, watch, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(GameRoomSchema),
        mode: 'onBlur',
        shouldFocusError: true
    });

    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(addGameRoom(data))
        SetSubmitted(true)
    }
    const onError: SubmitErrorHandler<Inputs> = () => {

    };

    const { label, user_total, participation_fee }: Inputs = watch()
    const { createLoading, responsemessage, error } = useAppSelector(state => state.admin)
    return (
        <div>
            <Head>
                <title>Admin Paneli - Oyun Odaları</title>
            </Head>
            <div>
                <Link href="/admin/gamerooms">
                    <div className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold py-2 px-4 rounded-full flex items-center mb-4 fit">
                        <MdOutlineArrowBackIos className="text-white w-6 h-6 mr-2" />
                        <span>Oyun Odaları</span>
                    </div>
                </Link>
                <RoomCard forPreview={true} id={0} label={label} user_total={user_total} participation_fee={participation_fee} status={'active'} />
                <div className="mt-8">
                    {submitted && createLoading === "succeeded" && <div className=" flex flex-row fit px-2 py-2 bg-blue-200 rounded-md">
                        <AiOutlineCheckCircle className="text-blue-600 w-6 h-6 mr-2" />
                        <span className="font-semibold text-blue-700">{responsemessage}</span>
                    </div>}
                    {submitted && createLoading === "failed" && <div className=" flex flex-row fit px-2 py-2 bg-red-200 rounded-md">
                        <AiOutlineCheckCircle className="text-red-600 w-6 h-6 mr-2" />
                        <span className="font-semibold text-red-700">{error}</span>
                    </div>}
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col" autoComplete="off">
                        <div className="rounded shadow-lg p-8">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-md font-semibold mb-2" htmlFor="grid-first-name">
                                    Oyun Adı
                                </label>
                                <input {...register("label")} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
                                <p className="text-red-700 text-[14px] mt-2 mb-2"  >{errors.label?.message}</p>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-md font-semibold mb-2" htmlFor="grid-first-name">
                                    Oyuncu Sayısı
                                </label>
                                <input {...register("user_total")} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" />
                                <p className="text-red-700 text-[14px] mt-2 mb-2"  >{errors.user_total?.message}</p>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-md font-semibold mb-2" htmlFor="grid-first-name">
                                    Katılım Ücreti
                                </label>
                                <input {...register("participation_fee", {
                                    onChange: (event) => {
                                        setValue('participation_fee', event.target.value.replace(/\D/, ''), { shouldValidate: !!errors.participation_fee })
                                    }
                                })} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" />
                                <p className="text-red-700 text-[14px] mt-2 mb-2"  >{errors.participation_fee?.message}</p>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex justify-end mt-2">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full flex items-center mb-4 ">
                                    <IoAddOutline className="text-white w-6 h-6 mr-2" />
                                    <span>Oyun Odasını Ekle</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
addgameroom.layout = AdminLayout