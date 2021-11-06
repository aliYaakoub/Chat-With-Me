import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactCard from './ContactCard';

const Contacts = ({currentUsername, setRoute, setToUser, lastMessage}) => {

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

    return (
        <div className="contacts text-white overflow-y-auto">
            <h1 className='w-full text-center text-2xl my-5'>select a user to chat with</h1>
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
                                lastMessage={lastMessage}
                            />
                        )
                    }
                    
                })
            }
        </div>
    )
}

export default Contacts;
