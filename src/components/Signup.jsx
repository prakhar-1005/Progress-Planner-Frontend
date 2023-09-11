import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Signup = () => {

  const navigate = useNavigate();
  const toast = useToast()

  const [user_email, setUser_email] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const handleSignup =async (e)=>{
    e.preventDefault()

    try {
      const response = await axios.post('https://progress-planner-backend.vercel.app/api/user/signup',{
        user_email,
        password,
        confirm_password
      })

      toast({
        title: 'Success',
        description: "Signup Successful",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-left'
      })

      localStorage.setItem("user", JSON.stringify(response.data)) 

      navigate('/')
      
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        position:'top-left',
        duration: 3000,
        isClosable: true,
      })
      console.log(error);
    }
  }

  return (
    <>
    <p className='text-center font-extrabold text-white text-4xl pt-24 md:pt-32'>Welcome</p>
    <div className='flex justify-center align-middle items-center'>
        <div className='bg-white flex justify-center align-middle items-center rounded-3xl shadow-2xl w-[320px] md:w-[400px] md:h-[350px] lg:w-[420px] lg:h-[350px] mt-4 px-3 py-4 border-[2px] border-black font-semibold'> 
            <form  className='flex flex-col' onSubmit={handleSignup}>
            <p className='text-center font-bold text-xl'>Signup</p>
                <input className='md:w-72 bg-white rounded-3xl shadow-2xl mt-5 px-3 py-2 border-[2px] border-black font-semibold' type="email" required maxLength={225} placeholder='Email' onChange={e=>setUser_email(e.target.value)} value={user_email} />
                <input className='bg-white rounded-3xl shadow-2xl mt-5 px-3 py-2 border-[2px] border-black font-semibold' type="password" required maxLength={225} placeholder='Password' onChange={e=>setPassword(e.target.value)} value={password} />
                <input className='bg-white rounded-3xl shadow-2xl mt-5 px-3 py-2 border-[2px] border-black font-semibold' type="password" required maxLength={225} placeholder='Confirm Password' onChange={e=>setConfirmPassword(e.target.value)} value={confirm_password} />
                <button type="submit" className="bg-white hover:bg-[#526D82] mt-5 hover:text-white rounded-3xl shadow-2xl border-[2px] border-black font-semibold px-3 py-2">Signup</button>
            </form>
        </div>
    </div>
          <h3 className='font-extrabold text-center p-7 text-white'>Already have an account?<Link className='underline text-lg' to='/login'> Login </Link></h3>
    </>
  )
}

export default Signup
