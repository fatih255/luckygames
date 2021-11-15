import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { GiTrophyCup } from 'react-icons/gi'
import { BiUser } from 'react-icons/bi'
import { AiFillFire } from 'react-icons/ai'
import Userdot from '../../src/components/Userdot'
import GameLayout from '../../layouts/GameLayout'
import GameArea from '../../src/components/GameArea'
import Image from 'next/image'
import GameNavItem from '../../src/components/GameNavItem'

export default function room() {
    return (
        <div className="md:flex lg:grid  grid-cols-4 grid-rows-4 gap-5 px-[5%] py-[5%]  h-screen ">
            <div className=" col-span-4 lg:col-span-1 bg-white px-4 py-4 rounded-xl justify-start items-center ">
                <div className="flex  flex-row justify-between items-center mb-4 flex-wrap">
                    <div className=" text-white text-3xl bg-purple-700 rounded-full tracking-tight fit px-4 py-2 mr-2">
                        1.TUR
                    </div>
                    <span className="text-purple-700 text-2xl  flex font-bold " >
                        <FaUsers className="text-purple-700 w-8 h-8 " />70/100
                    </span>
                    <div className="bg-purple-300 w-full h-12 relative mt-4 rounded-full flex  justify-left items-center">
                        <div className="bg-purple-600 w-[30%] h-full absolute rounded-full ">
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row-span-4 col-span-3 grid   bg-white gameroom-right  px-2 py-2 rounded-xl ">
                <div className="flex flex-wrap gap-x-2 gap-y-4">
                    <GameNavItem text="Oyuncu Adı" icon={<BiUser className="text-indigo-800 w-10 h-10" />} />
                    <GameNavItem text="Katlama" icon={<AiFillFire className="text-indigo-800 w-10 h-10" />} value="1x" valueclass="bg-indigo-300" />
                    <GameNavItem text="Kazanılan Oyun" icon={<GiTrophyCup className="text-indigo-800 w-10 h-10" />} value="0" valueclass="bg-indigo-500" />
                    <GameNavItem text="Kripto Para Birimi" icon={<Image width={40} height={40} src="/assets/cryptoicons/shib.png" />} value="SHIB" valueclass="bg-indigo-300" />
                </div>
                <div className=" bg-gray-100 rounded-xl mt-4 md:mt-0 " >
                    <GameArea />
                </div>
            </div>

            <div className="bg-white flex row-span-3  rounded-xl  flex-col items-center ">
                <h2 className="rounded-t-lg py-2 self-stretch border-b-[1px] border-purple-300 text-center bg-indigo-100 text-xl font-semibold tracking-tight text-indigo-900">Yarışmacılar</h2>
                <div className="px-4 py-4 flex flex-row flex-wrap overflow-scroll overflow-x-hidden scrollbar-style justify-center behaviorsmooth">
                    <Userdot count={100} className="m-2 transition duration-200 cursor-default hover:scale-105 hover:bg-purple-600 bg-purple-800 w-10 rounded-full h-10 justify-center flex items-center text-white" />
                </div>
            </div>

        </div>
    )
}

room.layout = GameLayout