import React, { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import styles from './CartList.module.css'
import { deleteCart, getCartList, updateCnt } from '../../api/cartApi';
import Button from '../../components/common/Button';
import ListTable from '../../components/common/ListTable';
import dayjs from 'dayjs';
import { postBuy, postBuyDetail } from '../../api/buyApi';

const CartList = () => {

  //장바구니 리스트 저장 state변수
  const [cartList, setCartList] = useState([]);
  
  //카트번호 저장 state변수
  const [cartNumList, setCartNumList] = useState([]);

  //장바구니 리스트 조회 함수
  const getList = async() => {
    const response = await getCartList(JSON.parse(sessionStorage.getItem('loginInfo')).memEmail);
    setCartList(response.data)
    //조회한 데이터를 cartNumList에 저장, 체크박스 전부 체크
    const list = []
    for(let e of response.data){
      list.push(e.cartNum)
    }
    setCartNumList(list)
    return list
  }
  

  useEffect(() => {getList().then(list => {})},[])  

  //수량과 카트번호 저장 state변수
  const [cntAndCartNum, setCntAndCartNum] = useState({
    cartCnt : 0,
    cartNum : 0
  })

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
  
  //삭제 버튼 클릭시 실행 함수
  const deleteClick = async (cartNum) => {
    await deleteCart(cartNum);
    getList();
  }

  //선택 삭제 버튼 클릭 시 실행함수
  const selectDelete = async () => {
    for(let e of checkedItems){
      await deleteClick(e)
    }
  }

  //체크박스 선택시 카트번호가 저장될 state변수
  const [checkedItems, setCheckedItems] = useState([]);

  //체크한 도서의 총 구매 가격을 계산하는 함수
  const cntPrice = () => {
    let checkedItemsPrice = []
    for (let e of checkedItems){
      for(let d of cartList){
        if(e === d.cartNum){
          checkedItemsPrice.push(d.book.bookPrice*d.cartCnt)
        }
      }
    }
    let cnt = 0;
    for(let e of checkedItemsPrice){
      cnt = cnt + e
    }
    return cnt;
  }
  
  
  //전체 체크박스 클릭 시 실행 함수
  const checkAll= (e) => {
    setCheckedItems(e.target.checked ? cartNumList : [])
  }

  //체크 박스 클릭 시 실행할 함수
  const checkItem = (e) => {
    if(e.target.checked){
      setCheckedItems(prev => [...prev, Number(e.target.value)])
    }
    else{
      const copyItems = checkedItems.filter((data) => {return data !== Number(e.target.value)});
      setCheckedItems(copyItems)
    }
  }
  for(let e of cartList){
      const buys = {
        bookNum : e.book.bookNum,
        buyCnt : e.cartCnt,
        buyPrice : e.book.bookPrice*e.cartCnt,
      }
      buyDetail.push(buys)
    }
  //선택 구매 버튼 클릭 시 실행 함수
  const clickBuy = async () => {
    const buy = {
      buyPrice : cntPrice(),
      memEmail : JSON.parse(sessionStorage.getItem('loginInfo')).memEmail
    };
    const response = await postBuy(buy);
    console.log(buy)
    const buyDetail = []
    for(let e of checkedItems){
      for(let d of cartList){
        if(e === d.cartNum){
          const buys = {
            bookNum : d.book.bookNum,
            buyCnt : d.cartCnt,
            buyPrice : d.book.bookPrice*e.cartCnt,
          }
          buyDetail.push(buys)
        }
      }
    }
    console.log(buyDetail)
    // const detailResponse = await postBuyDetail(buyDetail)
    // if(response.status === 201 && detailResponse.status === 201){
    //   alert('구매 완료')
    }
  }

  console.log(cartList)
  
  return (
    <div className={styles.container}>
      <ListTable>
        <thead>
          <tr>
            <td>No</td>
            <td>
              <input
                type='checkbox'
                onChange = {e => checkAll(e)}
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
                    <input
                      type='checkbox'
                      value={data.cartNum}
                      checked={checkedItems.includes(data.cartNum)}
                      onChange={e => checkItem(e)}  
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
                  {/* <td>{data.cartDate}</td> */}
                  <td>{dayjs(data.cartDate).format('YYYY-MM-DD  hh시 mm분')}</td>
                  <td>
                    <Button
                      title = '삭제'
                      onClick = {e=>deleteClick(data.cartNum)}
                    />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </ListTable>
      <div className={styles.cntPrice}><p>총 구매 가격 : {cntPrice()}</p></div>
      <div className={styles.btnDiv}>
        <Button
          title = '선택 삭제'
          onClick = {e => selectDelete()}
        />
        <Button
          title = '선택 구매'
          onClick = {e => clickBuy()}
        />
      </div>
    </div>
  )
}

export default CartList