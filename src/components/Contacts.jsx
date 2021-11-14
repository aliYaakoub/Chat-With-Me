import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactCard from './ContactCard';

const Contacts = ({currentUsername, route, setRoute, setToUser, setIsLoggedIn}) => {

    const [data, setData] = useState([]);
    const [isCancelled, setIsCancelled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(!isCancelled){
            const fetch = async () =>{
                const results = await axios(`${process.env.REACT_APP_API_URL}/users`);
                setData(results.data.data);
                setIsLoading(false);
            }
            fetch();
        }
    })

    useEffect(()=>{
        setIsCancelled(false);
        return () => {
            setIsCancelled(true);
        }
    },[isCancelled])

    async function logout(){
        try{
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/users/logout?username=${currentUsername}`)
            if(result.data.message === 'success'){
                setIsLoggedIn(false);
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div className="contacts text-white overflow-y-auto">
            <div className='w-full flex flex-row items-center justify-between my-5 px-5'>
                <h1 className='text-2xl'>select a user to chat with</h1>
                <p className='cursor-pointer' onClick={()=>logout()}>logout</p>
            </div>
            {isLoading ? 
                <h1 className='w-full text-center text-white'>loading ...</h1>
                :
                data.map(item=>{
                    if(item.username === currentUsername){
                        return null;
                    }
                    else{
                        return(
                            <ContactCard
                                data={item}
                                key={item._id}
                                setRoute={setRoute}
                                setToUser={setToUser}
                            />
                        )
                    }
                    
                })
            }
        </div>
    )
}

export default Contacts;
