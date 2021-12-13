import React, { useState } from 'react'
import { GameRoomCardProps } from './GameRoomCard'
import Hand from './Hand'
import AnswerBox from './AnswerBox'
import GameTimer from './GameTimer'
import { FaUsers } from 'react-icons/fa'
import { useAppSelector } from '../../../redux/hooks'


export default function GameArea({ id, label, user_total, participation_fee, user }: GameRoomCardProps) {
    const time = new Date();
    const game = useAppSelector(state => state.game)
    time.setSeconds(time.getSeconds() + game.gameStartSecond); // 10 minutes timer = 600 seconds
    const waitingUserSize = user_total - Number(game.joinedUsersTotal)
    //console.log(waitingUserSize)
    return (
        <div className="flex justify-around h-full flex-col px-8 py-4">
            <div className="flex justify-around gap-x-10">
                <Hand choice="Paper" position="left" />
                <div className="flex flex-col justify-center items-center">
                    {waitingUserSize > 0 ?
                        <div className="flex flex-row justify-center items-center">
                            <FaUsers className="text-blue-700 w-8 h-8 " />
                            <span className="ml-3 ">{waitingUserSize} Oyuncu Bekleniyor...</span>
                        </div>
                        :
                        !game.timeover && game.win !== 'draw' ?
                            <span className=" text-blue-600">Oyun Başladı (Tahminizi Seçiniz)</span>:
                            <span className=" text-blue-600">Tekrar Tahmininizi Yapın</span>
                    }

                    <GameTimer
                        startTime={waitingUserSize === 0}
                        restartTime={game.win === 'draw'}
                        expiryTimestamp={time}
                        autoStart={false} />
                    {game.timeover && <span className="text-white px-4 py-1 rounded-full mt-5 text-3xl font-semibold bg-blue-600 ">
                        {game.win === 'win' && 'KAZANDINIZ !!!'}
                        {game.win === 'lose' && 'KAYBETTİNİZ !!!'}
                        {game.win === 'draw' && 'BERABERE !!!'}
                    </span>}
                    {!game.timeover && game.win === 'draw' && <span className="text-white px-4 py-1 rounded-full mt-5 text-3xl font-semibold bg-blue-600 ">
                        BERABERE !!!
                    </span>}
                </div>
                <Hand choice="Paper" position="right" />
            </div>
            <div className="flex flex-col gap-y-4 items-center">
                <AnswerBox choice="rock" label="Taş" />
                <AnswerBox choice="paper" label="Kağıt" />
                <AnswerBox choice="scissors" label="Makas" />
            </div>
        </div>
    )
}


