package com.green.book_shop.member.mapper;

import com.green.book_shop.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

  //회원가입 메서드
  void join(MemberDTO memberDTO);
}
