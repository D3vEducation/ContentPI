// Dependencies
import React, { FC, ReactElement } from 'react'

// components
import Header from '../Header'
import Footer from '../Footer'

// Styles
import styles from './Content.scss'

// Interfaces
interface iProps {
  header?: boolean
  footer?: boolean
  children: ReactElement
}

const Content: FC<iProps> = ({ children, header, footer }): ReactElement => (
  <section className={styles.content}>
    {header && <Header />}

    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
    </div>

    {footer && <Footer />}
  </section>
)

export default Content
