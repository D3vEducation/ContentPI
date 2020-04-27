// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { DarkButton } from 'fogg-ui'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import styles from './Media.scss'

const Media: FC = (): ReactElement => {
  return (
    <MainLayout title="Media" header content footer sidebar>
      <section className={styles.container}>
        <DarkButton name="upload" className={styles.upload}>
          Upload
        </DarkButton>

        <section className={styles.fileTypes}>
          <section className={styles.type}>
            <span>My documents</span>
            <span className={styles.line} />
            <section className={styles.items}>
              <article className={styles.item}>
                <i className="fas fa-file-word" />
                <span>myBusiness.doc</span>
              </article>
              <article className={styles.item}>
                <i className="fas fa-file-pdf" />
                <span>myBusiness.doc</span>
              </article>
              <article className={styles.item}>
                <i className="fas fa-file-excel" />
                <span>myBusiness.doc</span>
              </article>
            </section>
          </section>
        </section>
      </section>
    </MainLayout>
  )
}

export default memo(Media)
