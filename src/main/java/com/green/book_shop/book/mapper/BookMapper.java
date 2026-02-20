package com.green.book_shop.book.mapper;

import com.green.book_shop.book.dto.BookDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookMapper {

  //책 등록 메서드
  void regBook(BookDTO bookDTO);

  //모든 책 조회 메서드
  List<BookDTO> getBookList();

  //해당 번호의 도서 조회
  BookDTO getBook(int bookNum);

  //다음에 저장될 도서번호 조회하는 쿼리
  int getNextBookNum();
}
