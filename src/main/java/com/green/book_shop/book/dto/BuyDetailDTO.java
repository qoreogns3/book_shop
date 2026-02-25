package com.green.book_shop.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BuyDetailDTO {
  private int buyDetailNum;
  private int bookNum;
  private int buyCnt;
  private int buyPrice;
  private int buyNum;
}
