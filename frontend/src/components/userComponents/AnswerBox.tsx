import React, { useEffect, useState } from 'react'
import LeftRock from "../../../public/assets/gameicon/l_rock.svg"
import LeftPaper from "../../../public/assets/gameicon/l_paper.svg"
import LeftScissors from "../../../public/assets/gameicon/l_scissors.svg"
import socketService from '../../../services/socketService'
import gameService from '../../../services/gameService'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changeAnswer } from '../../../redux/slices/gameSlice'

interface Props {
    choice: 'rock' | 'paper' | 'scissors'
    label: 'Taş' | 'Kağıt' | 'Makas'

}

export default function AnswerBox({ choice, label }: Props) {

    const game = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()
    const ChoiceIcons = {
        className: 'animate-shakelefthand origin-bottom-left',
        rock: <LeftRock className={`${game.answer === choice ? 'text-white' : ''} group group-hover:text-white fill-current text-blue-600`} width={50} height={50} />,
        paper: <LeftPaper className={`${game.answer === choice ? 'text-white' : ''} group group-hover:text-white fill-current text-blue-600`} width={50} height={50} />,
        scissors: <LeftScissors className={`${game.answer === choice ? 'text-white' : ''} group group-hover:text-white fill-current text-blue-600`} width={50} height={50} />
    }

    const changeAnswerHandler = (answer: 'rock' | 'paper' | 'scissors') => {
        dispatch(changeAnswer(answer))
        if (socketService.socket) {
            gameService.updateGame(socketService.socket, {answer})
        }
    }

    const handleGameUpdate = () => {
        if (socketService.socket)
            gameService.onGameUpdate(socketService.socket, ({ answer }) => {
                dispatch(changeAnswer(answer))
            });
    };


    useEffect(() => {
        handleGameUpdate();
    }, [])

    return (
        <div onClick={() => changeAnswerHandler(choice)} className={`${game.answer === choice ? 'bg-blue-600' : 'bg-white '} group  cursor-pointer w-full rounded-full shadow-md flex  justify-center items-center px-4 py-4 translate-all duration-150 hover:bg-blue-600 hover:scale-105`}>
            {ChoiceIcons[choice]}
            <span className={`ml-4 group-hover:text-white ${game.answer === choice ? 'text-white' : ''} `}>{label}</span>
        </div>
    )
}
