// Dependencies
import React, { FC, ReactElement, memo, useState, useEffect } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Carousel library
import Carousel from '@brainhubeu/react-carousel'

// Styles
import styles from './Media.scss'

const Media: FC = (): ReactElement => {
  // Data for documents
  const documentsFiles = [
    {
      name: '1.doc'
    },
    {
      name: '2.xml'
    },
    {
      name: '1.pdf'
    },
    {
      name: '1.doc'
    },
    {
      name: '2.xml'
    },
    {
      name: '1.pdf'
    }
  ]

  // Local state
  const [carousel, setCarousel] = useState(false)

  // useEffect
  useEffect(() => {
    if (documentsFiles.length >= 5) {
      setCarousel(true)
    }
  })

  // Methods
  // Method for render files
  const renderFiles = (data: any): ReactElement => {
    return data.map((document: any, i: any) => {
      const extension = document.name.substr(document.name.lastIndexOf('.') + 1)

      return (
        <section key={`file-${i}`}>
          {extension === 'doc' && <i className="fas fa-file-word" style={{ color: '#0061a7' }} />}
          {extension === 'pdf' && <i className="fas fa-file-pdf" style={{ color: '#f30000' }} />}
          {extension === 'xml' && <i className="fas fa-file-excel" style={{ color: '#3b6e22' }} />}

          <span>{document.name}</span>
        </section>
      )
    })
  }

  return (
    <MainLayout title="Media" header content footer sidebar>
      <section className={styles.container}>
        <div className={styles.title}>
          My documents
          <i className={`far fa-square ${styles.modeCarousel}`} />
          <i
            className={`fas fa-border-all ${styles.modeGrid} ${!carousel ? styles.disabled : ''}`}
          />
        </div>
        <div className={styles.line} />

        <section className={styles.filesContainer}>
          {carousel ? (
            <section className={styles.carousel}>
              <Carousel arrows slidesPerScroll={6} slidesPerPage={6} infinite>
                {renderFiles(documentsFiles)}
              </Carousel>
            </section>
          ) : (
            <section className={styles.files}>{renderFiles(documentsFiles)}</section>
          )}
        </section>
      </section>
    </MainLayout>
  )
}

export default memo(Media)
