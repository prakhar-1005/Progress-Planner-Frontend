import React from 'react'
import check from '../images/check.png'
import { useDisclosure, useToast } from '@chakra-ui/react'
import ModalWindow from './ModalWindow'
import axios from 'axios'
import '../index.css'

const ListItem = ({task,getTodos}) => {

  const userInfo = JSON.parse(localStorage.getItem("user"))

  const config = {
    headers: {
    Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { isOpen,onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const handleDelete = async () =>{
    try {
      const response = await axios.delete(`https://progress-planner-backend.vercel.app/api/todos/${task.id}`,config)
      console.log(response.data);
      if (response.status==200){
        onClose()
        getTodos()
      }
      toast({
        title: 'Success',
        description: `${response.data} Successfully`,
        status: 'success',
        position:'top-left',
        duration: 2000,
        isClosable: true,
      })


    } catch (error) {
      toast({
        title: 'Error',
        description: `Error Occured While Deleting Todo`,
        status: 'error',
        position:'top-left',
        duration: 2000,
        isClosable: true,
      })
      console.log(error);
    }
  }

  return (
    <>
    <div className='flex justify-center align-middle items-center'>
        <div className='bg-white hover:bg-[#526D82] flex justify-between align-middle items-center hover:text-white rounded-3xl shadow-2xl w-[320px] md:w-[600px] lg:w-[700px] mt-5 px-3 py-4 border-[2px] border-black font-semibold'>
            <img src={check} alt="check" className='w-6 h-6 md:w-9 md:h-9' />
            <p>{task.title.length<9 ? task.title : task.title.slice(0,9)+'...'}</p>
            <input type="range" min="0" max="100" value={task.progress} className='w-[80px] md:w-[200px] custom-progress-bar' readOnly />
            <div>
                <button onClick={onOpen} className='bg-white hover:bg-[#FEFFAC] text-black rounded-full shadow-2xl border-[2px] border-black font-semibold px-2 py-1 md:px-3 mr-2'><span className='hidden md:inline pr-1'>EDIT</span><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={handleDelete} className='bg-white hover:bg-[#FF6969] text-black rounded-full shadow-2xl border-[2px] border-black font-semibold px-2 py-1 md:px-3'><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    </div>
    <ModalWindow isOpen={isOpen} onClose={onClose} mode={'Edit'} task={task} getTodos={getTodos} />
    </>
  )
}

export default ListItem
