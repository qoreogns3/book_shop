package com.green.book_shop.member.mapper;

import com.green.book_shop.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import javax.swing.*;
import java.util.List;

@Mapper
public interface MemberMapper {

  //회원가입 메서드
  void join(MemberDTO memberDTO);

  //이메일 중복조회 메서드
  List<MemberDTO> checkId(String memEmail);

  //  String checkId(String memEmail);

  //로그인 메서드
  MemberDTO login(MemberDTO memberDTO);
  MemberDTO loginEmail(MemberDTO memberDTO);
}
