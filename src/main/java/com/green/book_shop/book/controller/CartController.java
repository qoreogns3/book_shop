package com.green.book_shop.book.controller;

import com.green.book_shop.book.dto.CartDTO;
import com.green.book_shop.book.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {
  private final CartService cartService;

  //카트 등록 api
  @PostMapping("")
  public ResponseEntity<?> insertCart(@RequestBody CartDTO cartDTO){
    try {
      cartService.insertCart(cartDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("카트 등록 에러",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //카트 목록 조회 api
  @GetMapping("")
  public ResponseEntity<?> getCartList(){
    try {
      List<CartDTO> cartDTOList = cartService.getCartList();
      return ResponseEntity.status(HttpStatus.OK).body(cartDTOList);
    }catch (Exception e){
      log.error("카트 목록 조회 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
