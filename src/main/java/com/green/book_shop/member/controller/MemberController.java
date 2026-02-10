package com.green.book_shop.member.controller;

import com.green.book_shop.member.dto.MemberDTO;
import com.green.book_shop.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  //이메일 중복조회 api
  @GetMapping("/checkId/{memEmail}")
  public ResponseEntity<Integer> checkId(@PathVariable("memEmail") String memEmail){
    try {
      List<MemberDTO> list = memberService.checkId(memEmail);
      return ResponseEntity.status(HttpStatus.OK).body(list.size());
    }catch (Exception e){
      log.error("이메일 중복조회 중 에러 발생", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

//  public ResponseEntity<?> checkId(@PathVariable("memEmail") String memEmail){
//    try {
//      boolean result = memberService.checkId(memEmail);
//      return ResponseEntity.status(HttpStatus.OK).body(result);
//    }catch (Exception e){
//      log.error("이메일 중복조회 중 에러",e);
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//  }
}
