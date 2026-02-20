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
 * 책 등록
 * @param {object} data 입력한 책 데이터 
 * @returns 
 */
//파일도 함께 전달하기 위해서는 통신 설정을 변경해야 함
export const regBook = async (data) => {
  try{
    //데이터 전송 시 파일 데이터도 포함시킨다는 설정
    const fileConfig = {
      header : {'Content-Type' : 'multipart/form-data'}
    };

    const response = await axios.post('http://localhost:8080/books', data, fileConfig)
    return response;
  }catch(e){
    console.log('책 등록 실패', e)
  }
}


/**
 * 모든 도서 리스트 조회
 * @returns 
 */
export const getBookList = async () => {
  try{
    const response = await axios.get('http://localhost:8080/books')
    return response;
  }catch(e){
    console.log('도서 리스트 조회 실패', e)
  }
}

export const getBook = async (bookNum) => {
  try{
    const response = await axios.get(`http://localhost:8080/books/${bookNum}`)
    return response;
  }catch(e){
    console.log('도서 조회 실패', e)
  }
}