import React, { useEffect } from 'react'
import { FaUsers } from 'react-icons/fa'
import { GiTrophyCup } from 'react-icons/gi'
import { BiUser } from 'react-icons/bi'
import { AiFillFire } from 'react-icons/ai'
import Userdot from '../../src/components/userComponents/Userdot'
import GameLayout from '../../layouts/GameLayout'
import GameArea from '../../src/components/userComponents/GameArea'
import GameNavItem from '../../src/components/userComponents/GameNavItem'
import { useAppSelector } from '../../redux/hooks'
import useSWR from 'swr'
import { GameRoomCardProps } from '../../src/components/userComponents/GameRoomCard'
import { useRouter } from 'next/router'

export default function room() { /*roomInfo: GameRoomCardProps */

    const router = useRouter()
    const { roomId } = router.query
    const user = useAppSelector(state => state.auth.user)


    const fetcher = (url: RequestInfo) => fetch(url, { credentials: 'include' }).then((res) => res.json())
    //const { mutate } = useSWRConfig()
    const { data, mutate } = useSWR(`${process.env.SERVER_BASE_URL}/api/user/getgameinfo/${roomId}`, fetcher)


    return (
        <div className="md:flex lg:grid  grid-cols-4 grid-rows-4 gap-5 px-[5%] py-[5%]  h-screen ">
            <div className=" col-span-4 lg:col-span-1 bg-white px-4 py-4 rounded-xl justify-start items-center ">
                <div className="flex  flex-row justify-between items-center mb-4 flex-wrap">
                    <div className=" text-white text-3xl bg-blue-700 rounded-full tracking-tight fit px-4 py-2 mr-2">
                        1.TUR
                    </div>
                    <span className="text-blue-700 text-2xl  flex font-bold " >
                        <FaUsers className="text-blue-700 w-8 h-8 " />0/{!data ? '-' : data.user_total}
                    </span>
                    <div className="bg-blue-300 w-full h-12 relative mt-4 rounded-full flex  justify-left items-center">
                        <div className="bg-blue-600 w-[30%] h-full absolute rounded-full ">
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row-span-4 col-span-3 grid   bg-white gameroom-right  px-2 py-2 rounded-xl ">
                <div className="flex flex-wrap gap-x-2 gap-y-4">

                    <GameNavItem items={[
                        {
                            text: user.email,
                            icon: < BiUser className="text-blue-800 w-10 h-10" />
                        },
                        {
                            text: "Katlama",
                            icon: <AiFillFire className="text-blue-800 w-10 h-10" />,
                            value: "1x",
                            valueclass: "bg-blue-300"
                        },
                        {
                            text: "Kazanılan Oyun",
                            icon: <GiTrophyCup className="text-blue-800 w-10 h-10" />,
                            value: "0",
                            valueclass: "bg-blue-500"
                        }

                    ]} />

                </div>
                <div className=" bg-gray-100 rounded-xl mt-4 md:mt-0 " >
                    <GameArea user={user} {...data} />
                </div>
            </div>

            <div className="bg-white flex row-span-3  rounded-xl  flex-col items-center ">
                <h2 className="rounded-t-lg py-2 self-stretch border-b-[1px] border-blue-300 text-center bg-blue-100 text-xl font-semibold tracking-tight text-blue-900">Yarışmacılar</h2>
                <div className="px-4 py-4 flex flex-row flex-wrap overflow-scroll overflow-x-hidden scrollbar-style justify-center behaviorsmooth">
                    <Userdot count={100} />
                </div>
            </div>

        </div>
    )
}


/* for ?id=2323 parsed links
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.id) {
        return {
            notFound: true,

        };
    }
    return {
        props: { id: query.id },
    };
}
 */
room.layout = GameLayout

