import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListHeader from './ListHeader';
import ListItem from './ListItem';

const Homepage = () => {

    const [tasks, setTasks] = useState(null);

    const getTodos = async ()=>{

        const userInfo = JSON.parse(localStorage.getItem("user"))

        const config = {
          headers: {
          Authorization: `Bearer ${userInfo.token}`,
          },
        };

        let userEmail = userInfo.user_email

        try {
        const {data} = await axios.get(`https://progress-planner-backend.vercel.app/api/todos/${userEmail}`,config)
        setTasks(data)
        
        /* Sort the tasks on date -> "new Date(a.date)-new Date(b.date)" subtracts the Date objects, resulting in a numeric value representing the time difference between the two dates. This comparison value is used by sort to determine the order of the tasks */
        } catch (error) {
        console.log(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))
    // console.log("sorted tasks",sortedTasks).;

    return (
        <div>
            <ListHeader listName={'🔥 ProgressPlanner'} getTodos={getTodos} />
            
            {sortedTasks?.map( (task)=>(
                <ListItem key={task.id} task={task} getTodos={getTodos} />
            ))
            }
        </div>
    )
}

export default Homepage
