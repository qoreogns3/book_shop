import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MypageLayout.module.css'
import MypageHeader from './MypageHeader'
import MypageSide from './MypageSide'

const MypageLayout = () => {
  

  return (
    <div className={styles.container}>
      <MypageHeader/>
      <div className={styles.main}>
        <div className={styles.side}>
          <MypageSide/>
        </div>
        <div className={styles.content}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default MypageLayout