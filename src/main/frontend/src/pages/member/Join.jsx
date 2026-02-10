import React, { useEffect, useState } from 'react'
import styles from './Join.module.css'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { checkEmail, insertMember } from '../../api/memberApi'
import { useNavigate } from 'react-router-dom'
import { useDaumPostcodePopup } from 'react-daum-postcode'


const Join = () => {
  const nav = useNavigate();

  //다음 주소록 사용을 위한 선언
  const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);
  
  //입력한 데이터를 저장할 state함수
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

  //유효성 검사(validation) 결과 에러 메세지를 저장하는 state변수
  const [errors, setErrors] = useState({
    memEmail : '',
    memPw : '',
    confirmPw : '',
    memName : '',
    memTel : ''
  });

  //중복확인 체크
  const [emailChk, setEmailChk] = useState(false);

  // //마운트 시점인지 판단을 위한 state 변수
  // //cnt값이 0일때가 마운트 시점 
  // const [cnt, setCnt] = useState(0);

  //유효성 검사 함수(값 입력할때마다 실행)
  const validateField = (name, value) => {
    let errorMsg = '';

    switch(name){
      case 'memEmail' :
        //이메일 형식 정규식
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(value.length < 5){
          errorMsg = 'email은 5글자 이상이어야 합니다.'
        }
        else if(value.length > 50){
          errorMsg = 'email은 50글자 이하이어야 합니다.'
        }
        else if(!emailPattern.test(value)){
          errorMsg = 'email 형식에 맞지 않습니다.'
        }
        break;
      case 'memPw' :
         //비밀번호 정규식
        const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,50}$/;

        if(value.length < 1){
          errorMsg = '비밀번호는 필수입력입니다.'
        }
        else if(!pwPattern.test(value)){
          errorMsg = '영문, 숫자 조합 최대 50글자까지 가능합니다.'
        }
        break;
      case 'memName' :
        if(value.length < 1){
          errorMsg = '이름은 필수입력입니다.'
        }
        else if(value.length > 30){
          errorMsg = '다시 입력해주세요.'
        }
        break;
      case 'tel1':
        //연락처 정규식
        const telPattern1 = /^[0-9]{3}$/;
        if(!telPattern1.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break;
      case 'tel2':
        //연락처 정규식
        const telPattern2 = /^[0-9]{3,4}$/;
        if(!telPattern2.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break;
      case 'tel3':
        //연락처 정규식
        const telPattern3 = /^[0-9]{4}$/;
        if(!telPattern3.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break;
    }

    return errorMsg;
  }

  //회원가입 버튼 활성화 여부 저장 state함수
  const [isDisable, setIsDisable] = useState(true);

  // 입력한 데이터를 저장하는 함수
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

    //이메일을 변경하고 있다면, 회원가입 버튼 비활성화
    if(name === 'memEmail'){
      setEmailChk(false)
    }

    //유효성 검사 실행
    const errorMsg = validateField(name, value);

    const keyName = name === 'tel1' || name === 'tel2' || name === 'tel3' ? 'memTel' : name;

    setErrors(prev => {
      return {
        ...prev,
        [keyName] : errorMsg
      }
    })
  }

  //errors 객체의 모든 key에 대한 value가 빈 문자인지 확인하는 코드
  //errors 객체값이 변경될때만 실행
  useEffect(()=>{
    //객체 errors에 있는 value들의 모든 문자열 데이터 하나하나가 빈문자와 같은지 확인 후 리턴 값이 모두 true일때만 true
    //객체 member에 있는 모든 데이터가 빈 문자가 아니고, errors에 있는 모든 데이터가 빈 문자일때 result에 true 
    const result = Object.values(member).every(value => {return value !== ''}) && Object.values(errors).every(value => {return value === ''});
    
    //입력 데이터에 오류가 없을 때 회원가입 버튼 활성화
    //result가 true이고, 중복확인 true일때
    if(result && emailChk){
      setIsDisable(false);
    }
    else{
      setIsDisable(true);
    }
  }, [errors, emailChk, member])
  

  //회원가입 버튼 클릭 시 실행함수
  const goJoin = async () => {
    const response = await insertMember(member);
    if(response.status === 201){
      alert('회원가입을 축하합니다.');
      nav('/login');
    }
    else{
      alert('오류발생');
    }
  }

  //중복확인 버튼 클릭 시 실행함수
  const chkEmail = async() => {
    if(member.memEmail === ''){
      alert('email을 입력해주세요.')
    }
    else{
      const result = await checkEmail(member.memEmail);
    
      if (result.data === 0){
        alert('사용 가능한 Email입니다.')
        //회원가입 버튼 활성화
        setEmailChk(true)
      }
      else {
        alert('중복된 Email입니다.')
      }
    }
  }

  //주소 검색 팝업에서 주소 선택 시 실행하는 함수
  const handleComplete = data => {
    //선택한 도로명 주소를 주소 입력창에 세팅
    setMember({
      ...member,
      memAddr : data.address
    })
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
          <Button 
            title='중복확인'
            onClick = {e => chkEmail()}  
          />
        </div>
        {errors.memEmail && <p className='error'>{errors.memEmail}</p>}
      </div>
      <div>
        <p>Password</p>
        <Input 
          type='password'
          name = 'memPw'
          value = {member.memPw}
          onChange = {e => handleMember(e)}
        />
        {errors.memPw && <p className='error'>{errors.memPw}</p>}
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
        {errors.memName && <p className='error'>{errors.memName}</p>}
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
        {errors.memTel && <p className='error'>{errors.memTel}</p>}
      </div>
      <div>
        <p>Address</p>
        <div className={styles.addr_div}>
          <Input
            readOnly = {true}//읽기 전용
            name = 'memAddr'
            value = {member.memAddr}
            onChange = {e => handleMember(e)}
            onClick = {e => open({ onComplete: handleComplete })}
          />
          <Button 
            title='검색' 
            variant='gray'
            onClick={e => open({ onComplete: handleComplete })}
          />
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
          disabled = {isDisable}  
        />
      </div>
    </div>
  )
}

export default Join