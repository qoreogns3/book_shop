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
  List<CartDTO> getCartList();
}
