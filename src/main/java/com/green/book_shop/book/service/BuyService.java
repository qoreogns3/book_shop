package com.green.book_shop.book.service;

import com.green.book_shop.book.dto.BuyDTO;
import com.green.book_shop.book.dto.BuyDetailDTO;
import com.green.book_shop.book.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyService {
  private final BuyMapper buyMapper;

  //구매 정보, 상세 정보 등록 기능
  @Transactional
  public void insertBuy(BuyDTO buyDTO, List<BuyDetailDTO> buyDetailDTOList){
    buyDTO.setBuyNum(buyMapper.getNextBuyNum());
    buyMapper.insertBuy(buyDTO);
    for(BuyDetailDTO buyDetailDTO : buyDetailDTOList){
      buyDetailDTO.setBuyNum(buyMapper.getNextBuyNum());
    }
    buyMapper.insertBuyDetail(buyDetailDTOList);
  }

//  //구매 상세정보 등록 기능
//  public void insertBuyDetail(List<BuyDetailDTO> buyDetailDTOList){
//    for(BuyDetailDTO buyDetailDTO : buyDetailDTOList){
//      buyDetailDTO.setBuyNum(buyMapper.getNextBuyNum());
//    }
//    buyMapper.insertBuyDetail(buyDetailDTOList);
//  }
}
