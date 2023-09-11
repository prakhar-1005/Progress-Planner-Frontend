import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast} from '@chakra-ui/react'
import axios from 'axios';

const ModalWindow = ({isOpen,onClose,mode,task,getTodos}) => {
    
    const userInfo = JSON.parse(localStorage.getItem("user"))

    const config = {
      headers: {
      Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const [data, setData] = useState({
      user_email:mode=="Edit" ?task.user_email : userInfo.user_email,
      title:mode=="Edit" ? task.title :"",
      progress:mode=="Edit" ?task.progress : 0,
      date:mode=="Edit" ? "" : new Date()
    });

    const toast = useToast()

    const handleChange = (e) =>{
      const {name,value} = e.target

      // 1) The 'setData' uses a functional update to ensure the latest state is used as the base for the update.

      // 2) IMPORTANT- (data) => ..., means that you're essentially defining an arrow function that receives the "current state" (referred to as data in this case) as its parameter. This function is used to update the state by returning a new state object based on the current state. Instead of 'data' variable any other name can also be used i.e. 'data' is just a parameter name that represents the current state object
      setData((data)=>{
        // returning an object
        return { 
          ...data,   // Copying the existing data properties

          // This syntax is basically called "computed property names" in JS. The [name] is used as a dynamic key in the key value pair in object and is replaced by the value it holds. That is why the names of the <input> are 'title' & 'progress' as it matches with the names of the keys in the 'data' state.
          [name] : value   // Updating the property specified by 'name' with the new 'value'
        }
      })

      // console.log(data);
    }

    const handleAdd = async (e) =>{
        e.preventDefault()
        try {
          const response =await axios.post('https://progress-planner-backend.vercel.app/api/todos',data,config)
          
          toast({
            title: 'Success',
            description: "Todo Created Successfully!",
            status: 'success',
            position:'top-left',
            duration: 2000,
            isClosable: true,
          })

          console.log(response.data);

          if (response.status==200) {
            onClose()
            getTodos()
            setData({
              title: "",
              progress: 0
            });
          }

        } catch (error) {

          toast({
            title: 'Error',
            description: `Error Occured While Creating Todo`,
            status: 'error',
            position:'top-left',
            duration: 2000,
            isClosable: true,
          })
          console.log(error);
        }
    }


    const handleEdit = async (e) =>{
      e.preventDefault()
      // console.log("this is task",task);
      try {
        const response = await axios.put(`https://progress-planner-backend.vercel.app/api/todos/${task.id}`,data,config)

        toast({
          title: 'Success',
          description: `${response.data} Successfully`,
          status: 'success',
          position:'top-left',
          duration: 2000,
          isClosable: true,
        })

        console.log(response.data);

        if (response.status==200){
          onClose()
          getTodos()
        }

      } catch (error) {
        toast({
          title: 'Error',
          description: `Error Occured While Editing Todo`,
          status: 'error',
          position:'top-left',
          duration: 2000,
          isClosable: true,
        })
        console.log(error);
      }
    }


  return (
    <div>
        <Modal size={{base:"xs", md:"md"}} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader style={{textAlign:"center"}}>{mode} your Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form className="flex flex-col justify-center align-middle" onSubmit={mode=='Add'? handleAdd : handleEdit}>

              <input className='bg-white rounded-3xl shadow-2xl mt-5 px-3 py-2 border-[2px] border-black font-semibold' type="text" required maxLength={30} value={data.title} name='title' placeholder=' Your Task Goes Here' onChange={handleChange}/>
            
              <br/><br/>

              <label className='font-semibold text-center' htmlFor="range">Drag to select your current progress</label>
              <br/>
              <input type="range" required min="0" max="100" id="range" name="progress" value={data.progress} onChange={handleChange} />

              <br/>

              {mode=='Add' && <button onClick={onClose} className='bg-white hover:bg-[#A2FF86] text-black rounded-full shadow-2xl border-[2px] border-black font-semibold px-5 py-2 mr-2' type="submit">{mode}</button> }
              {mode=='Edit' && <button onClick={onClose} className='bg-white hover:bg-[#FEFFAC] text-black rounded-full shadow-2xl border-[2px] border-black font-semibold px-5 py-2 mr-2' type="submit">{mode}</button> }
              
              <br />
            </form>
            </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default ModalWindow
