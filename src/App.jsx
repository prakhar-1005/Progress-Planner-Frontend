import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './components/Homepage'
import Signup from './components/Signup'
import Login from './components/Login'

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    if(userInfo){
        navigate("/");
    }
  }, []);

  const userInfo = JSON.parse(localStorage.getItem("user"))  // parsing is necessary

  return (
    <div className='bg-[#30E3CA] font-poppins w-full h-[200vh]'>
          <Routes>
            <Route path="/" element={userInfo? <Homepage/> : <Navigate to='/login'/>}/>
            <Route path="/login" element={!userInfo ? <Login/> : <Navigate to="/"/> }/>
            <Route path="/signup" element={!userInfo ? <Signup/> : <Navigate to="/"/> }/>
          </Routes>
    </div>
  )
}

export default App
