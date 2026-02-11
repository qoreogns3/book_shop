package com.green.book_shop.book.service;

import com.green.book_shop.book.dto.BookDTO;
import com.green.book_shop.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BookService {
  private final BookMapper bookMapper;

  public void regBook(BookDTO bookDTO){
    bookMapper.regBook(bookDTO);
  }
}
