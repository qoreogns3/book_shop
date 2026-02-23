import React from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
//일반 사용자가 보는 페이지의 헤더 영역

const Header = () => {
  const nav = useNavigate();
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
  
  //로그아웃 함수
  const logout = () => {
    sessionStorage.removeItem('loginInfo')
    alert('로그아웃 되었습니다.')
    nav('/')
  }
  
  return (
    <div>
      <div className={styles.top_menu}>
        {loginInfo ? 
          <div className={styles.loginInfo}>
            <p>{loginInfo.memName} 님 반갑습니다.</p>
            <ul>
              <li
                onClick={e => logout()}
              >Logout</li>
              <li>회원정보수정</li>
              <li><Link to='/cart'>장바구니</Link></li>
              {loginInfo.memRole === 'MANAGER' && <li><Link to='/manage'>Manager</Link></li>}
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
      <div>
        일반사용자가 보는 메뉴
      </div>
    </div>
  )
}

export default Header