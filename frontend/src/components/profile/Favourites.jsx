import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const Favourites = () => {
  const[books,setBooks]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  
  }
  useEffect(()=>{
    const fetch=async ()=>{
      const response=await axios.get("http://localhost:1000/api/v1/get-fav-books",{headers})
      setBooks(response.data.data);
    }
    fetch();
  },[books])
  return (
    <>
     
     {
      books && books.length===0 && <div className='h-screen flex items-center justify-center  text-5xl lg:text-6xl font-semibold text-yellow-100'>No books in favourite</div>
    }
    <div className='pb-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
    
         {books && books.map((items,i) =>  
          (
            <div key={i}>
            <BookCard  data={items} favourites={true} />
            </div>
          ))}
    </div>
    </>
  )
}

export default Favourites