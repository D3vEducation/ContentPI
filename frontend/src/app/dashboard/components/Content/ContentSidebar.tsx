// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Constants
import { CONTENT_LINK } from '@constants/links'

// Component
import Link from '@ui/Link'

// Styles
import styles from './ContentSidebar.scss'

interface iProps {
  app: any
  router: any
}

const ContentSidebar: FC<iProps> = ({ app, router }): ReactElement => {
  // Models
  const { models = [] } = app

  return (
    <>
      <div className={styles.contentSidebar}>
        <div className={styles.wrapper}>
          <span className={styles.models}>Content</span>
        </div>

        <div className={styles.modelsWrapper}>
          {models.map((model: any) => (
            <div key={model.id}>
              <Link href={CONTENT_LINK(router)}>{model.modelName}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default memo(ContentSidebar)
