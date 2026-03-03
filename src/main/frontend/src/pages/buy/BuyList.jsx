import React, { useEffect, useState } from 'react'
import { getBuyDetailList, getBuyList } from '../../api/buyApi'
import ListTable from '../../components/common/ListTable'
import dayjs from 'dayjs'
import styles from './BuyList.module.css'

const BuyList = () => {

  //구매 정보 저장 state 변수
  const [buyList, setBuyList] = useState([])

  //구매 상세 정보 저장 state변수
  const [buyDetailList, setBuyDetailList] = useState([])

  //구매 정보, 상세 정보 조회 함수
  const getBuy = async () => {
    const response = await getBuyList();
    const response2 = await getBuyDetailList()
    setBuyList(response.data);
    setBuyDetailList(response2.data);
    console.log(response2.data)
  }
  useEffect(()=>{getBuy()}, [])

  //버튼 클릭 시 상세 정보 슬라이드 유/무 저장 함수
  const [openNum, setOpenNum] = useState(null)
  

  

  
  console.log(buyList)
  console.log(buyDetailList)
  return (
    <div>
      {buyList.length === 0 ? <p>구매 정보가 없습니다.</p> : 
      <div>
        {
          buyList.map((data ,i) => {return(
            <div key={i}>
              <table className={styles.buy_list} onClick={() => setOpenNum(i)}>
                <colgroup>
                  <col width='5%'/>
                  <col width='55%'/>
                  <col width='15%'/>
                  <col width='25%'/>
                </colgroup>
                <thead>
                  <tr>
                    <td>{buyList.length - i}</td>
                    <td>{data.buyDetailList[0].bookDTO.bookTitle}{data.buyDetailList[0].buyCnt === 1 ? <></> : <span> 외 {data.buyDetailList[0].buyCnt-1}권</span>}</td>
                    <td>{data.buyPrice.toLocaleString()}원</td>
                    <td>{dayjs(data.buyDate).format('YYYY-MM-DD  hh시 mm분')}</td>
                  </tr>
                </thead>
              </table>
              <ListTable>
                <thead>
                  <tr>
                    <td>No</td>
                    <td>도서 정보</td>
                    <td>가격</td>
                    <td>수량</td>
                    <td>구매 가격</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    buyDetailList.filter(e => e.buyNum === data.buyNum).map((detail, j) => {return(
                      <tr>
                        <td>{buyDetailList.filter(e => e.buyNum === data.buyNum).length - j}</td>
                        <td>{detail.bookDTO.bookTitle}</td>
                        <td>{detail.bookDTO.bookPrice}</td>
                        <td>{detail.buyCnt}</td>
                        <td>{detail.bookDTO.bookPrice*detail.buyCnt}</td>
                      </tr>
                    )})
                  }
                </tbody>
              </ListTable>
            </div>
          )})
        }
      </div>
      }
    </div>
  )
}

export default BuyList