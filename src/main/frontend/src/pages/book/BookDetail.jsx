import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook } from '../../api/bookApi';
import { insertCart } from '../../api/cartApi';
import styles from './BookDetail.module.css'
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { postBuy } from '../../api/buyApi';

const BookDetail = () => {
  const nav = useNavigate();
  const {bookNum} = useParams();

  //책 정보 저장 state변수
  const [bookData, setBookData] = useState({});

  //메인 이미지 저장 state변수
  const [mainImg, setMainImg] = useState('');

  //서브 이미지 저장 state변수
  const [subImg, setSubImg] = useState([]);

  //카트 정보 저장 state변수
  const [cart, setCart] = useState({
    bookNum : bookNum,
    cartCnt : 1,
    memEmail : '' 
  })

  //로그인 되어있을시 카트 정보에 memEmail 저장 함수
  useEffect(()=> {
    if(sessionStorage.length !== 0){
      setCart(prev => ({
        ...prev,
        memEmail : JSON.parse(sessionStorage.getItem('loginInfo')).memEmail
      }))
    }
  }, [])

  //책 정보 저장 함수
  const book = async (bookNum) => {
    const response = await getBook(bookNum);
    setBookData(response.data);

    for(let e of response.data.bookImgList){
      if(e.isMain === 'Y'){
        setMainImg(e.uploadFileName)
      }
      else{
        setSubImg(prev => [...prev, e.uploadFileName])
      }
    }
  }

  useEffect(() => {book(bookNum)}, [])

  //책 수량 저장 state변수
  const [cnt,setCnt] =useState(1);

  //수량 변경 시 실행함수
  const handleCnt = e => {
    //만약 숫자가 아닌 문자열이 입력되면 입력된 문자열을 빈문자열로 변경
    let cntValue = e.target.value.replace(/[^0-9]/g, '')
    cntValue = cntValue === '' ? '1' : cntValue
    setCnt(cntValue)
    setCart(prev => ({
      ...prev,
      cartCnt : cntValue
    }))
  }

  //장바구니 담기 버튼 클릭시 실행 함수
  const regCart = async (cart) => {
    if(sessionStorage.length === 0){
      confirm('로그인 하시겠습니까?')&& nav('/login')
    }
    else{
      const response = await insertCart(cart);
      if(response.status === 201){
        confirm('장바구니에 담았습니다. \n장바구니 페이지로 이동할까요?') && nav('/mypage/cart')
      }
      else{
        alert('실패')
      }
    }
  }
  
  console.log(bookData)
  console.log(cart)

  //바로구매 버튼 클릭시 실행 함수
  const regBuy = async () => {
    if(sessionStorage.length === 0){
      confirm('로그인 하시겠습니까?')&& nav('/login')
      return;
    }
    const buy = {
      buyPrice : cart.cartCnt*bookData.bookPrice,
      memEmail : cart.memEmail
    }
    const buyDetail = [{
      bookNum : bookData.bookNum,
      buyCnt : cart.cartCnt, 
    }]
    const data = {buyDTO : buy, buyDetailDTOList : buyDetail}
    console.log(data)
    const response = await postBuy(data)
    if(response.status === 201){
      const result = confirm('구매 완료, 구매 목록 페이지로 이동하시겠습니끼?')
      result ? nav('../mypage/buy-list') : nav(0)
    }
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.book}>
        <div>
          <img src={`http://localhost:8080/upload/${mainImg}`}/>
        </div>
        <div className={styles.bookInfo}>
          <p>{bookData.bookTitle}</p>
          <div><hr /></div>
          <p>저자 : {bookData.author}</p>
          <p>가격 : {bookData.bookPrice && bookData.bookPrice.toLocaleString()}원</p>
          <p>수량 : <Input
            type='text'
            name = 'cnt'
            value = {cnt}
            onChange = {e => handleCnt(e)}
          /></p>
          <p>총 구매가격 : {bookData.bookPrice && (cnt*bookData.bookPrice).toLocaleString()}원</p>
          {/* bookInfo.bookPrice?.toLocalsString() */}
          {/* 옵셔널 체이닝 */}
          <div className={styles.btn_div}>
            <Button
              title = '장바구니에 담기'
              onClick = {e => regCart(cart)}
            />
            <Button
              title = '바로구매'
              onClick = {e => regBuy()}
            />
          </div>
        </div>
      </div>
      <div className={styles.bookIntro}>
        <h3>도서소개</h3>
        <p>{bookData.bookIntro}</p>
      </div>
      <div className={styles.introImg}>
        {
          subImg.map((data, i)=>{
            return(
              <img key={i} src={`http://localhost:8080/upload/${data}`}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default BookDetail