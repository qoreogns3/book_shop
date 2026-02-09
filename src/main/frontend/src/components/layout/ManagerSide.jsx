import React from 'react'
import styles from './ManagerSide.module.css'
import { CiShoppingBasket, CiSquareChevRight, CiMoneyCheck1 } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";

const ManagerSide = () => {
  return (
    <div className={styles.side}>
      <ul>
        <li><CiShoppingBasket className={styles.icon}/>상품관리
          <ul>
            <li><CiSquareChevRight className={styles.icon}/>카테고리관리</li>
            <li><CiSquareChevRight className={styles.icon}/>상품등록</li>
            <li><CiSquareChevRight className={styles.icon}/>상품재고관리</li>
            <li><CiSquareChevRight className={styles.icon}/>상품정보수정</li>
          </ul>
        </li>
      </ul>
      <hr className={styles.hr}/>
      <ul>
        <li><CiMoneyCheck1 className={styles.icon}/>구매관리
          <ul>
            <li><CiSquareChevRight className={styles.icon}/>구매내역조회</li>
            <li><CiSquareChevRight className={styles.icon}/>월별매출관리</li>
            <li><CiSquareChevRight className={styles.icon}/>주간매출관리</li>
          </ul>
        </li>
      </ul>
      <hr className={styles.hr}/>
      <ul>
        <li><BsPerson className={styles.icon}/>회원관리
          <ul>
            <li><CiSquareChevRight className={styles.icon}/>회원정보조회</li>
            <li><CiSquareChevRight className={styles.icon}/>회원상태변경</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default ManagerSide