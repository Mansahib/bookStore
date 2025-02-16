import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'
import { useDispatch } from 'react-redux'
const Login = () => {
  const[Values,setValues]=useState({
    username:"",
    password:""
    
  })
 const navigate = useNavigate()
 const dispatch=useDispatch();
  const change=(e)=>{
    const {name,value}= e.target;
    setValues({...Values,[name]:value});

  }
  const submit= async ()=>{
    try{
      
      if(Values.username ==="" || Values.password ==="" ){
        alert("Please fill all the fields");
      }
      else{
        const response= await axios.post("http://localhost:1000/api/v1/sign-in",Values);
        console.log(response.data);
        alert("Login successful");
       // navigate('/');
       dispatch(authActions.login());
       dispatch(authActions.changeRole(response.data.role));
       localStorage.setItem("id",response.data.id)
       localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role); 
        navigate('/profile');
      }
      

    }
    catch(err){
      alert(err.response.data.message);
    }
  }
  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
       <p className='text-zinc-200 text-xl '>Login</p>
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
              <button className='w-full bg-blue-500 hover:bg-zinc-600 text-zinc-100 p-2 outline-none'
              type='submit' onClick={submit}>Login</button>
        </div>
         <div className='mt-4'>
          <h1 className='text-zinc-500 text-xl justify-center items-center flex'>or</h1>
         </div>
         <div className='mt-4'>
          <p className='text-zinc-500 text-xl justify-center items-center flex'>Don't have an account ?
            &nbsp;<Link to='/SignUp' className='text-blue-500 hover:text-zinc-600'>SignUp</Link>
          </p>
         </div>
       </div>  
      
      </div>
     </div>
  )
}

export default Login