package com.green.book_shop.cate.service;

import com.green.book_shop.cate.dto.CateDTO;
import com.green.book_shop.cate.mapper.CateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CateService {
  private final CateMapper cateMapper;

  //카테고리 이름 조회 기능
  public List<CateDTO> getCateName(){
    return cateMapper.getCateName();
  }
}
