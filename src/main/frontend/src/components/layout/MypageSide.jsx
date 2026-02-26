import React from 'react'
import styles from './Mypageside.module.css'
import { CiSquareChevRight } from "react-icons/ci";
import { Link } from 'react-router-dom';

const MypageSide = () => {
  return (
    <div className={styles.side}>
      <ul>
        <Link to='./cart'><li><CiSquareChevRight className={styles.icon}/>장바구니</li></Link>
        <Link to='./buy-list'><li><CiSquareChevRight className={styles.icon}/>구매내역</li></Link>
        <li><CiSquareChevRight className={styles.icon}/>내 정보수정</li>
      </ul>
    </div>
  )
}

export default MypageSide