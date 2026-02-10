package com.green.book_shop.member.service;

import com.green.book_shop.member.dto.MemberDTO;
import com.green.book_shop.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberMapper memberMapper;

  //회원 정보 등록 기능
  public void join(MemberDTO memberDTO){
    memberMapper.join(memberDTO);
  }

  //이메일 중복조회 기능
  public List<MemberDTO> checkId(String memEmail){
    return memberMapper.checkId(memEmail);
  }

  //  public boolean checkId(String memEmail){
  //    //이메일이 조회 안 됨(email = null)
  //    String email = memberMapper.checkId(memEmail);
  //    return email == null ? true : false;
  //  }
}
