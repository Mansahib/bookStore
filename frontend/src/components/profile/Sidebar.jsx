import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = ({data}) => {
  const dispatch=useDispatch();
  const history=useNavigate();
  const role=useSelector((state)=>state.auth.role);

  return (
    <div className=' bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
       <div className='flex items-center flex-col justify-center' >
       <img src={data.avatar} className='h-[12vh] '></img>
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{ data.username}</p>
        <p className='mt-1 text-normal text-zinc-300 font-semibold '> {data.email}</p>
       <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
       </div>
    {role==="user" &&(
       <div className='w-full  hidden lg:flex flex-col items-center justify-center'>
       <Link 
       to="/profile"
       className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
          favourites
       </Link>
       <Link 
       to="/profile/orderHistory"
       className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
           order history
       </Link>
       <Link 
       to="/profile/settings"
       className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
           settings
       </Link>
  </div>
    )}
     {role==="admin" &&(
       <div className='w-full  hidden lg:flex flex-col items-center justify-center'>
       <Link 
       to="/profile"
       className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
          All orders
       </Link>
       <Link 
       to="/profile/addBook"
       className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
           Add book
       </Link>
       <Link 
       to="/all-books"
       className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
           All books
       </Link>
       
      
  </div>
    )}
    <button className='bg-zinc-90 w-3/6 lg:w-full mt-4 py-2 lg:mt-0 text-white font-semibold flex items-center 
    justify-center bg-zinc-900 rounded transition-all'
    onClick={()=>{
      dispatch(authActions.logout());
      dispatch(authActions.changeRole("user"));
      localStorage.clear("id");
      localStorage.clear("role");
      localStorage.clear("token");
      history("/");
    }}> Logout </button>
    </div>  
  )
}

export default Sidebar