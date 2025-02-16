import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({data,favourites}) => {
  
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  }
const removebookfromfav=async()=>{
  const response=await axios.put("http://localhost:1000/api/v1/delete-book-from-fav",{},{headers})
   alert(response.data.message);
}

   // console.log(data);
  return (
    <>
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>  
    <Link to={`/get-book-by-id/${data._id}`} >
    <div className=" h-[55vh] ">
        <div className='bg-zinc-900 rounded  flex items-center justify-center'>
        <img src={data.url} className='h-[35vh] '></img>    
        </div>
        <h2 className='mt-4 text-xl text-yellow-100 font-semibold'>
            {data.title}
        </h2>
        <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
        <p className='mt-2 text-zinc-400 font-semibold'> ₹ {data.price}</p>
        </div>
    </Link>
    {favourites && (
       <button className='bg-yellow-100 mt-2
        font-semibold px-4 py-2 rounded border border-yellow-500
         text-yellow-500'
         onClick={removebookfromfav}>Remove from favourites</button>
       

    )}  
    </div>
    </>
  )
}

export default BookCard