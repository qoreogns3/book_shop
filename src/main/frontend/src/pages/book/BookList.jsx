import React, { useEffect, useState } from 'react'
import styles from './BookList.module.css'
import { getBookList } from '../../api/bookApi';
import EachBook from './EachBook';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const nav = useNavigate();
    
  const [bookList, setBookList] =useState([]);
  
  
  const getList = async () => {
    const response = await getBookList();
    setBookList(response.data);
  }


  useEffect(() => {getList()}, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.booklist}>
      {
        bookList.map((data, i)=>{
          return (
            <EachBook data={data} i={i} key={i}/>      
          )
        })
      } 
    </div>
      
    </div>
  )
}

export default BookList