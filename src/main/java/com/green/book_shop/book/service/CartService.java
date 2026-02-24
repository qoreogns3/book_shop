package com.green.book_shop.book.service;

import com.green.book_shop.book.dto.CartDTO;
import com.green.book_shop.book.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
  private final CartMapper cartMapper;

  //카트 번호 저장 후 등록 기능
  public void insertCart(CartDTO cartDTO){
    int num = cartMapper.getNextCartNum();
    cartDTO.setCartNum(num);
    cartMapper.insertCart(cartDTO);
  }

  //카트 목록 조회 기능
  public List<CartDTO> getCartList(String memEmail){
    return cartMapper.getCartList(memEmail);
  }

  //수량 변경 기능
  public void updateCnt(CartDTO cartDTO){
    cartMapper.updateCnt(cartDTO);
  }
}
