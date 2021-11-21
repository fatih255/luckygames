import React from 'react'
import { IconBaseProps } from 'react-icons/lib'


interface Props {
    items: item[]
}

interface item {
    text: string | null,
    icon: JSX.Element,
    value?: string,
    valueclass?: string
}

export default function GameNavItem({ items }: Props) {
    return (
        <div className="flex px-4 flex-wrap">
            {items.map(({ text, icon, value, valueclass }, index) => (
                <div className="flex justify-center items-center mr-6" key={index}>
                    <div>{icon}</div>
                    <span className="ml-2 text-lg font-medium text-blue-700">{text}</span>
                    {value && <span className={`px-2 py-2 rounded-lg text-white text-xl ml-2 ${valueclass || ''}`}>{value}</span>}
                </div>
            ))}
        </div >
    )
}
