import React, { useState } from 'react'
import styles from './Login.module.css'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { checkPw } from '../../api/memberApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const nav = useNavigate();
  // 입력한 id, pw 저장 state변수
  const [data, setData] = useState({
    memEmail : '',
    memPw : ''
  })

  //유효성 검사 결과 에러 메세지 저장 state함수
  const [errors, setErrors] = useState({
    memEmail : '',
    memPw : ''
  })

  //유효성 검사 함수
  const validateField = () => {
    const newErrors = {
      memEmail : '',
      memPw : ''  
    }
    let isValid = true;
    if(data.memEmail === ''){
      newErrors.memEmail = '필수 입력입니다.'
      isValid = false;
    }
    if(data.memPw === ''){
      newErrors.memPw = '필수 입력입니다.'
      isValid = false
    }
    setErrors(newErrors);
    return isValid;
  }

  // 입력시 데이터 저장 함수
  const handleData = e => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name] : value
    });
  }

  //버튼 클릭시 pw 확인 기능
  const checkLogin = async (data) => {
    const result = validateField();
    if(result){
      const response = await checkPw(data);
      if(response.status === 204){
        alert('일치하는 email이 존재하지 않습니다.')
        setData(prev => ({...prev , memPw : ''}))
      }
      else if(response.data === ''){
        alert('패스워드가 일치하지 않습니다.')
        setData(prev => ({...prev , memPw : ''}))
      }
      else if(response.status === 200){
        alert('로그인 성공')
        //로그인한 회원의 이메일, 이름 권한 정보를 가진 변수
        const loginInfo = {
          memEmail : response.data.memEmail,
          memName : response.data.memName,
          memRole : response.data.memRole
        }
        //로그인 정보를 sessionStorage에 저장하기 위해서 json(객체를 문자화시킨것)으로 변경
        // JSON.stringify(객체); -> 객체를 json으로 변경
        // JSON.parse(json); -> json 데이터를 객체로 변경 
        //session storage에 로그인한 유저 정보를 저장
        sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));
        //도서 목록 페이지로 이동
        nav('/');
      }
    }
  }

  return (
    <div className={styles.container}>
      <img src="../logo1.png" className={styles.logo}/>
      <div>
        <Input
          placeholder = 'Input Your Email'
          name = 'memEmail'
          value = {data.memEmail}
          onChange = {e => handleData(e)}
        />
        {errors.memEmail && <p className='error'>{errors.memEmail}</p>} 
      </div>
      <div>
        <Input
          type='password'
          placeholder = 'Input Your Password'
          name = 'memPw'
          value = {data.memPw}
          onChange = {e => handleData(e)}
          onKeyDown = {e => {
            if(e.key === 'Enter'){
              checkLogin(data)
            }
          }}
        />
        {errors.memPw && <p className='error'>{errors.memPw}</p>}
      </div>
      <Button
        title='로그인'
        onClick = {e => checkLogin(data)}
      />
    </div>
  )
}

export default Login