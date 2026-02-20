package com.green.book_shop.util;

import com.green.book_shop.book.dto.BookImgDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class UploadUtil {
  //application.properties 파일의 file.upload.dir로 선언한 데이터를 주입
  @Value("${file.upload.dir}")
  private String uploadPath;

  //단일 파일 업로드 기능
  public BookImgDTO fileUpload(MultipartFile mainImgFile){
    //파일 업로드한 정보를 담아서 리턴할 용도의 객체
    BookImgDTO imgInfo = null;

    //선택을 선택했을때만 업로드 로직 시작
    if(mainImgFile != null){
      imgInfo = new BookImgDTO();

      //화면에서 선택한 원본 파일명
      String originFileName = mainImgFile.getOriginalFilename();

      //첨부할 파일명 생성(첨부파일명 중복 방지를 위해)
      String uuid = UUID.randomUUID().toString();

      //원본파일의 확장자 추출
      String extension = originFileName.substring( originFileName.lastIndexOf(".") );

      //첨부할 파일명
      String uploadFileName = uuid + extension;//assvc-ffeec-ddff.jpg

      //파일 생성 코드
      //  "D:/01-STUDY/dev/upload/" + "abc.jpg"
      //   -> "D:/01-STUDY/dev/upload/abc.jpg"
      File file = new File(uploadPath + uploadFileName);

      //위 코드에서 만들어진 file에 첨부할 이미지 파일을 덮어쓰운다.
      try {
        mainImgFile.transferTo(file);

        //업로드 후 결과 데이터를 저장
        imgInfo.setOriginFileName(originFileName);
        imgInfo.setUploadFileName(uploadFileName);
        imgInfo.setIsMain("Y");
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }
    return imgInfo;
  }

  //다중 파일 업로드 기능
  public List<BookImgDTO> multipleFileUpload(MultipartFile[] subImgs){
    //모든 데이터를 저장할 수 있는 List
    List<BookImgDTO> list = new ArrayList<>();

    //매개변수로 들어온 첨부파일 수만큼 반복
    for(MultipartFile subImg : subImgs){
      BookImgDTO dto = fileUpload(subImg);
      dto.setIsMain("N");
      list.add(dto);
    }
    return list;
  }

}
