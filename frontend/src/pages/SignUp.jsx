import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const[Values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:""
  })
 const navigate = useNavigate()

  const change=(e)=>{
    const {name,value}= e.target;
    setValues({...Values,[name]:value});

  }
  const submit= async ()=>{
    try{
      //e.preventDefault();
      if(Values.username ==="" || Values.email ==="" || Values.password ==="" || Values.address ===""){
        alert("Please fill all the fields");
      }
      else{
        const response= await axios.post("http://localhost:1000/api/v1/sign-up",Values);
        alert(response.data.message);
        // alert("Sign up successful");
        navigate('/login');
      }
      

    }
    catch(err){
    alert(err.response.data.message);
    }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
       <p className='text-zinc-200 text-xl '>Sign Up</p>
       <div className='mt-4'>
        <div>
          <label htmlFor="" className='text-zinc-400'>UserName</label>
          <input type="text"
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='username'
          name='username'
          required
          value={Values.username}
          onChange={change}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>Email</label>
          <input type="email" 
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='email@gmail.com'
          name='email'
          required
          value={Values.email}
          onChange={change}
          />
        

        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>Password</label>
          <input type="password"
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='##########'
          name='password'
          required
          value={Values.password}
          onChange={change}
          />
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>Address</label>
          <textarea
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          name='address'
          rows="5"
          placeholder=''
          required
          value={Values.address}
          onChange={change}
          />
        </div>
        <div className='mt-4'>  
              <button className='w-full bg-blue-500 hover:bg-zinc-600 text-zinc-100 p-2 outline-none'
              type='submit' onClick={submit}>SignUp</button>
        </div>
         <div className='mt-4'>
          <h1 className='text-zinc-500 text-xl justify-center items-center flex'>or</h1>
         </div>
         <div className='mt-4'>
          <p className='text-zinc-500 text-xl justify-center items-center flex'>already have account ?
            &nbsp;<Link to='/LogIn' className='text-blue-500 hover:text-zinc-600'>Login</Link>
          </p>
         </div>
       </div>  
      
      </div>
     </div>
  )
}

export default SignUp