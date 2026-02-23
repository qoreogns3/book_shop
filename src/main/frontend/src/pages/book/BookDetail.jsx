import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook } from '../../api/bookApi';
import { insertCart } from '../../api/cartApi';
import styles from './BookDetail.module.css'
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { insertMember } from '../../api/memberApi';

const BookDetail = () => {
  const nav = useNavigate();
  const {bookNum} = useParams();
  
  //회원 정보
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))

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
    memEmail : loginInfo.memEmail
  })

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

  //장바구니 담기 버튼 클릭시 실행 함수
  const regCart = async (cart) => {
    const response = await insertCart(cart);
    if(response.status === 201){
      alert('장바구니담기가 완료되었습니다.')
      nav('../cart')
    }
    else{
      alert('실패')
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
            name = 'cnt'
            value = {cnt}
            onChange = {e => {
                setCnt(e.target.value)
                setCart(prev => ({
                  ...prev,
                  cartCnt : e.target.value
                }))
              }}
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