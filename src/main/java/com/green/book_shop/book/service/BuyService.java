package com.green.book_shop.book.service;

import com.green.book_shop.book.dto.BuyDTO;
import com.green.book_shop.book.dto.BuyDetailDTO;
import com.green.book_shop.book.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyService {
  private final BuyMapper buyMapper;

  //구매 정보 등록 기능
  public void insertBuy(BuyDTO buyDTO){
    buyMapper.insertBuy(buyDTO);
  }

  //구매 상세정보 등록 기능
  public void insertBuyDetail(List<BuyDetailDTO> buyDetailDTOList){
    buyMapper.insertBuyDetail(buyDetailDTOList);
  }
}
