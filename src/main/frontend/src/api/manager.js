import axios from "axios"

/**
 * 가입 날짜 별 회원 수 조회
 * @returns 
 */
export const getCntMember = async () => {
  try{
    const response = await axios.get('http://localhost:8080/members/cnt')
    return response;
  }catch(e){
    console.log('멤버 조회 실패', e)
  }
}

export const cntCateBook = async () => {
  try{
    const response = await axios.get('http://localhost:8080/books/cntCate')
    return response;
  }catch(e){
    console.log('책 조회 실패', e)
  }
}