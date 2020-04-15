// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Styles
import styles from './Fields.scss'

const Fields: FC = (): ReactElement => {
  const fields = [
    {
      title: 'String',
      name: 'string inline',
      icon: 'fas fa-text-width',
      color: 'blue'
    },
    {
      title: 'Text',
      name: 'text',
      icon: 'far fa-file-alt',
      color: 'pink'
    },
    {
      title: 'Integer',
      name: 'integer',
      icon: 'fas fa-address-card',
      color: 'yellow'
    },
    {
      title: 'Float',
      name: 'float',
      icon: 'fas fa-asterisk',
      color: 'green'
    },
    {
      title: 'Boolean',
      name: 'boolean',
      icon: 'fas fa-check-square',
      color: 'purple'
    },
    {
      title: 'Json',
      name: 'json',
      icon: 'fab fa-algolia',
      color: 'red'
    }
  ]

  return (
    <section className={styles.fields}>
      <ul>
        {fields.map(option => (
          <li key={option.name}>
            <div>
              <p>{option.title}</p>

              <div className={styles.widgetOption} title={option.title}>
                <i className={`${option.icon} ${styles[option.color]}`} />
                <span>{option.name}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default memo(Fields)
