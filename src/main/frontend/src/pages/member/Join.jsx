import React, { useState } from 'react'
import styles from './Join.module.css'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { insertMember } from '../../api/memberApi'
import { useNavigate } from 'react-router-dom'


const Join = () => {
  const nav = useNavigate();

  const [member, setMember] = useState({
    memEmail : '',
    memName : '',
    memPw : '',
    confirmPw : '',
    memTel : '', // 완성된 연락처
    tel1 : '',
    tel2 : '',
    tel3 : '',
    memAddr : '',
    addrDetail : ''
  })

  const handleMember = e => {
    const {name, value} = e.target;
    setMember({
      ...member,
      [name] : value,
    })
    //만약 연락처를 변경하고 있다면, 
    if(name === 'tel1' || name === 'tel2' || name === 'tel3'){
      setMember(prev => ({
        ...prev,
        memTel : `${prev.tel1}-${prev.tel2}-${prev.tel3}`
      }))
    }
  }

  //회원가입 버튼 클릭 시 실행함수
  const goJoin = async () => {
    const response = await insertMember(member);

    if(response.status === 201){
      alert('회원가입을 축하합니다.');
      nav('/login')
    }

    else{
      alert('오류발생');
    }
  }


  return (
    <div className={styles.container}>
      <div>
        <p>Email</p>
        <div className={styles.id_div}>
          <Input 
            name = 'memEmail'
            value = {member.memEmail}
            onChange = {e => handleMember(e)}
          />
          <Button title='중복확인'/>
        </div>
      </div>
      <div>
        <p>Password</p>
        <Input 
          type='password'
          name = 'memPw'
          value = {member.memPw}
          onChange = {e => handleMember(e)}
        />
      </div>
      <div>
        <p>Confirm Password</p>
        <Input 
          type='password'
          name = 'confirmPw'  
          value = {member.confirmPw}
          onChange = {e => handleMember(e)}
        />
      </div>
      <div>
        <p>Name</p>
        <Input
          name = 'memName'
          value = {member.memName}
          onChange = {e => handleMember(e)} 
        />
      </div>
      <div>
        <p>Tel</p>
        <div className={styles.tel_div}>
          <Input
            name = 'tel1'
            value = {member.tel1}
            onChange = {e => handleMember(e)}
          />
          <Input
            name = 'tel2'
            value = {member.tel2}
            onChange = {e => handleMember(e)}
          />
          <Input
            name = 'tel3'
            value = {member.tel3}
            onChange = {e => handleMember(e)}
          />
        </div>
      </div>
      <div>
        <p>Address</p>
        <div className={styles.addr_div}>
          <Input
            name = 'memAddr'
            value = {member.memAddr}
            onChange = {e => handleMember(e)}
          />
          <Button title='검색' variant='gray'/>
        </div>
        <Input
          name = 'addrDetail'
          value = {member.addrDetail}
          onChange = {e => handleMember(e)}
        />
      </div>
      <div className={styles.btn_div}>
        <Button 
          title='회원가입'
          onClick = {e => goJoin()}  
        />
      </div>
    </div>
  )
}

export default Join