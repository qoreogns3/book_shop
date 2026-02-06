import React from 'react'
import styles from './Join.module.css'
// public class MemberDTO {
//   private String memEmail;
//   private String memPw;
//   private String memName;
//   private String memTel;
//   private String memAddr;
//   private String addrDetail;
//   private String isUsing;
//   private String memRole;
//   private LocalDateTime joinDate;
// }
const Join = () => {
  return (
    <div className={styles.container}>
      <div className={styles.emailDiv}>
        <p>Email</p>
        <div>
          <input type="text" />
          <button type='button'>중복확인</button>
        </div>
      </div>
      <div className={styles.password}>
        <p>Password</p>
        <input type="password" />
      </div>
      <div>
        <p>Confirm Password</p>
        <input type="password" />
      </div>
      <div>
        <p>Name</p>
        <input type="text" />
      </div>
      <div>
        <p>Tel</p>
        <div className={styles.tel_input}>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
      <div className={styles.addr}>
        <p>Address</p>
        <div className={styles.addr1}>
          <input type="text"/>
          <button type="button">검색</button>
        </div>
        <input type="text" />
      </div>
      <button type='button'>회원가입</button>
    </div>
  )
}

export default Join