import Link from 'next/link'
import React from 'react'

interface Props {
    children: React.ReactNode,
    href: string
}
const NavLink = ({children, href}: Props) => {
  return (
    <Link href={href} className='hover:bg-tag hover:text-secondaryContentLight py-1 px-2 rounded cursor-pointer'>{children}</Link>
  )
}

export default NavLink