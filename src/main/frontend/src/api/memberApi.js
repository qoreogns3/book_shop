import axios from "axios";

// 회원과 관련된 axios 기능을 정의한 파일

/**
 * 회원가입 쿼리 실행 axios 함수
 * @param {object} data 회원가입 시 입력한 객체 데이터 
 * @returns 
 */
export const insertMember = async data => {
  try{
    const response = await axios.post('http://localhost:8080/members',data);
    return response;
  }catch(e){
    console.log('회원가입 axios 에러',e);
  }
}