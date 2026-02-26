package com.green.book_shop.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
public class BuyRequestDTO {
  private BuyDTO buyDTO;
  private List<BuyDetailDTO> buyDetailDTOList;
}
