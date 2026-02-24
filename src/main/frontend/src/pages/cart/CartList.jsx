import React, { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import styles from './CartList.module.css'
import { getCartList, updateCnt } from '../../api/cartApi';
import Button from '../../components/common/Button';

const CartList = () => {
  
  //장바구니 리스트 저장 state변수
  const [cartList, setCartList] = useState([]);

  //장바구니 리스트 조회 함수
  const getList = async() => {
    const response = await getCartList(JSON.parse(sessionStorage.getItem('loginInfo')).memEmail);
    setCartList(response.data)
  }
  useEffect(() => {getList()},[])  

  const [cntAndCartNum, setCntAndCartNum] = useState(prev => ({
    cartCnt : 0,
    cartNum : 0
  }))

  //수량 변경시 실행 함수
  const handleCnt = (e, data) => {
    let cntValue = e.target.value.replace(/[^0-9]/g, '')
    cntValue = cntValue === '' ? e.target.value : cntValue
    setCntAndCartNum({
      cartCnt : cntValue,
      cartNum : data.cartNum
    })
  }
  
  const putCnt = async (data) =>  {await updateCnt(data)}

  useEffect(()=>{
    putCnt(cntAndCartNum);
    getList();
  }, [cntAndCartNum])

  

  return (
    <div className={styles.container}>
      <table className={styles.cart_table}>
        <thead>
          <tr>
            <td>No</td>
            <td>
              <Input
                type='checkbox'
              />
            </td>
            <td>도서 정보</td>
            <td>가격</td>
            <td>수량</td>
            <td>구매가격</td>
            <td>장바구니 등록 일자</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {
            cartList.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{cartList.length - i}</td>
                  <td>
                    <Input
                      type='checkbox'
                    />
                  </td>
                  <td>
                    <div className={styles.img_title}>
                      <img 
                        src = {`http://localhost:8080/upload/${data.bookImg.uploadFileName}`}
                        className={styles.bookImg}  
                      />
                      {data.book.bookTitle}
                    </div>
                  </td>
                  <td>{data.book.bookPrice}</td>
                  <td>
                    <Input
                      value = {data.cartCnt}
                      onChange = {e => {
                        handleCnt(e, data)
                      }}
                    />
                  </td>
                  <td>{data.book.bookPrice*data.cartCnt}</td>
                  <td>{data.cartDate}</td>
                  <td>
                    <Button
                      title = '삭제'
                    />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className={styles.btnDiv}>
        <Button
          title = '선택 삭제'
        />
        <Button
          title = '선택 구매'
        />
      </div>
    </div>
  )
}

export default CartList