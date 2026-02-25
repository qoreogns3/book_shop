import axios from "axios"

export const postBuy = (data) => {
  try{
    const response = axios.post('http://localhost:8080/buys', data)
    return response
  }catch(e){
    console.log('구매 정보 등록 실패', e)
  }
}