package com.green.book_shop.cate.controller;

import com.green.book_shop.cate.dto.CateDTO;
import com.green.book_shop.cate.service.CateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/cates")
public class CateController {
  private final CateService cateService;

  //카테고리 이름 조회 api
  @GetMapping("")
  public ResponseEntity<?> getCateName(){
    try {
      List<CateDTO> cateDTOS = cateService.getCateName();
      return ResponseEntity.status(HttpStatus.OK).body(cateDTOS);
    } catch (Exception e){
      log.error("카테고리 조회 중 에러 발생", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
