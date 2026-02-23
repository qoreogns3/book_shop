package com.green.book_shop.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class BookDTO {
  private int bookNum;
  private String bookTitle;
  private String author;
  private int bookPrice;
  private int bookStock;
  private String bookIntro;
  private LocalDate publishDate;
  private int cateNum;
//  bookDTO 와 bookImgDTO 가 1:1 관계일때
//  private BookImgDTO bookImgDTO;

//  bookDTO 와 bookImgDTO 가 1:N 관계일때
  private List<BookImgDTO> bookImgList;
}
