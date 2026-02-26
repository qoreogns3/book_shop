import axios from "axios"

/**
 * 구매 정보 등록
 * @param {*} data 
 * @returns 
 */
export const postBuy = (data) => {
  try{
    const response = axios.post('http://localhost:8080/buys', data)
    return response
  }catch(e){
    console.log('구매 정보 등록 실패', e)
  }
}

export const postBuyDetail = (data) => {
  try{
    const response = axios.post('http://localhost:8080/buys/details', data)
    return response
  } catch(e){
    console.log('구매 상세 정보 등록 실패', e)
  }
}