// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Component
import Link from '@ui/Link'

// Styles
import styles from './ContentSidebar.scss'

interface iProps {
  app: any
}

const ContentSidebar: FC<iProps> = ({ app }): ReactElement => {
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
              <Link href={`/dashboard/${app.id}/master/content/model/${model.identifier}`}>
                {model.modelName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default memo(ContentSidebar)
