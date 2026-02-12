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

/**
 * email 중복 조회 axios 함수
 * @param {string} memEmail 중복 조회 할 email
 * @returns 
 */
export const checkEmail = async memEmail => {
  try{
    const response = await axios.get(`http://localhost:8080/members/checkId/${memEmail}`);
    return response;
  }catch(e){
    console.log('중복확인 에러', e);
  }
}
/**
 * 로그인 기능 axios함수
 * @param {object} data 입력한 email과 pw
 * @returns 
 */
export const checkPw = async data => {
  try{
    const response = await axios.get('http://localhost:8080/members/login', {params : data});
    return response;
  }catch(e){
    console.log('로그인 정보 조회 에러', e)
  }
}