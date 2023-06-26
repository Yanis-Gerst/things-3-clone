import Link from 'next/link'
import React from 'react'

interface Props {
    href: string;
    children: React.ReactNode
}
const UnderlineLink = ({href, children}: Props) => {
  return (
    <Link href={href} className="underline cursor-pointer hover:text-secondaryContentLight">{children}</Link>
  )
}

export default UnderlineLink