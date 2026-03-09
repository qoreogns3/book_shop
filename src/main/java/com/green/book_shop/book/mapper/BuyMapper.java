package com.green.book_shop.book.mapper;

import com.green.book_shop.book.dto.BuyDTO;
import com.green.book_shop.book.dto.BuyDetailDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface BuyMapper {
  //구매 정보 등록 메서드
  void insertBuy(BuyDTO buyDTO);

  //구매 상세 정보 등록 메서드
  void insertBuyDetail(List<BuyDetailDTO> buyDetailDTOList);

  //구매 번호 부여 메서드
  int getNextBuyNum();

  //구매 목록 조회 메서드
  List<BuyDTO> getBuy(String memEmail);

  //구매 상세 목록 조회 메서드
  List<BuyDetailDTO> getBuyDetail(String memEmail);

  //구매 상품 수량 조회 메서드
  List<BuyDetailDTO> getBuyCnt();

  //날짜별 판매 수량 조회 메서드
  List<HashMap<String, Object>> getDateCnt();

  //랭크 조회 메서드
  List<HashMap<String, Object>> getRank();

  //날짜별 매출 조회 메서드
  List<HashMap<String, Object>> getDatePrice();
}
