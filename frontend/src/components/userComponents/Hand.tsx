import React from 'react'

//left hands
import LeftRock from "../../../public/assets/gameicon/l_rock.svg"
import LeftPaper from "../../../public/assets/gameicon/l_paper.svg"
import LeftScissors from "../../../public/assets/gameicon/l_scissors.svg"
//right hands
import RightRock from "../../../public/assets/gameicon/r_rock.svg"
import RightPaper from "../../../public/assets/gameicon/r_paper.svg"
import RightScissors from "../../../public/assets/gameicon/r_scissors.svg"

interface Props {
    choice: 'Rock' | 'Paper' | 'Scissors'
    position: 'left' | 'right'

}

const leftSettings = {
    className: 'animate-shakelefthand origin-bottom-left',
    Rock: <LeftRock className="fill-current text-blue-600" width={185} height={185} />,
    Paper: <LeftPaper className="fill-current text-blue-600" width={185} height={185} />,
    Scissors: <LeftScissors className="fill-current text-blue-600" width={185} height={185} />
}

const rightSettings = {
    className: 'animate-shakerighthand origin-bottom-right',
    Rock: <RightRock className="fill-current text-blue-600" width={185} height={185} />,
    Paper: <RightPaper className="fill-current text-blue-600" width={185} height={185} />,
    Scissors: <RightScissors className="fill-current text-blue-600" width={185} height={185} />,
}


export default function Hand({ choice, position }: Props) {

    return (

        <div className={`${position === 'left' ? leftSettings['className'] : rightSettings['className']} select-none animate`}>
            {position === 'left' ? leftSettings[choice] : rightSettings[choice]}
        </div>
    )
}
