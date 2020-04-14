// Dependencies
import React, { FC, ReactElement } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import styles from './Playground.scss'

const Playground: FC = (): ReactElement => {
  return (
    <div className={styles.playground}>
      <MainLayout title="Playground" header sidebar content footer>
        <>
          <h2>Playground</h2>

          <iframe title="Playground Iframe" src="http://localhost:5000" />
        </>
      </MainLayout>
    </div>
  )
}

export default Playground
