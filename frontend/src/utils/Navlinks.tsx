import React, { MouseEventHandler } from 'react'
import Link from 'next/link'

interface linksProps {
    userid?: number | null | undefined
    client: 'guest' | 'user'
    links: link[]
}


/**
 * Expected server HTML to contain a matching <svg> in <li>. err on console
 * bakiyenin bg si gelmiyor 
 */
interface link {
    name: string,
    path?: string,
    show: 'guest' | 'user'
    extraclass?: string
    icon?: JSX.Element
    onClick?: MouseEventHandler<HTMLLIElement> | undefined
}



export default function Navlinks({ links, client }: linksProps) {

    return (
        <>
            {
                links.filter(navlink => navlink.show === client)
                    .map((navlink, index) => (
                        <li onClick={navlink.onClick} key={index} className={`${navlink.extraclass ? navlink.extraclass : ''} items-center nava mr-4 cursor-pointer hover:underline transition hover:scale-105 nava text-white `} >
                            <div className=" lidiv">
                                {navlink.icon ? navlink.icon : ''}
                                {!navlink.path || typeof navlink.path === "undefined" && !navlink.onClick ? navlink.name : <Link key={index} href={navlink.path || ''} >{navlink.name}</Link>}
                            </div>
                        </li>
                    ))
            }
        </>)
}
