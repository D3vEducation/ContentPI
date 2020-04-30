// Dependencies
import React, { FC, ReactElement, memo, useState, useEffect } from 'react'
import { cx } from 'fogg-utils'

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
      name: '3.pdf'
    },
    {
      name: '4.doc'
    },
    {
      name: '1.doc'
    },
    {
      name: '2.xml'
    },
    {
      name: '3.pdf'
    },
    {
      name: '4.doc'
    }
  ]

  // Data for pictures
  const pictureFiles = [
    {
      name: 'Picture 1',
      imgUrl: 'http://localhost:3000/images/logo.png'
    }
  ]

  // Local state
  const [carousel, setCarousel] = useState(false)
  const [modeGrid, setModeGrid] = useState(false)

  // useEffect
  useEffect(() => {
    if (documentsFiles.length >= 5) {
      setCarousel(true)
    }
  }, [])

  // Methods
  // Method for render files
  const renderFiles = (data: any): ReactElement => {
    return data.map((item: any, i: any) => {
      const extension = item.name.substr(item.name.lastIndexOf('.') + 1)

      return (
        <section key={`file-${i}`} className={styles.item}>
          {extension === 'doc' && <i className="fas fa-file-word" style={{ color: '#0061a7' }} />}
          {extension === 'pdf' && <i className="fas fa-file-pdf" style={{ color: '#f30000' }} />}
          {extension === 'xml' && <i className="fas fa-file-excel" style={{ color: '#3b6e22' }} />}

          {item.imgUrl ? <img src={item.imgUrl} alt={item.name} /> : <span>{item.name}</span>}
        </section>
      )
    })
  }

  // Method to handle mode grid or carousel
  const handleMode = (mode: any): any => {
    if (documentsFiles.length >= 5) {
      if (mode === 'grid') {
        setCarousel(false)
        setModeGrid(true)
      } else {
        setCarousel(true)
        setModeGrid(false)
      }
    }
  }

  return (
    <MainLayout title="Media" header content footer sidebar>
      <section className={styles.container}>
        <div className={styles.title}>
          My documents
          <i
            className={`far fa-square ${styles.modeCarousel} ${!modeGrid ? styles.disabled : ''}`}
            onClick={(): void => handleMode('carousel')}
          />
          <i
            className={`fas fa-border-all ${styles.modeGrid} ${!carousel ? styles.disabled : ''}`}
            onClick={(): void => handleMode('grid')}
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
            <section className={`${styles.files} ${modeGrid ? styles.modeGrid : ''}`}>
              {renderFiles(documentsFiles)}
            </section>
          )}
        </section>

        <div className={styles.title}>My Pictures</div>
        <div className={styles.line} />
        <section className={styles.filesContainer}>
          <section className={cx(styles.files, styles.modeGrid)}>
            {renderFiles(pictureFiles)}
          </section>
        </section>
      </section>
    </MainLayout>
  )
}

export default memo(Media)
