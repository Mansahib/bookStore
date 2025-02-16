import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
     <div className='h-screen  md:flex-row flex-col flex items-center '>
    <div className='w-full m:mb-0 mb-12 lg:w-3/6 flex  flex-col items-center lg:items-start justify-center'>
    <h1 className='lg:text-6xl text-4xl font-semibold text-yellow-100 text-left'>
        Discover your next read
        </h1>
        <p className='mt-4 text-xl text-zinc-300'>
            uncover exciting stories,enriching knowledge, and inspiring experiences in our
            vast collection of books.
        </p>
      <div className='mt-8' >
      <Link to="/all-books" className='text-yellow-100 font-semibold text-xl lg:text-2xl border border-yellow-100 px-10 py-3
        rounded-full hover:bg-zinc-800'>
            discover books
        </Link>
      </div>
        
        </div>
    <div className='w-full lg:w-3/6 h-auto lg:-[100%] flex items-center justify-center' >
    <img src="./hero.png" alt="hero image"/>
    </div>
    </div>
  )
}

export default Hero