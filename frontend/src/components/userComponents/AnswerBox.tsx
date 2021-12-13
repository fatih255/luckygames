import React, { useEffect, useState } from 'react'
import LeftRock from "../../../public/assets/gameicon/l_rock.svg"
import LeftPaper from "../../../public/assets/gameicon/l_paper.svg"
import LeftScissors from "../../../public/assets/gameicon/l_scissors.svg"
import socketService from '../../../services/socketService'
import gameService from '../../../services/gameService'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changeAnswer, changeloseCount, GameReset, GameTour, GameWin, opposingPlayerAnswer } from '../../../redux/slices/gameSlice'
import roomService from '../../../services/roomService'

interface Props {
    choice: 'rock' | 'paper' | 'scissors'
    label: 'Taş' | 'Kağıt' | 'Makas'

}

export default function AnswerBox({ choice, label }: Props) {

    const game = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()
    const ChoiceIcons = {
        className: 'animate-shakelefthand origin-bottom-left',
        rock: <LeftRock className={`${game.timeover && game.answer === 'rock' ? 'text-white' : ''} ${game.timeover && game.opposinganswer === 'rock' ? 'text-white' : 'text-blue-600'} ${!game.timeover && game.answer === 'rock' ? 'text-white' : 'text-blue-600'} ${!game.timeover ? 'group-hover:text-white' : ''}  fill-current `} width={50} height={50} />,
        paper: <LeftPaper className={`${game.timeover && game.answer === 'paper' ? 'text-white' : ''} ${game.timeover && game.opposinganswer === 'paper' ? 'text-white' : 'text-blue-600'} ${!game.timeover && game.answer === 'paper' ? 'text-white' : 'text-blue-600'} ${!game.timeover ? 'group-hover:text-white' : ''} fill-current `} width={50} height={50} />,
        scissors: <LeftScissors className={`${game.timeover && game.answer === 'scissors' ? 'text-white' : ''} ${game.timeover && game.opposinganswer === 'scissors' ? 'text-white' : 'text-blue-600'} ${!game.timeover && game.answer === 'scissors' ? 'text-white' : 'text-blue-600'} ${!game.timeover ? 'group-hover:text-white' : ''} fill-current `} width={50} height={50} />
    }

    const changeAnswerHandler = (answer: 'rock' | 'paper' | 'scissors') => {
        dispatch(changeAnswer(answer))
        if (socketService.socket) {
            gameService.updateGame(socketService.socket, { answer })
        }
    }

    const handleGameUpdate = () => {
        if (socketService.socket)
            gameService.onGameUpdate(socketService.socket, ({ answer }) => {
                dispatch(opposingPlayerAnswer(answer))
            });
    };

    //count losers
    const changeRoomValuesHandler = () => {
        dispatch(changeloseCount(game.loseCount + 1))
        if (socketService.socket) {
            roomService.updateRoom(socketService.socket, {
                loseCount: game.loseCount + 1,
                id: game.roomId as number
            })
        }
    }
    //when losers change send data all room
    const handleRoomValuesUpdateListiner = () => {
        if (socketService.socket)
            roomService.onRoomUpdate(socketService.socket, (roomvalues) => {
                game.roomId === roomvalues.id && dispatch(changeloseCount(roomvalues.loseCount + 1))

            });
    };
    //get opposite user socket 
    const handleGetOppositeUserSocket = () => {
        if (socketService.socket) {

            gameService.onGameStart(socketService.socket, (sockets) => {
                console.log("Own Socket :", socketService.socket)
                console.log(sockets)
            })
        }
    }

    useEffect(() => {
        handleGameUpdate();
        handleGetOppositeUserSocket();
        handleRoomValuesUpdateListiner();
        if (game.timeover) {
            //update game when time is over
            //win game check

            //draw 
            console.log(`${game.answer} === ${game.opposinganswer}`)
            if (game.answer === game.opposinganswer) {
                dispatch(GameWin('draw'))
            } else {
                if (game.answer === 'paper' && game.opposinganswer === 'rock' ||
                    game.answer === 'rock' && game.opposinganswer === 'scissors' ||
                    game.answer === 'scissors' && game.opposinganswer === 'paper') {
                    dispatch(GameWin('win'))
                    dispatch(GameTour(game.tour + 1))
                } else {
                    dispatch(GameWin('lose'))
                    changeRoomValuesHandler()
                }
            }

        }


    }, [game.timeover])

    const AnswerBgReturner = (manual: "win" | "lose" | "draw" | null = game.win) => {

        switch (manual) {
            case 'win':
                return 'bg-green-600'
            case 'lose':
                return 'bg-red-600'
            case 'draw':
                return 'bg-yellow-600'
            default:
                return 'bg-white'
        }
    }

    return (
        <div onClick={() => !game.timeover && changeAnswerHandler(choice)} className={`
      ${game.timeover && game.answer === choice && AnswerBgReturner() /* if answer selected bg */}
      ${game.timeover && game.win === 'lose' && choice === game.opposinganswer && AnswerBgReturner('win') /* if lose game selected opposite answer */}
      ${game.timeover && game.win === 'win' && choice === game.opposinganswer && AnswerBgReturner('lose') /* if win game selected  answer change bg*/}
      ${!game.timeover && game.answer === choice && 'bg-blue-600' /* if choice selected in not expired time */}
        ${game.timeover ? 'select-none cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-105'} 
        group  cursor-pointer w-full rounded-full shadow-md flex  justify-center items-center px-4 py-4 translate-all duration-150 `}>
            {ChoiceIcons[choice]}
            <span className={`ml-4 ${game.timeover && game.opposinganswer === choice ? 'text-white' : ''} ${game.timeover && game.win === 'lose' && choice === game.opposinganswer && 'text-white'} ${!game.timeover ? 'group-hover:text-white' : ''} ${game.answer === choice ? 'text-white' : ''} `}>{label}</span>
        </div>
    )
}
