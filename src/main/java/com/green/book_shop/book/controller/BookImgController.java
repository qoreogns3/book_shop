package com.green.book_shop.book.controller;

import com.green.book_shop.book.service.BookImgService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/imgs")
@RequiredArgsConstructor
public class BookImgController {
  private final BookImgService bookImgService;
}
