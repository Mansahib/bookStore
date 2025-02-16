import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/profile/Favourites'
import UserOrderHistory from './components/profile/UserOrderHistory'
import Setting from './components/profile/Setting'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import Updatebook from './pages/Updatebook'
const App = () => {
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role)

  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role"))
          {
            dispatch(authActions.login());
            dispatch(authActions.changeRole(localStorage.getItem("role")));
          }
 
    },[]);
  return (
    <div>
     
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/updateBook/:id" element={<Updatebook />} />
          <Route path="/profile" element={<Profile />} >

             {(role === "user") ? <Route index element={<Favourites />} />: <Route index element={<AllOrders />} />}

             <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
             <Route path='/profile/settings' element={<Setting />} />
             {role==="admin" && <Route path="/profile/addbook" element={<AddBook />} />}
          </Route>   
          <Route path="/get-book-by-id/:id" element={<ViewBookDetails />}/>
        </Routes>
        <Footer />
     
    
    </div>
  )
}

export default App