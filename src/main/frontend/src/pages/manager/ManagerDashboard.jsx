import React, { useEffect, useState } from 'react'
import styles from './ManagerDashboard.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { cntCateBook, getBuyCnt, getCntMember, getDateCnt, getPrice, getRank, getStock } from '../../api/manager';
import ListTable from '../../components/common/ListTable';

const ManagerDashboard = () => {
  //날짜 별 회원가입 수 저장 state변수
  const [memberCnt, setMemberCnt] = useState([]);
  //카테고리 별 상품 수 저장 state변수
  const [catecnt, setCateCnt] = useState([]);
  //상품 별 구매 수량 저장 state변수
  const [buyCnt, setBuyCnt] = useState([]);
  //날짜 별 상품 판매 수량 저장 state변수
  const [dateCnt, setDateCnt] = useState([]);
  //회원 별 랭크 저장 state변수
  const [rank, setRank] = useState([]);
  //날짜 별 매출 저장 state변수
  const [price, setPrice] = useState([]);
  //재고 5권이하 도서 저장 state변수
  const [bookStock, setBookStock] = useState([]);
  
  //오늘 날짜 저장 변수
  const today = new Date;
  const formatted = today.toISOString().slice(0, 10);

  //오늘의 주문건수 리턴 함수
  const todayCnt = () => {
    let cnt = 0
    for(let e of dateCnt){
      if(e.BUY_DATE === formatted){
        cnt = cnt + e.BUY_CNT
      } 
    }
    return cnt;
  }

  //이달의 주문건수 리턴 함수
  const monthCnt = () => {
    let cnt = 0
    for(let e of dateCnt){
      if(e.BUY_DATE.slice(0, 7) === formatted.slice(0, 7)){
        cnt = cnt + e.BUY_CNT
      }
    }
    return cnt;
  }

  //오늘의 매출금액 리턴 함수\
  const todayPrice = () => {
    let cnt = 0
    for(let e of price){
      if(e.BUY_DATE === formatted){
        cnt = cnt + e.BUY_PRICE
      } 
    }
    return cnt;
  }

  //이달의 매출금액 리턴 함수
  const monthPrice = () => {
    let cnt = 0
    for(let e of price){
      if(e.BUY_DATE.slice(0, 7) === formatted.slice(0, 7)){
        cnt = cnt + e.BUY_PRICE
      }
    }
    return cnt;
  }

  //날짜 별 회원가입 수 조회 함수
  const getMemberCnt = async () =>{
    const response = await getCntMember();
    setMemberCnt(response.data)
  }

  //카테고리 별 상품 수 조회 함수
  const getCntBook = async () => {
    const response = await cntCateBook();
    setCateCnt(response.data)
  }

  //상품 별 구매 수량 조회 함수
  const getCntBuy = async () => {
    const response = await getBuyCnt();
    const arr = response.data.map(e => {return {
      buyCnt : e.buyCnt,
      bookNum : e.bookDTO.bookNum,
      bookTitle : e.bookDTO.bookTitle
    }})
    setBuyCnt(arr)
  }

  //날짜별 판매 수량 조회 함수
  const getCntDate = async () => {
    const response =await getDateCnt();
    setDateCnt(response.data);
  }

  //회원별 랭크 조회 함수
  const getMemberRank = async () => {
    const response = await getRank();
    setRank(response.data)
  }

  //날짜별 매출 조회 함수
  const getDatePrice = async () => {
    const response = await getPrice();
    setPrice(response.data)
  }

  //재고 5권이하 도서 조회
  const getBookStock = async () => {
    const response = await getStock();
    setBookStock(response.data)
  }

  useEffect(()=>{
    getMemberCnt(); 
    getCntBook(); 
    getCntBuy();
    getCntDate();
    getMemberRank();
    getDatePrice();
    getBookStock();
  }, [])

  
  //pie차트 색 저장 변수
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ef4444'];

  return (
    <div className={styles.container}>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <div>
            <p>오늘의 주문 건수</p>
            <div>{todayCnt()}</div>
          </div>
          <div>
            <p>이 달의 주문 건수</p>
            <div>{monthCnt()}</div>
          </div>
          <div>
            <p>오늘의 매출금액</p>
            <div>{todayPrice()}</div>
          </div>
          <div>
            <p>이 달의 매출금액</p>
            <div>{monthPrice()}</div>
          </div>
        </div>
        <div className={styles.div3}>
          <div>
            <p>이 달의 우수 고객</p> 
            <p className={styles.vip}>⭐{rank[0]?.MEM_EMAIL} 님</p >
          </div>
          <ListTable>
            <thead>
              <tr>
                <td>랭킹</td>
                <td>이메일</td>
                <td>구매건수</td>
                <td>구매금액</td>
              </tr>
            </thead>
            <tbody>
              {
                rank.map((data, i)=>{return(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{data.MEM_EMAIL}</td>
                    <td>{data.BUY_CNT}</td>
                    <td>{data.BUY_PRICE}</td>
                  </tr>
                )})
              }
            </tbody>
          </ListTable>
        </div>
      </div>
      <div>
        <p>날짜 별 회원 가입 수</p>
        <div className={styles.member_chart}>
          <ResponsiveContainer width="90%" height={300}>
            <LineChart
              data={memberCnt}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="JOIN_DATE" />
              <YAxis allowDecimals={false}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="MEM_CNT" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.pie_chart_div}>
        <p>카테고리 별 상품 수</p>
        <PieChart style={{ width: '100%', maxWidth: '900px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
          <Pie
            dataKey="BOOK_CNT"
            startAngle={180}
            endAngle={0}
            data={catecnt}
            cx="40%"
            cy="80%"
            outerRadius="80%"
            label = {({ CATE_NAME, BOOK_CNT }) => `${CATE_NAME} : ${BOOK_CNT}권`}
          >
            {catecnt.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className={styles.buy_cnt}>
        <p>도서 별 판매 현황</p>
        <BarChart width={400} height={300} data={buyCnt}>
          <CartesianGrid strokeDasharray="3 3" />  {/* 격자선 */}
          <XAxis dataKey="bookNum" />                 {/* X축 */}
          <YAxis 
            allowDecimals={false}  
          />                                {/* Y축 */}
          <Tooltip
            formatter={(value) => [value, '구매수']}
            labelFormatter={(label) => {
              const book = buyCnt.find(e => e.bookNum === label);
              return book ? `📚 ${book.bookTitle}` : label;
            }}
          />                            {/* 마우스 호버시 값 표시 */}
          <Bar 
            dataKey="buyCnt"
            fill="#8884d8"
            label={{ position: 'top' }}  // 막대 위에 값 표시 
          />      {/* 막대 */}
        </BarChart>
      </div>
      <div>
        <p>날짜 별 판매 현황</p>
        <AreaChart
          style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
          responsive
          data={dateCnt}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          onContextMenu={(_, e) => e.preventDefault()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Area type="monotone" dataKey="BUY_CNT" />
          <XAxis 
            dataKey="BUY_DATE"
            tickFormatter={(value) => value}  // '2026-03-03' 그대로 표시
            tick={{ fontSize: 11 }}           // 글씨 작게
            angle={-30}                       // 비스듬히
            textAnchor="end"
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area type="BUY_CNT" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>
      <div className={styles.stock_div}>
        <p>재고 5권 이하 도서 목록</p>
        <ListTable>
          <thead>
            <tr>
              <td>제목</td>
              <td>재고</td>
            </tr>
          </thead>
          <tbody>
            {
              bookStock.map((data, i) => {return(
                <tr key={i}>
                  <td>{data.bookTitle}</td>
                  <td>{data.bookStock}</td>
                </tr>
              )})
            }
          </tbody>
        </ListTable>
        

      </div>
    </div>
  )
}

export default ManagerDashboard