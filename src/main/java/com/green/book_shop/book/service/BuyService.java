package com.green.book_shop.book.service;

import com.green.book_shop.book.dto.BuyDTO;
import com.green.book_shop.book.dto.BuyDetailDTO;
import com.green.book_shop.book.dto.BuyRequestDTO;
import com.green.book_shop.book.mapper.BookMapper;
import com.green.book_shop.book.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyService {
  private final BuyMapper buyMapper;
  private final BookMapper bookMapper;

  //구매 정보, 상세 정보 등록, 구매 상품 수량 수정 기능
  @Transactional(rollbackFor = Exception.class)
  public void insertBuy(BuyDTO buyDTO, List<BuyDetailDTO> buyDetailDTOList){
    int buyNum = buyMapper.getNextBuyNum();
    buyDTO.setBuyNum(buyNum);
    buyMapper.insertBuy(buyDTO);
    for(BuyDetailDTO buyDetailDTO : buyDetailDTOList){
      buyDetailDTO.setBuyNum(buyNum);
      bookMapper.updateBookCnt(buyDetailDTO.getBuyCnt(), buyDetailDTO.getBookNum());
    }
    buyMapper.insertBuyDetail(buyDetailDTOList);
  }

  //구매 정보 조회 기능
  public List<BuyDTO> getBuyList(){
    return buyMapper.getBuy();
  }

  //구매 상세 정보 조회 기능
  public List<BuyDetailDTO> getBuyDetailList(){
    return buyMapper.getBuyDetail();
  }
}
