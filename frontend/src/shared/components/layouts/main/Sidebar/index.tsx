// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Icon } from 'fogg-ui'

// Contexts
import { AppContext } from '@contexts/app'

// Components
import Link from '../../../ui/Link'
import Logo from '../Logo'
import AppIcon from '../AppIcon'

// Styles
import styles from './Sidebar.scss'

const Sidebar: FC = (): ReactElement => {
  // State
  const [open, setOpen] = useState(false)

  // Contexts
  const {
    state: { getAppById }
  } = useContext(AppContext)

  // Methods
  const handleOpen = (): void => setOpen(!open)

  return (
    <aside className={styles.sidebar}>
      <section className={styles.firstOptions}>
        <div className={styles.isoType}>
          <Logo />
        </div>

        <ul>
          {getAppById && (
            <li className={styles.appIcon}>
              <AppIcon app={getAppById} hideName />
            </li>
          )}

          <li onClick={handleOpen}>
            <Link href="#" title="Models">
              <Icon type="fas fa-cubes" />
            </Link>
          </li>

          <li>
            <Link href="#" title="Content">
              <Icon type="fas fa-pencil-alt" />
            </Link>
          </li>

          <li>
            <Link href="#" title="Media">
              <Icon type="fas fa-photo-video" />
            </Link>
          </li>

          <li>
            <Link href="/dashboard/playground" title="Playground">
              <Icon type="fas fa-play" />
            </Link>
          </li>
        </ul>

        <section className={styles.profile}>
          <span title="Carlos Santana">CS</span>
        </section>
      </section>

      <section
        className={`${styles.closed} ${open ? `${styles.secondOptions}` : ''}`}
      >
        <div className={styles.close} onClick={handleOpen}>
          <span>
            <Icon type="fas fa-arrow-left" />
          </span>
        </div>

        <div className={styles.subOptions}>
          <ul>
            <li>
              <a href="#">Option A</a>
            </li>

            <li>
              <a href="#">1 A</a>
            </li>

            <li>
              <a href="#">1 B</a>
            </li>

            <li>
              <a href="#">1 C</a>
            </li>
          </ul>
        </div>
      </section>
    </aside>
  )
}

export default memo(Sidebar)
