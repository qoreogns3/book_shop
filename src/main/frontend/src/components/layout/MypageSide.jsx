import React from 'react'
import styles from './Mypageside.module.css'
import { CiSquareChevRight } from "react-icons/ci";
import { NavLink } from 'react-router-dom';

const MypageSide = () => {
  
  // <navLink to='이동할 url' className={(param)=>{}}></nav>
  // navLink 컴포넌트의 className props 에는 화살표 함수가 들어온다.
  // 이 화살표 함수의 매개면수를 출력하면 다음과 같은 데이터를 얻을수 있다
  //  {isActive: false, isPending: false, isTransitioning: false}
  // isActive key의 value는 해당 메뉴가 선택됐을때는 true, 그렇지 않으면 false값을 가진다.
  return (
    <div className={styles.side}>
      <ul>
        <NavLink 
          to='./cart'
          className={(param)=> param.isActive ? styles.active : ''}
        ><li><CiSquareChevRight className={styles.icon}/>장바구니</li></NavLink>
        <NavLink 
          to='./buy-list'
          className={(param)=> param.isActive ? styles.active : ''}
        ><li><CiSquareChevRight className={styles.icon}/>구매내역</li></NavLink>
        <NavLink 
          to='./my-pages'
          className={(param)=> param.isActive ? styles.active : ''}
        ><li><CiSquareChevRight className={styles.icon}/>내 정보수정</li></NavLink>
      </ul>
    </div>
  )
}

export default MypageSide