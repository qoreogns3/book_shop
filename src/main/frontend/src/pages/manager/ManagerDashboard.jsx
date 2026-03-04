import React, { useEffect, useState } from 'react'
import styles from './ManagerDashboard.module.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { cntCateBook, getCntMember } from '../../api/manager';

const ManagerDashboard = () => {
  //날짜 별 회원가입 수 저장 state변수
  const [memberCnt, setMemberCnt] = useState([]);
  //카테고리 별 상품 수 저장 state변수
  const [catecnt, setCateCnt] = useState([]);

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
  useEffect(()=>{getMemberCnt(), getCntBook()}, [])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ef4444'];

  return (
    <div className={styles.container}>
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
      <div>
        <p>카테고리 별 상품 수</p>
        <PieChart style={{ width: '100%', maxWidth: '900px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
          <Pie
            dataKey="BOOK_CNT"
            startAngle={180}
            endAngle={0}
            data={catecnt}
            cx="40%"
            cy="100%"
            outerRadius="80%"
            label = {({ CATE_NAME, BOOK_CNT }) => `${CATE_NAME} : ${BOOK_CNT}권`}
          >
            {catecnt.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div>3</div>
      <div>4</div>
    </div>
  )
}

export default ManagerDashboard