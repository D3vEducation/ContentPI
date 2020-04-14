// Dependencies
import React, { FC, ReactElement } from 'react'

// Components
import MyApps from './MyApps'
import Home from './Home'

// Interface
interface iProps {
  moduleName?: string
}

const Layout: FC<iProps> = ({ moduleName = '' }): ReactElement => {
  return (
    <>
      {moduleName === 'Home' && <Home />}
      {!moduleName && <MyApps />}
    </>
  )
}

export default Layout
