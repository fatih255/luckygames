import React, { useState } from 'react'
import { GameRoomCardProps } from './GameRoomCard'
import Hand from './Hand'
import AnswerBox from './AnswerBox'

export default function GameArea({ id, label, user_total, participation_fee, user }: GameRoomCardProps) {



    return (
        <div className="flex justify-around h-full flex-col px-8 py-4">
            <div className="flex justify-around gap-x-10">
                <Hand choice="Paper" position="left" />
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


