import React, { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { getCateName, regBook } from '../../api/bookApi';
import { useNavigate } from 'react-router-dom';
import styles from './BookForm.module.css'
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';

const BookForm = () => {
  const nav = useNavigate();

  //카테고리 저장 state함수
  const [cateName, SetCateName] = useState([]);

  //카테고리 호출 함수
  //useEffect안에는 async를 쓸수 없음
  const test = async () => {
    const response = await getCateName(); 
    // await 붙여야 하는 이유 : 함수 호출을 기다렸다가 response 에 저장해야하기 때문
    SetCateName(response.data);
  }
  useEffect(()=>{ 
    // await 붙일 필요 없는 이유 : 함수만 호출하고 결과를 기다릴 필요가 없기때문
    test();
  }, [])

  //책 입력 데이터 저장 state함수
  const [book, setBook] = useState({
    bookTitle : '',
    bookPrice : '',
    author : '',
    bookIntro : '',
    publishDate : '',
    cateNum : '0'
  })

  //유효성 검사 결과 에러 메세지를 저장할 state변수
  const [errors, setErrors] = useState({
    bookTitle : '',
    author : '',
    bookPrice : '',
    publishDate : '',
    cateNum : ''
  })
  
  //유효성 검사 함수
  const validateField = () => {
    //최신 에러 메세지를 저장할 변수
    const newErrors = {
      bookTitle : '',
      author : '',
      bookPrice : '',
      publishDate : '',
      cateNum : ''
    }
    
    let isValid = true;
    //제목 유효성검사
    //1) 제목을 입력하지 않았을때 
    if(book.bookTitle === ''){
      newErrors.bookTitle = '필수 입력입니다.'
      isValid = false;
    }
    //2) 제목이 최대 글자수를 넘겼을때
    if(book.bookTitle.length > 30){
      newErrors.bookTitle = '글자 수 초과입니다.'
      isValid = false;
    }
    //가격 유효성검사
    //1) 필수입력 체크
    if(book.bookPrice === ''){
      newErrors.bookPrice = '필수 입력입니다.'
      isValid = false;
    }
    //2) 잘못된 데이터(문자x, 0 이하)
    //숫자판단 : isNaN()      NaN : Not a Number
    //문자 -> 숫자 변환 : Number('10')
    if (isNaN(book.bookPrice) || Number(book.bookPrice) <= 0){
      newErrors.bookPrice = '잘못된 가격입니다.'
      isValid = false;
    }
    //cateNum 유효성검사
    //1) value가 0번일때
    if (book.cateNum === '0'){
      newErrors.cateNum = '필수 선택입니다.'
      isValid = false;
    }
    //publishDate 유효성검사
    if (book.publishDate === ''){
      newErrors.publishDate = '필수 입력입니다.'
      isValid = false;
    }
    //저자 유효성 검사
    if(book.author === ''){
      newErrors.author = '필수 입력입니다.'
      isValid = false;
    }
    if(book.author.length > 20){
      newErrors.author = '글자 수 초과입니다.'
      isValid = false;
    }
    //위에서 조건에 따라 작성한 최신 에러 메세지를 errors state변수에 저장
    setErrors(newErrors);
    return isValid;
  }

  //책 입력 데이터 저장 함수
  const handleBook = e => {
    const {name, value} = e.target;
    setBook(prev => ({
      ...prev,
      [name] : value
    }));

    //키 입력 시 유효성 검사 결과 나오는 에러메세지를 초기화하는 코드
    if(errors[name]){
      setErrors(prev => ({
        ...prev,
        [name] : ''
      }))
    }
  }

  //버튼 클릭 시 도서 등록 함수
  const postBook = async () => {
    const isValid = validateField();
    if(!isValid){
      return;
    }
    const response = await regBook(book);
    if(response.status === 201){
      alert('책 등록이 완료되었습니다.')
      nav(0);
    }
    else{
      alert('등록에 실패하였습니다.')
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <p>Book Category</p>
        <Select
          name = 'cateNum'
          value={book.cateNum}
          onChange={e => handleBook(e)}
        >
          <option value='0'>카테고리 선택</option>
          {
            cateName.map((data, i)=>{
              return(
                <option 
                  key={i}
                  value={data.cateNum}
                >
                {data.cateName}</option>
              )
            })
          }
        </Select>
        {errors.cateNum && <p className='error'>{errors.cateNum}</p>}
      </div>
      <div>
        <p>Book Title</p>
        <Input
          name = 'bookTitle'
          value = {book.bookTitle}
          onChange={e => handleBook(e)}  
        />
        {errors.bookTitle && <p className='error'>{errors.bookTitle}</p>}
      </div>
      <div className={styles.price_author}>
        <div>
          <p>Price</p>
          <Input
            name = 'bookPrice'
            value = {book.bookPrice}
            onChange={e => handleBook(e)}
          />
          {errors.bookPrice && <p className='error'>{errors.bookPrice}</p>}
        </div>
        <div>
          <p>Author</p>
          <Input
            name = 'author'
            value = {book.author}
            onChange={e => handleBook(e)}
          />
          {errors.author && <p className='error'>{errors.author}</p>}
        </div>
      </div>
      <div>
        <p>Introduce</p>
        <Textarea
          rows={5}
          name='bookIntro'
          value={book.bookIntro}
          onChange={e => handleBook(e)}
        ></Textarea>
      </div>
      <div>
        <p>Publish Date</p>
        <Input
          type = 'date'
          name = 'publishDate'
          value = {book.publishDate}
          onChange={e => handleBook(e)}
        />
        {errors.publishDate && <p className='error'>{errors.publishDate}</p>}
      </div>
      <div className={styles.btn_div}>
        <Button
          title='도서 등록'
          onClick = {e => postBook()}
        />
      </div>
    </div>
  )
}

export default BookForm