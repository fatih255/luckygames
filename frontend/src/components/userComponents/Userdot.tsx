import React from 'react'

interface Props {
    count: number,
    loseUsersSize: number | 0
}

const userDotStyle = (dotIndex: number, losersSize: number | 0) => {

    if (dotIndex < losersSize) {
        return 'hover:bg-red-600 bg-red-800'
    } else {
        return 'hover:bg-blue-600 bg-blue-800'
    }

}

export default function Userdot({ count, loseUsersSize }: Props) {
    return (
        <div className="flex flex-wrap justify-center">
            {Array.from(Array(count).keys()).map((index) =>
                <div key={index} className={`${userDotStyle(index, loseUsersSize)} m-2 transition duration-200 cursor-default hover:scale-105 w-10 rounded-full h-10 justify-center flex items-center text-white`} >
                    {index}
                </div>
            )}
        </div>
    )
}
