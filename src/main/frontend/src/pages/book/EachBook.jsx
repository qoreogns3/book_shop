import React, { useEffect, useState } from 'react'
import { getBookList } from '../../api/bookApi';
import styles from './EachBook.module.css'
import { useNavigate } from 'react-router-dom';

const EachBook = ({data}) => {
  const nav = useNavigate();

  //천 단위 구분 기호 넣는 방법
  //.toLocaleString()
  return (
    <div className={styles.books}>
      <div className={styles.imgDiv}>
        <img
          className={styles.bookImg} 
          src="가장 빨리 만나는 자바_메인.jpg"
          
        />
        <div 
          className={styles.click}
          onClick={e => nav(`/${data.bookNum}`)}  
        >
          <div><p>상세 보기</p></div>
        </div>
      </div>
      <p>{data.bookTitle}</p>
      <p>가격 : {data.bookPrice.toLocaleString()}원</p>
    </div>
  )
}

export default EachBook