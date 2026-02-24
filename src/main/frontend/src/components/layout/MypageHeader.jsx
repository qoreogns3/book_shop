import React from 'react'
import styles from './Mypageheader.module.css'
import { Link, useNavigate } from 'react-router-dom'

const MypageHeader = () => {
  const nav = useNavigate();
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
  
  //로그아웃 함수
  const logout = () => {
    sessionStorage.removeItem('loginInfo')
    alert('로그아웃 되었습니다.')
    nav('/')
  }
  return (
    <div className={styles.container}>
      <div className={styles.top_menu}>
        {loginInfo ? 
          <div className={styles.loginInfo}>
            <p>{loginInfo.memName} 님 반갑습니다.</p>
            <ul>
              <li><Link to='/mypage'>마이페이지</Link></li>
              {loginInfo.memRole === 'MANAGER' && <li><Link to='/manage'>Manager</Link></li>}
              <li
                onClick={e => logout()}
              >Logout</li>
            </ul> 
          </div>          
        : 
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li>
              {/* 페이지 이동방법  1.Link  2.useNavigate */}
              <Link to='/join'>Join</Link>  
            </li>
          </ul>
        }
      </div>
      <Link to ='/'>
        <div className={styles.banner_div}>
          <img
            className={styles.banner_img} 
            src="/book_banner.PNG" 
          />
          <h3 className={styles.banner_title}>BOOK SHOP</h3>
        </div>
      </Link>
    </div>
  )
}

export default MypageHeader