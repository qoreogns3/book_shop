package com.green.book_shop.book.controller;

import com.green.book_shop.book.dto.BookDTO;
import com.green.book_shop.book.dto.BookImgDTO;
import com.green.book_shop.book.service.BookService;
import com.green.book_shop.util.UploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@Slf4j
public class BookController {
  private final BookService bookService;
  private final UploadUtil uploadUtil;

  //책 등록 api
  @PostMapping("")
  public ResponseEntity<Object> regBook(BookDTO bookDTO
                                        , @RequestParam("mainImg")MultipartFile mainImgFile
                                        , @RequestParam("subImgs") MultipartFile[] subImgs){
    try {
      //대표 파일 첨부 기능
      //리턴으로 원본파일명, 첨부파일명, isMain(Y)을 BookImgDTO 자료형으로 리턴해줌
      BookImgDTO dto = uploadUtil.fileUpload(mainImgFile);

      //상세 파일들 첨부 기능
      //리턴으로 원본파일명, 첨부파일명, isMain(N)인 BookImgDTO 자료형 다수를 List로 리턴해줌
      List<BookImgDTO> imgList = uploadUtil.multipleFileUpload(subImgs);
      //쿼리 실행 시 빈값을 채울 모든 데이터를 통합
      imgList.add(dto);

      //다음에 insert할 bookNum 데이터 조회
      int nextBookNum = bookService.getNextBookNum();

      //조회한 nextBookNum을 bookDTO에 저장
      bookDTO.setBookNum(nextBookNum);

      //imgList안의 모든 BookImgDTO 객체에도 도서번호를 저장
      for(BookImgDTO bookImgDTO : imgList){
        bookImgDTO.setBookNum(nextBookNum);
      }

      //SHOP_BOOK, BOOK_IMG 테이블에 데이터 삽입
      bookService.regBook(bookDTO, imgList);

      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("책 등록 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //모든 책 조회 api
  @GetMapping("")
  public ResponseEntity<?> getBookList () {
    try {
      List<BookDTO> bookDTOList = bookService.getBookList();
      return ResponseEntity.status(HttpStatus.OK).body(bookDTOList);
    } catch (Exception e) {
      log.error("책 등록 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //해당 번호 도서 조회 api
  @GetMapping("/{bookNum}")
  public ResponseEntity<?> getBook(@PathVariable("bookNum") int bookNum){
    try {
      BookDTO result = bookService.getBook(bookNum);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    } catch (Exception e) {
      log.error("책 등록 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //카테고리 별 책 수량 조회 api
  @GetMapping("/cntCate")
  public ResponseEntity<?> cntCate(){
    try {
      return ResponseEntity.status(HttpStatus.OK).body(bookService.cntCate());
    }catch (Exception e){
      log.error("조회 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
