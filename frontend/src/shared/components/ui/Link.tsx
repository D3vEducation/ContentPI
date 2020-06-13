// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import NextLink from 'next/link'

// Interfaces
interface iProps {
  children: ReactElement
  href: string
  as?: string
  className?: string
  onClick?(): any
  title?: string
}

const Link: FC<iProps> = ({ href, as, children, className, onClick, title }): ReactElement => {
  const linkProps = {
    onClick,
    className
  }

  const props: any = {
    href
  }

  if (as) {
    props.as = as
  }

  return (
    <NextLink {...props}>
      <a {...linkProps} title={title || href}>
        {children}
      </a>
    </NextLink>
  )
}

export default memo(Link)
