import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBook } from '../../api/bookApi';
import styles from './BookDetail.module.css'
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const BookDetail = () => {
  const {bookNum} = useParams();
  
  //책 정보 저장 state변수
  const [bookData, setBookData] = useState({});

  //책 정보 저장 함수
  const book = async (bookNum) => {
    const response = await getBook(bookNum);
    setBookData(response.data);
  }
  useEffect(() => {book(bookNum)}, [])

  //책 수량 저장 state변수
  const [cnt,setCnt] =useState(1);
  
  

  return (
    <div className={styles.container}>
      <div className={styles.book}>
        <div>
          <img src="가장 빨리 만나는 자바_메인.jpg"/>
        </div>
        <div className={styles.bookInfo}>
          <p>{bookData.bookTitle}</p>
          <div><hr /></div>
          <p>저자 : {bookData.author}</p>
          <p>가격 : {bookData.bookPrice && bookData.bookPrice.toLocaleString()}원</p>
          <p>수량 : <Input
            name = 'cnt'
            value = {cnt}
            onChange = {e => setCnt(e.target.value)}
          /></p>
          <p>총 구매가격 : {bookData.bookPrice && (cnt*bookData.bookPrice).toLocaleString()}원</p>
          <div className={styles.btn_div}>
            <Button
              title = '장바구니에 담기'
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
        <img src="가장 빨리 만나는 자바_상세1.jpg"/>
      </div>
    </div>
  )
}

export default BookDetail