package com.green.book_shop.book.controller;

import com.green.book_shop.book.dto.BuyDTO;
import com.green.book_shop.book.dto.BuyDetailDTO;
import com.green.book_shop.book.dto.BuyRequestDTO;
import com.green.book_shop.book.service.BuyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("buys")
public class BuyController {
  private final BuyService buyService;

  //구매 정보 등록 api
  @PostMapping("")
  public ResponseEntity<?> insertBuy(@RequestBody BuyRequestDTO buyRequestDTO){
    try {
      buyService.insertBuy(buyRequestDTO.getBuyDTO(), buyRequestDTO.getBuyDetailDTOList());
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("구매 정보 등록 실패", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //구매 정보 조회 api
  @GetMapping("")
  public ResponseEntity<?> getBuyList(){
    try {
      return ResponseEntity.status(HttpStatus.OK).body(buyService.getBuyList());
    }catch (Exception e){
      log.error("구매 정보 조회 실패", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //구매 상세 정보 조회 api
  @GetMapping("/detail")
  public ResponseEntity<?> getBuyDetailList(){
    try {
      return ResponseEntity.status(HttpStatus.OK).body(buyService.getBuyDetailList());
    }catch (Exception e){
      log.error("구매 상세 정보 조회 실패", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }


}
