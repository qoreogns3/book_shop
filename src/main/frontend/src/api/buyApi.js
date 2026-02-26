import axios from "axios"

/**
 * 구매 정보 등록
 * @param {*} data 
 * @returns 
 */
export const postBuy = async (data) => {
  try{
    const response = await axios.post('http://localhost:8080/buys', data)
    return response
  }catch(e){
    console.log('구매 정보 등록 실패', e)
  }
}
