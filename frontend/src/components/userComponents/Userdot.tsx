import React from 'react'

interface Props {
    count: number
}

export default function Userdot({ count }: Props) {
    return (
        <div className="flex flex-wrap justify-center">
            {Array.from(Array(count).keys()).map((index) =>
                <div key={index} className="m-2 transition duration-200 cursor-default hover:scale-105 hover:bg-blue-600 bg-blue-800 w-10 rounded-full h-10 justify-center flex items-center text-white" >
                    {index}
                </div>
            )}
        </div>
    )
}
