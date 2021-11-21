import React from 'react'
import { GameRoomCardProps } from './GameRoomCard'
import Hand from './Hand'
import AnswerBox from './AnswerBox'





export default function GameArea({ id, label, user_total, participation_fee }: GameRoomCardProps) {

    //game info
    //console.log(id, label, user_total, participation_fee)
    return (
        <div className="flex justify-around h-full flex-col px-8 py-4">
            <div className="flex justify-around gap-x-10">
                <Hand choice="Paper" position="left" />
                <Hand choice="Paper" position="right" />
            </div>
            <div className="flex flex-col gap-y-4 items-center">
                <AnswerBox choice="Rock" label="Taş" />
                <AnswerBox choice="Paper" label="Kağıt" />
                <AnswerBox choice="Scissors" label="Makas" />
            </div>
        </div>
    )
}


