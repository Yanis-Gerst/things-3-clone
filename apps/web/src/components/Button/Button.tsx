import React from 'react'

interface Props {
    children: React.ReactNode
}
const Button = ({children}: Props) => {
  return (
    <button className='w-full py-2 bg-primary font-bold rounded transition-all hover:bg-[#0A53BF]'>
        {children}
    </button>
  )
}

export default Button