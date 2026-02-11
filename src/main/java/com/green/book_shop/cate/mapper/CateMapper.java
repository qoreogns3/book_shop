package com.green.book_shop.cate.mapper;

import com.green.book_shop.cate.dto.CateDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CateMapper {

  //카테고리 이름 조회 메서드
  List<CateDTO> getCateName();
}
