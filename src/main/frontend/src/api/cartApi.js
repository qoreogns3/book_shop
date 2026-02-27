import axios from "axios";

/**
 * 장바구니 저장
 * @returns 
 */
export const insertCart = async (data) => {
  try{
    const response = await axios.post('http://localhost:8080/carts', data)
    return response;
  }catch(e){
    console.log('카트 저장 실패',e)
  }
}

/**
 * 장바구니 조회
 * @param {} memEmail 
 * @returns 
 */
export const getCartList = async (memEmail) => {
  try{
    const response = await axios.get(`http://localhost:8080/carts/${memEmail}`)
    return response;
  }catch(e){
    console.log('카트 목록 조회 실패',e)
  }
}

/**
 * 수량 변경
 * @param {} data 
 */
export const updateCnt = async (data) => {
  try{
    await axios.put('http://localhost:8080/carts/cnt', data)
  }catch(e){
    console.log('수량 변경 실패', e)
  }
}

/**
 * 삭제
 * @param {*} cartNum 
 * @returns 
 */
export const deleteCart = async (cartNum) => {
  try{
    const response = await axios.delete(`http://localhost:8080/carts/${cartNum}`)
    return response;
  }catch(e){
    console.log('삭제 실패', e)
  }
}

//선택 삭제
 
// export const delCarts = async (cartNumList) => {
//   try{
//     const response = await axios.delete('http://locarhost:8080/del=carts', {params : {'cartNumList' : cartNumList}})
//   }catch(e){
//     console.log('삭제 오류', e)
//   }
// }

