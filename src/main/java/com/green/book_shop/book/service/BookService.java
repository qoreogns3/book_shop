package com.green.book_shop.book.service;

import com.green.book_shop.book.dto.BookDTO;
import com.green.book_shop.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {
  private final BookMapper bookMapper;
  //책 등록 기능
  public void regBook(BookDTO bookDTO){
    bookMapper.regBook(bookDTO);
  }

  //모든 책 조회 기능
  public List<BookDTO> getBookList(){
    return bookMapper.getBookList();
  }

  //해당 번호의 도서 조회 기능
  public BookDTO getBook(int bookNum){
    return bookMapper.getBook(bookNum);
  }
}
