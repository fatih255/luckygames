import React from 'react'
import Link from 'next/link'
import { FaUsers } from 'react-icons/fa'
import GameLayout from '../../layouts/GameLayout'


export default function home() {
    return (
        <div className=" h-screen bg-blue-800 ">
            <h1>Mevcut Oyun Odaları</h1>
            <div className="flex justify-center mx-20 my-20 ">
                <div className="py-4  px-4 rounded-xl centered-shadow bg-white">
                    <img className="w-16 mx-auto -mt-12" src="/assets/cryptoicons/shib.png" />
                    <h2 className="text-4xl">SHIB Turnuvası</h2>
                    <div className="mt-8 mb-8" >
                        <p>Katılım Ücreti : </p>
                        <span><b className="font-semibold text-blue-800 text-2xl">0.00000010</b></span>
                    </div>
                    <div className="flex justify-between" >
                        <Link href="/game/room"><a className="rounded-lg transition duration-200 hover:bg-blue-500 hover:scale-110 self-center px-8 py-2 font-semibold text-white bg-blue-800">Katıl</a></Link>
                        <div className="flex flex-col justify-center items-center">
                            <FaUsers className="text-blue-700 w-12" />
                            <span className="font-semibold text-xl">70/100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

home.layout = GameLayout
