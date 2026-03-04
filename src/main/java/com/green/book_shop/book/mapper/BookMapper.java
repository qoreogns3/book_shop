package com.green.book_shop.book.mapper;

import com.green.book_shop.book.dto.BookDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface BookMapper {

  //책 등록 메서드
  void regBook(BookDTO bookDTO);

  //모든 책 조회 메서드
  List<BookDTO> getBookList();

  //해당 번호의 도서 조회 메서드
  BookDTO getBook(int bookNum);

  //다음에 저장될 도서번호 조회하는 메서드
  int getNextBookNum();

  //수량 수정 메서드
  void updateBookCnt(int bookCnt, int bookNum);

  //카테고리 별 책 수량 조회 메서드
  List<HashMap<String, Object>> cntCate();
}
