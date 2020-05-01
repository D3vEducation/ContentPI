// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Badge } from 'fogg-ui'

// Modals
import CreateModelModal from '@dashboard/components/Modals/CreateModelModal'

// Styles
import styles from './ModelSidebar.scss'

interface iProps {
  app: any
}

const ModelSidebar: FC<iProps> = ({ app }): ReactElement => {
  // Local state
  const [isOpen, setIsOpen] = useState(false)

  // Method to open modal
  const handleModal = (): void => setIsOpen(!isOpen)

  // Models
  const { models = [] } = app

  return (
    <>
      <CreateModelModal
        label="Create new Model"
        isOpen={isOpen}
        onClose={handleModal}
        options={{
          position: 'center',
          width: '400px'
        }}
      />

      <div className={styles.modelSidebar}>
        <div className={styles.wrapper}>
          <span className={styles.models}>Models</span>
          <span className={styles.create}>
            <Badge onClick={handleModal}>+ Create</Badge>
          </span>
        </div>

        <div className={styles.modelsWrapper}>
          {models.map((model: any) => (
            <div key={model.id}>
              <a href={`/dashboard/${app.id}/master/schema/model/${model.identifier}`}>
                {model.modelName}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default memo(ModelSidebar)
