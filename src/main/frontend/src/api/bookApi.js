import axios from "axios"

/**
 * 카테고리 목록 조회
 * @returns 카테고리 목록
 */
export const getCateName = async () => {
  try{
    const response = await axios.get('http://localhost:8080/cates')
    return response;
  }catch(e){
    console.log('카테고리 조회 에러', e)
  } 
}

/**
 * 
 * @param {object} data 입력한 책 데이터 
 * @returns 
 */
export const regBook = async (data) => {
  try{
    const response = await axios.post('http://localhost:8080/books', data)
    return response;
  }catch(e){
    console.log('책 등록 실패', e)
  }
}