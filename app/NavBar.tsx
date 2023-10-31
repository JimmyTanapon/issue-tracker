'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import classNames from 'classnames'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Text, DropdownMenu, Flex } from '@radix-ui/themes'
import {Skeleton} from '@/app/components'

const NavBar = () => {

    const { status, data: session } = useSession()
    console.log(session?.user?.email)

    return (
        <nav className='   border-b mb-5 px-5  h-14  py-3  '>

            <Flex justify={'between'}>
                <Flex align={'center'} gap={'4'}>
                    <Link href={'/'}><AiFillBug /></Link>
                    <NavLink />
                </Flex>
                <AuthStatus />

            </Flex>




        </nav>

    )
}
const NavLink = () => {
    const currentPath = usePathname()

    const links = [
        { lable: 'Dashboard', href: '/' },
        { lable: 'Issues', href: '/issues/list' }

    ]
    return (
        <ul className=' flex  space-x-6'>
            {links.map(link => (
                <li key={link.href}>
                    <Link

                        className={classNames({
                            'nav-link':true,
                            '!text-zinc-900': link.href === currentPath,
                           
                        })}
                        href={link.href}>{link.lable}
                    </Link>
                </li>
            ))}

        </ul>
    )
}
const AuthStatus = () => {
    const { status, data: session } = useSession()
    if (status === 'loading') return <Skeleton width={'3rem'}/>

    if (status === 'unauthenticated')
        return <Link  className='nav-link' href={`/api/auth/signin`}>Login</Link>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger >
                    <Avatar
                        src={session!.user!.image!}
                        fallback='?'
                        size={'2'}
                        radius='full'
                        className=' cursor-pointer'
                        referrerPolicy='no-referrer'
                    />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Label >
                        <Text size={'2'}>
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>

                    <DropdownMenu.Item >
                        <Link href={`/api/auth/signout`}>Log out</Link>
                    </DropdownMenu.Item>

                </DropdownMenu.Content>
            </DropdownMenu.Root>



        </Box>)
}

export default NavBar

