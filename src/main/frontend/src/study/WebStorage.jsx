import React from 'react'

//web Storage(cookie, localstorage, sessionstorage)
//에는 문자열 데이터만 저장 가능
const WebStorage = () => {
  //Local Storage에 데이터 저장
  localStorage.setItem('local-name', 'kim');
  localStorage.setItem('local-age', '20');

  //Local Storage에 저장된 데이터 읽기
  localStorage.getItem('local-name');

  //Local Storage에 저장된 데이터 지우기
  localStorage.removeItem('local-age');

  //session storage에 데이터 저장
  sessionStorage.setItem('session-name', 'lee')
  sessionStorage.setItem('session-age', '30')

  //session storage에 저장된 데이터 읽기
  sessionStorage.getItem('session-age')

  //session storage에 저장된 데이터 지우기
  sessionStorage.removeItem('session-name')

////////////////////////////////////////////////////

//filter는 조건에 맞는 데이터만 모아서 배열로 전환
  const test_data = [
    {
      id : 1,
      itemName : '1번상품',
      price : 1000
    },
    {
      id : 2,
      itemName : '2번상품',
      price : 2000
    },
    {
      id : 3,
      itemName : '3번상품',
      price : 3000
    }
  ]

  console.log(test_data.filter(e => e.id ===1))

  ///////////////////////////////////////////

  //map은 데이터를 원하는 형태로 변경해서 배열로 리턴
  const arr = [1,2,3]
  arr.map((e) => {return e+1}); // -> [2,3,4]

  return (
    <div>WebStorage</div>
  )
}

export default WebStorage