package com.green.book_shop.member.controller;

import com.green.book_shop.member.dto.MemberDTO;
import com.green.book_shop.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
  private final MemberService memberService;

  //회원 정보 등록 api
  @PostMapping("")
  public ResponseEntity<Object> join(@RequestBody MemberDTO memberDTO){
    try {
      memberService.join(memberDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("회원가입 작업 중 에러 발생", e);
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
