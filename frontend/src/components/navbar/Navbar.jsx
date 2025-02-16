import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links=[
        {
            title:"Home",
            link:"/"
        },
     

        {
                title:"All books",
                link:"/all-books"
         },
        {
                    title:"Cart",
                    link:"/cart"
                    },
                    {
                        title:"profile",
                        link:"/profile"
                        },
                        {
                          title:"Admin profile",
                          link:"/profile"
                          },

    ];
    const isLoggedIn= useSelector ((state)=>state.auth.isLoggedIn);
    
  //  console.log(isLoggedIn);
    if( isLoggedIn===false ){
        links.splice(2);
    }
   const role= useSelector((state)=>state.auth.role);
   if(role==="admin" && isLoggedIn===true){
    links.splice(2,2);
   }
   if(role==="user" && isLoggedIn===true){
    links.splice(4,1);
   }
    const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
    <nav className='bg-zinc-800 text-white px-8 py-4 z-50 relative flex items-center justify-between'>
        
    <Link to="/">    <div className='flex items-center'>
        <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"></img>
        <h1 className='text-2xl font-semibold'>BookHeaven</h1>
    </div>
    </Link>

    <div className='nav-links-bookheaven block md:flex items-center gap-4'>
       <div className='hidden md:flex gap-4'> 
        
        {
        links.map((items,i)=>
        <Link to={items.link} className='hover:text-blue-500 transition-all 
       duration-300' key={i}>{items.title}
       
       </Link>)}
       
       </div>
       <div className=' hidden md:flex gap-4'>
        {isLoggedIn===false && (
            <>
                 <Link to="/logIn" className='px-2 py-1 border border-blue-500 bg-blue-500 rounded
        hover:bg-blue-700 text-white'>Login</Link>
        <Link to="/SignUp" className='px-2 py-1 bg-white text-zinc-500 rounded
        hover:text-zinc-800'>sign up</Link>
            </>
        )}
       </div>
       <button className="text-white text-xl hover:text-zinc-400 md:hidden lg:hidden block" onClick={()=> setMobileNav
        (MobileNav==="hidden"?"block":"hidden")}>
        <FaGripLines />
       </button>
    </div>
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center `}>
    {
        links.map((items,i)=>
        <Link to={items.link} className='hover:text-blue-500 text-yellow-100  text-4xl
         font-semibold transition-all 
       duration-300 mb-5' key={i} onClick={()=> setMobileNav
        (MobileNav==="hidden"?"block":"hidden")}
       >{items.title}
       
       </Link>)}
       
       {isLoggedIn===false && (
        <>
         <Link to="/logIn" className='text-semibold text-3xl px-8 py-2 mb-4 border border-blue-500 
        bg-blue-500 rounded
        hover:bg-blue-700 text-white'>Login</Link>
        <Link to="/SignUp" className='text-semibold text-3xl px-8 py-2 bg-white
         text-zinc-500 rounded
        hover:text-zinc-800'>sign up</Link>
       
        </>
       )}
       
    </div>

    </>
  )
}

export default Navbar