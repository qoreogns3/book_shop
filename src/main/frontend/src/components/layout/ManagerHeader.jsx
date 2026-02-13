import React from 'react'
import styles from './ManagerHeader.module.css'
import { Link, useNavigate } from 'react-router-dom'

const ManagerHeader = () => {
  const nav = useNavigate();
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));

  //로그아웃 함수
  const logout = () => {
    sessionStorage.removeItem('loginInfo')
    alert('로그아웃 되었습니다.')
    nav('/')
  }

  return (
    <div className={styles.container}>
      <Link to='/manage'><img src="/logo1.png" className={styles.logo}/></Link>
      {loginInfo ?
        <div className={styles.loginInfo}>
          <p>{loginInfo.memName} 님 반갑습니다.</p>
          <ul>
            <li onClick={e => logout()}>Logout</li>
            <li onClick={e => nav('/')}>Home</li>
          </ul>
        </div>
      :
        <ul>
          <li>Login</li>
          <li>Join</li>
        </ul>
      }
    </div>
  )
}

export default ManagerHeader