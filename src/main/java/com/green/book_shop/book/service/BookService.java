package com.green.book_shop.book.service;

import com.green.book_shop.book.dto.BookDTO;
import com.green.book_shop.book.dto.BookImgDTO;
import com.green.book_shop.book.mapper.BookImgMapper;
import com.green.book_shop.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {
  private final BookMapper bookMapper;
  private final BookImgMapper bookImgMapper;

  //책 등록 기능
  //insert 쿼리가 연속 두번 실행되기 때문에 transaction을 걸어줌
  //@Transactional 어노테이션이 붙어있는 service 메서드는 안에 작성된 모든 쿼리가 성공해야 커밋 진행함
  //(rollbackFor = Exception.class) : 어떤 이유에서도 오류가 발생하면 전부 롤백시키겠다라는 설정
  @Transactional(rollbackFor = Exception.class)
  public void regBook(BookDTO bookDTO, List<BookImgDTO> imgList){
    bookMapper.regBook(bookDTO);
    bookImgMapper.insertImages(imgList);
  }

  //모든 책 조회 기능
  public List<BookDTO> getBookList(){
    return bookMapper.getBookList();
  }

  //해당 번호의 도서 조회 기능
  public BookDTO getBook(int bookNum){
    return bookMapper.getBook(bookNum);
  }

  //다음에 저장될 도서 번호 조회 기능
  public int getNextBookNum(){
    return bookMapper.getNextBookNum();
  }
}
