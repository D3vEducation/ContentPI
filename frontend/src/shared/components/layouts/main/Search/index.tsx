// Dependencies
import React, { FC, ReactElement, memo, useContext } from 'react'
import { Input } from 'fogg-ui'
import { slugFn } from 'fogg-utils'

// Contexts
import { FormContext } from '@contexts/form'

// Styles
import styles from './Search.scss'

const Search: FC = (): ReactElement => {
  // Context
  const { onChange, values } = useContext(FormContext)

  return (
    <aside className={styles.search}>
      <Input
        name="search"
        id="search"
        placeholder="Search ..."
        onChange={onChange}
        value={values.search}
      />
    </aside>
  )
}

export default memo(Search)
