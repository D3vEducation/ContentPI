// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Toggle, LinkButton, Menu, Icon } from 'fogg-ui'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Link from '@ui/Link'

// Styles
import styles from './Enumerations.scss'

interface iProps {
  data: any
  router: any
}

const Enumerations: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const { getEnumerationsByAppId } = data

  // First render
  if (!getEnumerationsByAppId) {
    return <div />
  }

  return (
    <>
      <MainLayout title="Enumerations" header content footer sidebar router={router}>
        <div className={styles.enumerations}>
          {getEnumerationsByAppId.map((enumeration: any) => {
            const values = JSON.parse(enumeration.values)

            return (
              <div className={styles.enumeration}>
                <div className={styles.information}>
                  <h3 className={styles.name}>{enumeration.enumerationName}</h3>{' '}
                  <span className={styles.identifier}>#{enumeration.identifier}</span>
                </div>

                <div className={styles.values}>
                  {values.map((value: any) => (
                    <span className={styles.value}>{value.value}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </MainLayout>
    </>
  )
}

export default memo(Enumerations)
