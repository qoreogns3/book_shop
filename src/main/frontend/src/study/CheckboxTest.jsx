import React, { useState } from 'react'

const CheckBoxTest = () => {
  //선택한 체크박스 데이터를 저장할 state변수
  const [fruits, setFruits] = useState(['apple', 'banana', 'orange']);

  //전체 체크박스 체크여부 state변수
  const [isChecked, setIschecked] = useState(true)

  //자바스크립트의 배열에 특정 데이터가 존재하는지 판단하기 위한 문법
  const arr = [1,2,3];
  
  //arr 배열에 2가 포함되에 있는가?
  const result = arr.includes(2)
  
  //체크박스 변경시 실행함수
  const handleCheckbox = e => {
    //체크한 경우 | e.target.checked는 체크 됐을때 true값을 반환
    if(e.target.checked){
      setFruits(prev => [...prev, e.target.value])
    }
    //체크 해제한 경우
    else{
      setFruits(fruits.filter(data => data !== e.target.value))
    }
}
  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <td>
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={e => {
                  //전체 체크박스 컨트롤
                  setIschecked(!isChecked)
                  //내용부의 체크박스 컨트롤
                  if(e.target.checked){
                    setFruits(['apple', 'banana', 'orange'])
                  }
                  else{
                    setFruits([])
                  }
                }}  
              />
            </td>
            <td>과일</td>
            <td>가격</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input 
                type="checkbox" 
                value='apple'
                checked={fruits.includes('apple')}
                onChange={e => {
                  handleCheckbox(e)
                }}
              />
            </td>
            <td>사과</td>
            <td>4,000원</td>
          </tr>
          <tr>
            <td>
              <input 
                type="checkbox" 
                value='banana'
                checked={fruits.includes('banana')}
                onChange={e => {
                  handleCheckbox(e)
                }}  
              />
            </td>
            <td>바나나</td>
            <td>3,000원</td>
          </tr>
          <tr>
            <td>
              <input 
                type="checkbox" 
                value='orange'
                checked={fruits.includes('orange')}
                onChange={e => {
                  handleCheckbox(e)
                }}  
              />
            </td>
            <td>오렌지</td>
            <td>5,000원</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CheckBoxTest