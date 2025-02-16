import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/profile/Sidebar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/profile/MobileNav'

const Profile = () => {
  const [Profile,setProfile]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
 // const isLoggedIn=useSelector();
  useEffect(()=>{
const fetch=async()=>{
  const response=await axios.get("http://localhost:1000/api/v1/get-user-info",{headers})
  setProfile(response.data);
}
fetch();
  },[]);
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 '>
    {!Profile && <div className='w-full  h-[100%] flex item-center justify-center'><Loader /></div> } 
    {Profile &&
       <>
       <div className='md:w-1/6 w-full lg:h-screen'>
          <Sidebar data={Profile} />
          <MobileNav />
        </div>
        <div className='md:w-5/6 w-full'>
          <Outlet />
        </div>
       </>
       }
    </div>
  )
}

export default Profile