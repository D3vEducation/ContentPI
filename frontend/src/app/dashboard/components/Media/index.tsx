// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

const Media: FC = (): ReactElement => {
  return (
    <MainLayout title="Media" header content footer sidebar>
      <h1>Media</h1>
    </MainLayout>
  )
}

export default memo(Media)
