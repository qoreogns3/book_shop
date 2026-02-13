package com.green.book_shop.book.controller;

import com.green.book_shop.book.dto.BookDTO;
import com.green.book_shop.book.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@Slf4j
public class BookController {
  private final BookService bookService;

  //책 등록 api
  @PostMapping("")
  public ResponseEntity<Object> regBook(@RequestBody BookDTO bookDTO){
    try {
      bookService.regBook(bookDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("책 등록 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //모든 책 조회 api
  @GetMapping("")
  public ResponseEntity<?> getBookList () {
    try {
      List<BookDTO> bookDTOList = bookService.getBookList();
      return ResponseEntity.status(HttpStatus.OK).body(bookDTOList);
    } catch (Exception e) {
      log.error("책 등록 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{bookNum}")
  public ResponseEntity<?> getBook(@PathVariable("bookNum") int bookNum){
    try {
      BookDTO result = bookService.getBook(bookNum);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    } catch (Exception e) {
      log.error("책 등록 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
