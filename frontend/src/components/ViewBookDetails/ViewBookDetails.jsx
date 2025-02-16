import React , { useState,useEffect} from 'react'
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import Loader from '../Loader/Loader';
import {useSelector} from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const ViewBookDetails = () => {
  const nav=useNavigate();
    const {id}= useParams();
    const[Data, setData] = useState();
   const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
   const role=useSelector((state)=>state.auth.role);
  // console.log(isLoggedIn,role);
  useEffect(()=>{
      const fetch=async() =>{
          const response=await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        //console.log(response);
          setData(response.data.data)
         // console.log(Data);
      }
   
      fetch();
  },[])
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  const handleFavourities=async()=>{
    
    const response=await axios.post("http://localhost:1000/api/v1/add-book-to-fav",{},{headers})
    alert(response.data.message);
  }

  const addToCart=async()=>{
      const response =await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{headers})
      alert(response.data.message);
  }
  const ondelete=async()=>{
    const res=await axios.delete("http://localhost:1000/api/v1/delete-book",{headers})
    alert(res.data.message);
    nav('/all-books')
    
  }

 //console.log(id);
    return (
   <>
   {Data && (
     <div className='px-12 py-8 bg-zinc-900  flex  lg:flex-row flex-col gap-7'>
     <div className=' lg:w-1/2 w-full '>
 <div className='bg-zinc-800  p-12 flex flex-col lg:flex-row  lg:justify-around rounded '>
 <img src={Data?.url} alt="book" className='lg:h-[70vh] h-[50vh] rounded'></img>
  {isLoggedIn ===true && role==="user" &&
  <div className='flex flex-col lg:flex-col md:flex-row mt-4  lg:mt-0 lg:justify-start justify-between items-center'>
  <button onClick={handleFavourities} className='bg-white lg:rounded-full text-3xl p-2 text-red-500 flex items-center w-full  justify-center'>
  <FaHeart /><span className='ms-4 block lg:hidden text-xl'>Favourties</span>
  </button>
<button onClick={addToCart} className=' lg:rounded-full text-3xl p-2 md:mt-0 mt-4 lg:mt-4 text-white bg-blue-500  w-full flex items-center 
 justify-center '>
  <FaShoppingCart /><span className='ms-4 block lg:hidden text-xl'>Add to Cart</span>
  </button>
  </div>
  }
  {isLoggedIn ===true && role==="admin" &&
  <div className='flex lg:flex-col flex-col md:flex-row mt-4  lg:mt-0 lg:justify-start justify-between items-center'>
  <Link
  to={`/updateBook/${id}`}
   className='bg-black lg:rounded-full text-3xl p-2  text-white flex items-center w-full justify-center '>
  

  
  <FaEdit /><span className='ms-4 block lg:hidden  text-xl'>edit</span>
  
  
  
  </Link>
<button  className=' lg:rounded-full text-3xl p-2 md:mt-0 mt-4 lg:mt-4 text-white bg-black flex w-full
 items-center justify-center '
 onClick={ondelete}>


<MdDelete /><span className='ms-4 block lg:hidden text-xl'>Add to Cart</span>



  </button>
  </div>
  }
 </div>
  
     </div>
     <div className=' lg:w-1/2 w-full p-4'>
        <h1 className='text-4xl text-zinc-300 font-semibold'>{Data?.title}</h1>
        <p className='text-zinc-400 m-1'>by {Data?.author}</p>
        <p className='text-zinc-500 mt-4 text-xl'> {Data?.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-400'>
            {Data?.language}
        </p>
       <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
        price : ₹ {Data?.price}{" "}
       </p>
     </div>
 </div>
   )}
   {!Data && <div className='flex justify-center items-center h-screen bg-zinc-900'><Loader/></div>}
   </>
  )
}

export default ViewBookDetails