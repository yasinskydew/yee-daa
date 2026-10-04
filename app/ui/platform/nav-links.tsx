'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import clsx from 'clsx'

const links = [
    {
        name: 'Home',
        href: '/home'
    },
    {
        name: 'Cookbook',
        href: '/cookbook'
    },
    {
        name: 'Subscriptions',
        href: '/subscriptions'
    },
    {
        name: 'Profile',
        href: '/profile'
    }
]

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map(link => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx({
                            'bg-sky-100 text-blue-600': pathname === link.href
                        })}
                    >
                        {link.name}
                    </Link>
                )
            })}
        </>
    )
}