import React from 'react'
import thingsIcon from "../../../public/assets/thingsIcon.png"
import Image from 'next/image'
import NavLink from './NavLink/NavLink'


const Navbar = () => {
  const navLinkConfigs = [
    {
      content: "What's New",
      href: ""
    },
    {
      content: "Support",
      href: ""
    },
    {
      content: "Blog",
      href:""
    }
  ]
  return (
    <header className='flex justify-between items-end py-6 max-w-[900px] mx-auto w-full relative'>
        <Image src={thingsIcon} alt="The brand Icon" width={100} height={32} className='overflow-hidden w-[100px] h-[32px] object-none object-[0_-80px] '  /> 
        <nav className='w-1/3'>
            <ul className='flex w-full justify-between text-secondaryContent font-medium'>
                {navLinkConfigs.map(navLinkConfig => (
                  <NavLink key={navLinkConfig.content} href={navLinkConfig.href}>{navLinkConfig.content}</NavLink>
                ))}
            </ul>
        </nav>
        <span className='w-full h-px bg-stroke bottom-0 absolute'/>
    </header>
  )
}

export default Navbar