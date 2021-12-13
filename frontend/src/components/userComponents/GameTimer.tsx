import React, { useEffect, useState } from 'react'
import { BiTime } from 'react-icons/bi';
import { TimerSettings, useTimer } from 'react-timer-hook';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { GameReset, TimeOver } from '../../../redux/slices/gameSlice';
import gameService from '../../../services/gameService';
import socketService from '../../../services/socketService';

interface IProps {
    startTime: boolean
    restartTime: boolean
}

export default function GameTimer({ expiryTimestamp, restartTime, autoStart, startTime }: TimerSettings & IProps) {

    const game = useAppSelector(state => state.game)
    //const [TimeStarted, setTimeStarted] = useState<boolean>(startTime)
    const dispatch = useAppDispatch()
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        autoStart, expiryTimestamp, onExpire: () => {

            dispatch(TimeOver(true))


        }
    });




    //TTTTT
    //if draw round restart time and play again
    useEffect(() => {
        if (startTime && socketService.socket) {

            gameService.GameStart(socketService.socket, game.roomId)
        }
        startTime && start()

        if (restartTime) {
            console.log(expiryTimestamp)
            restart(expiryTimestamp, autoStart)
            start()
            dispatch(TimeOver(false))
        }

    }, [startTime, restartTime])

    /*
        useEffect(() => {
    
            if (game.win === 'draw') {
                if (!waitingDrawRound) {
                    dispatch(GameReset())
                    restart(expiryTimestamp, autoStart)
                    start()
                    setwaitingDrawRound(true)
                    console.log('ttt')
                } else {
                    setwaitingDrawRound(false)
                }
            }
        }, [game.win]) */

    return (
        <div className="flex mt-2 flex-row justify-center items-center">
            <BiTime className="text-blue-600 w-8 h-8 mr-2" />
            <div className="font-bold text-blue-600 text-3xl">
                <span>{seconds === 0 ? `${seconds}0` : seconds}</span>
            </div>
        </div>
    )
}
