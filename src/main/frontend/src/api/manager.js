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

export const getBuyCnt = async () => {
  try{
    const response = await axios.get('http://localhost:8080/buys/buycnt')
    return response;
  }catch(e){
    console.log('구매 수량 조회 실패', e)
  }
}

export const getDateCnt = async () => {
  try{
    const response = await axios.get('http://localhost:8080/buys/date')
    return response;
  }catch(e){
    console.log('날짜별 구매 수량 조회 실패', e)
  }
}

export const getRank = async () => {
  try{
    const response = await axios.get('http://localhost:8080/buys/rank')
    return response;
  }catch(e){
    console.log('랭크 조회 실패', e)
  }
}

export const getPrice = async () => {
  try{
    const response = await axios.get('http://localhost:8080/buys/price')
    return response;
  }catch(e){
    console.log('매출 조회 실패', e)
  }
}

export const getStock = async () => {
  try{
    const response = await axios.get('http://localhost:8080/books/stock')
    return response;
  }catch(e){
    console.log('재고 조회 실패', e)
  }
}