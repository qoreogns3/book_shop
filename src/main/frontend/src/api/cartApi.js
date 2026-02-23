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

export const getCartList = async () => {
  try{
    const response = await axios.get('http://localhost:8080/carts')
    return response;
  }catch(e){
    console.log('카트 목록 조회 실패',e)
  }
}

