package com.green.book_shop.book.mapper;

import com.green.book_shop.book.dto.BuyDTO;
import com.green.book_shop.book.dto.BuyDetailDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BuyMapper {
  //구매 정보 등록 메서드
  void insertBuy(BuyDTO buyDTO);

  //구매 상세 정보 등록 메서드
  void insertBuyDetail(List<BuyDetailDTO> buyDetailDTOList);

  //구매 번호 부여 메서드
  int getNextBuyNum();
}
