// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Components
import MyApps from './MyApps'
import Home from './Home'
import Schema from './Schema'

// Interface
interface iProps {
  moduleName?: string
}

const Layout: FC<iProps> = ({ moduleName = '' }): ReactElement => {
  return (
    <>
      {moduleName === 'Schema' && <Schema />}
      {moduleName === 'Home' && <Home />}
      {!moduleName && <MyApps />}
    </>
  )
}

export default memo(Layout)
