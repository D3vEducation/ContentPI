// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import NextLink from 'next/link'

// Interfaces
interface iProps {
  children: ReactElement
  href: string
  className?: string
  onClick?(): any
  title?: string
}

const Link: FC<iProps> = ({ href, children, className, onClick, title }): ReactElement => {
  const linkProps = {
    onClick,
    className
  }

  return (
    <NextLink as={href} href={href}>
      <a {...linkProps} title={title || href}>
        {children}
      </a>
    </NextLink>
  )
}

export default memo(Link)
