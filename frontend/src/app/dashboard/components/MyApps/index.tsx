// Dependencies
import React, { FC, ReactElement, useContext, useEffect, memo } from 'react'

// Contexts
import { AppContext } from '@contexts/app'

// Queries
import GET_APPS_QUERY from '@graphql/apps/getApps.query'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Logo from '@layouts/main/Logo'
import Cards from '@layouts/main/Cards'

// Styles
import styles from './MyApps.scss'

const MyApps: FC = (): ReactElement => {
  // Contexts
  const { get, state } = useContext(AppContext)

  // Methods
  const fetch = async (): Promise<void> => {
    await get({
      query: GET_APPS_QUERY
    })
  }

  // Effects
  useEffect(() => {
    if (!state.getApps) {
      fetch()
    }
  }, [state])

  // First render
  if (!state.getApps) {
    return <div />
  }

  return (
    <MainLayout title="MyApps">
      <div className={styles.myApps}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>

        <Cards items={state.getApps} />
      </div>
    </MainLayout>
  )
}

export default memo(MyApps)
