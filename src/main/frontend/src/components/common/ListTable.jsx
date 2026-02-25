import React from 'react'
import styles from './ListTable.module.css'

const ListTable = ({children, ...props}) => {
  return (
    <table
      className={styles.list_table}
      {...props}
    >
      {children}
    </table>
  )
}

export default ListTable