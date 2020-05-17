// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Toggle, LinkButton, Menu } from 'fogg-ui'

// Components
import DeleteModelModal from '@dashboard/components/Modals/DeleteModelModal'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Fields from './Fields'
import Declarations from './Declarations'

// Styles
import styles from './Schema.scss'

interface iProps {
  data: any
}

const Schema: FC<iProps> = ({ data }): ReactElement => {
  // State
  const [showSystem, setShowSystem] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [modalData, setModalData] = useState({})

  // Methods
  const handleDeleteModal = (): void => setIsOpenDelete(!isOpenDelete)
  const handleMenu = (): void => setIsOpen(!isOpen)
  const handleDelete = (id: any): any => {
    handleMenu()
    handleDeleteModal()
    setModalData({ id })
  }

  // Data
  const { getModel, getDeclarations } = data

  // First render
  if (!getModel && !getDeclarations) {
    return <div />
  }

  return (
    <>
      <DeleteModelModal
        label="Delete Model"
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
        options={{
          data: modalData,
          position: 'center',
          width: '600px'
        }}
      />

      <MainLayout title="Schema" header content footer sidebar>
        <div className={styles.schema}>
          <div className={styles.model}>
            <h3 className={styles.name}>{getModel.modelName}</h3>{' '}
            <span className={styles.identifier}>#{getModel.identifier}</span>
            <LinkButton onClick={handleMenu}>•••</LinkButton>
            <Menu
              isOpen={isOpen}
              items={[
                {
                  option: 'Edit Model',
                  icon: 'edit',
                  onClick: (): void => console.log('Edit')
                },
                {
                  option: 'Delete Model',
                  icon: 'trash',
                  onClick: (): void => handleDelete(getModel.id)
                }
              ]}
            />
          </div>

          <div className={styles.toggle}>
            <Toggle
              checked={showSystem}
              type="round"
              label="Show system fields"
              onChange={(): void => setShowSystem(!showSystem)}
            />
          </div>

          <div className={styles.wrapper}>
            <Fields fields={getModel.fields} showSystem={showSystem} />
            <Declarations model={getModel} declarations={getDeclarations} />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default memo(Schema)
