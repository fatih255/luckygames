import React from 'react'
import LeftRock from "../../../public/assets/gameicon/l_rock.svg"
import LeftPaper from "../../../public/assets/gameicon/l_paper.svg"
import LeftScissors from "../../../public/assets/gameicon/l_scissors.svg"
interface Props {
    choice: 'Rock' | 'Paper' | 'Scissors'
    label: 'Taş' | 'Kağıt' | 'Makas'
}

export default function AnswerBox({ choice, label }: Props) {

    const ChoiceIcons = {
        className: 'animate-shakelefthand origin-bottom-left',
        Rock: <LeftRock className="group group-hover:text-white fill-current text-blue-600" width={50} height={50} />,
        Paper: <LeftPaper className="group group-hover:text-white fill-current text-blue-600" width={50} height={50} />,
        Scissors: <LeftScissors className="group group-hover:text-white fill-current text-blue-600" width={50} height={50} />
    }
    return (
        <div className="group  cursor-pointer w-full rounded-full bg-white shadow-md flex  justify-center items-center px-4 py-4 translate-all duration-150 hover:bg-blue-600 hover:scale-105">
            {ChoiceIcons[choice]}
            <span className="ml-4 group-hover:text-white">{label}</span>
        </div>
    )
}
