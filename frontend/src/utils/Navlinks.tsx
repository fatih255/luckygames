
import Link from 'next/link'

interface linksProps {
    userid?: number | null | undefined
    client: 'guest' | 'user',
    links: link[]
}

interface link {
    name: string,
    path?: string,
    show: 'guest' | 'user'
    extraclass?: string
    icon?: JSX.Element
}

import React from 'react'

export default function Navlinks({ links, client }: linksProps) {

    return (
        <>
            {
                links.filter(navlink => navlink.show === client)
                    .map((navlink, index) => (<li key={index} className={`${navlink.extraclass ? navlink.extraclass : ''} items-center nava mr-4 cursor-pointer hover:underline transition hover:scale-105 nava text-white flex`} >
                        {navlink.icon && navlink.icon}
                        {!navlink.path ? navlink.name : <Link key={index} href={navlink.path || ''} >{navlink.name}</Link>}
                    </li>
                    ))
            }
        </>)
}
