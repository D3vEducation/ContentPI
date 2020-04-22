// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Styles
import styles from './Header.scss'

// Components
import Breadcrumbs from '../Breadcrumbs'
import Search from '../Search'

const Header: FC = (): ReactElement => {
  return (
    <header className={styles.Header}>
      <Search />
      <Breadcrumbs />
    </header>
  )
}

export default memo(Header)
