package com.green.book_shop.book.mapper;

import com.green.book_shop.book.dto.CartDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CartMapper {
  //카트 등록 메서드
  void insertCart(CartDTO cartDTO);

  //카트 번호 저장 메서드
  int getNextCartNum();

  //카트 목록 조회 메서드
  List<CartDTO> getCartList(String memEmail);

  //수량 변경 메서드
  void updateCnt(CartDTO cartDTO);

  //삭제 메서드
  void deleteCart(int cartNum);

  //입력받은 책 번호 상품 조회 메서드
  Integer findCart(int bookNum, String memEmail);

  //상품 수량 추가 쿼리
  void addCnt(int cartCnt, int bookNum, String memEmail);
}
