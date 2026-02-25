package com.green.book_shop.book.controller;

import com.green.book_shop.book.dto.BuyDTO;
import com.green.book_shop.book.dto.BuyDetailDTO;
import com.green.book_shop.book.service.BuyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("buys")
public class BuyController {
  private final BuyService buyService;

  //구매 정보 등록 api
  @PostMapping("")
  public ResponseEntity<?> insertBuy(@RequestBody BuyDTO buyDTO){
    try {
      buyService.insertBuy(buyDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("구매 정보 등록 실패", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //구매 상세정보 등록 api
  @PostMapping("/details")
  public ResponseEntity<?> insertBuyDetail(@RequestBody List<BuyDetailDTO> buyDetailDTOList){
    try {
      buyService.insertBuyDetail(buyDetailDTOList);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("구매 상세정보 등록 실패", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}
