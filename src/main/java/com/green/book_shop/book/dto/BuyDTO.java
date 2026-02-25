package com.green.book_shop.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class BuyDTO {
  private int buyNum;
  private int buyPrice;
  private String memEmail;
  private LocalDateTime buyDate;
}

