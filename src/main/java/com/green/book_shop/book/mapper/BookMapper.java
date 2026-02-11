package com.green.book_shop.book.mapper;

import com.green.book_shop.book.dto.BookDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper {

  //책 등록 메서드
  void regBook(BookDTO bookDTO);
}
