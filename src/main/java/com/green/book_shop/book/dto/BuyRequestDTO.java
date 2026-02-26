package com.green.book_shop.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BuyRequestDTO {
  private BuyDTO buyDTO;
  private BuyDetailDTO buyDetailDTO;
}
