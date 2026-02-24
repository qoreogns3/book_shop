import { Route, Routes } from 'react-router-dom'
import BasicLayout from './components/layout/basicLayout'
import ManagerLayout from './components/layout/ManagerLayout'
import Join from './pages/member/Join'
import './reset.css'
import BookList from './pages/book/BookList'
import Login from './pages/member/Login'
import BookForm from './pages/book/BookForm'
import WebStorage from './study/WebStorage'
import BookDetail from './pages/book/BookDetail'
import CartList from './pages/cart/CartList'
import MypageLayout from './components/layout/MypageLayout'

function App() {

  // App 그림 다시 그리는법
  // App에 state 변수 생성 후 
  // state 함수를 props를 이용해 컴포넌트로 전달 


  return (
    <>
      <Routes>
        
        {/* Route를 아래와 같이 중복으로 사용하면 두 컴포넌트를 함께 띄울 수 있음 */}
        {/* 컴포넌트에 접근하는 url은 각각 Route와 안쪽 Route의 path의 나열로 지정 */}
        {/* 단, 안쪽 Route의 path속성값은 '/'를 붙이지 않는다. */}
        {/* 바깥 컴포넌트에 <Outlet/>컴포넌트를 사용하여 함께 열리는 컴포넌트의 위치를 지정한다. */}

        {/* 일반회원이 접근하는 페이지들 */}
        <Route path='/' element={<BasicLayout/>}>
          {/* 웹스토리지 학습용 컴포넌트 */}
          <Route path='storage' element={<WebStorage/>}/>
          {/* 도서 목록 페이지, URL : Localhost:5173 */}
          <Route path='' element={<BookList/>}/>
          {/* 회원가입페이지, URL : Localhost:5173/join */}
          <Route path='join' element={<Join/>}/>
          {/* 로그인 페이지, URL : Localhost:5173/login */}
          <Route path='login' element={<Login/>}/>
          {/* 상품 상세 페이지, URL : Localhost:5173/bookNum*/}
          <Route path=':bookNum' element={<BookDetail/>}/>
        </Route>
        
        {/* 매니저 권한의 회원이 접근하는 페이지들 */}
        <Route path='/manage' element={<ManagerLayout/>}>
          {/* 상품 등록 페이지, URL : Localhost:5173/manage/book-form */}
          <Route path='book-form' element={<BookForm/>}/>
        </Route>

        {/* 마이페이지 */}
        <Route path='/mypage' element={<MypageLayout/>}>
        {/* 장바구니 페이지, URL : Localhost:5173/cart */}
          <Route path='cart' element={<CartList/>}/>
        </Route>

      </Routes>
    </>
  )
}

export default App
