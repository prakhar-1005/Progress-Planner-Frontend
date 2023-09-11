import { useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react'
import ModalWindow from './ModalWindow';
import { useNavigate } from 'react-router-dom';

const ListHeader = ({listName,getTodos}) => {

    const userInfo = JSON.parse(localStorage.getItem("user"))

    const { isOpen,onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const toast = useToast()

    const signOut = () =>{  
      localStorage.removeItem("user")
      navigate('/login')
      toast({
        title: 'Success',
        description: "Logged Out Successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-left'
      })
    }

  return (
    <div className='py-4'>
        <div className='flex flex-row-reverse pr-5 mb-9'>   
            <button className="bg-white hover:bg-[#FF6969] rounded-3xl shadow-2xl border-[2px] border-black font-semibold px-3 py-2" onClick={signOut}>SIGN OUT</button>
            <span className='hidden md:flex pr-3 items-center cursor-pointer font-semibold text-white text-lg'>{userInfo.user_email}</span>
        </div>
        <p className=' bg-white rounded-lg  border-[3px] border-black shadow-2xl font-semibold text-center text-xl md:text-3xl w-60 md:w-96 py-5 md:py-8 px-3 mx-auto'>{listName}</p>

        <div className="flex justify-center align-middle mt-5">
            <button onClick={onOpen} className="bg-white hover:bg-[#526D82] hover:text-white rounded-3xl shadow-2xl border-[2px] border-black font-semibold px-3 py-2">ADD NEW <i className="fa-solid fa-plus"></i></button>
        </div>

        <ModalWindow isOpen={isOpen} onClose={onClose} mode={'Add'} getTodos={getTodos} />
    </div>
  )
}       

export default ListHeader
