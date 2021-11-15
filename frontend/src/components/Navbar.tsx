import React from 'react'
import { Navlinks } from '../utils/data'
import Link from 'next/link'

interface Nav {
    disableFixed: boolean
}

export default function Navbar({ disableFixed = true }: Nav) {
    return (
        <nav className={`bg-black  w-full z-30 ${disableFixed ? '' : 'fixed'}`}>
            <div className="mx-20  flex h-14 justify-between items-center ">
                <span className="font-bold text-3xl text-white"><Link href="/">Luckyrpto</Link></span>
                <ul className="flex self-stretch">
                    {Navlinks.map((navlink, index) => (
                        <li key={index} className="nava mr-4 hover:underline transition hover:scale-105 nava text-white flex">
                            <Link key={index} href={navlink.path}>
                                {navlink.name}
                            </Link>
                        </li>

                    ))}
                </ul>
            </div>
        </nav>
    )
}
