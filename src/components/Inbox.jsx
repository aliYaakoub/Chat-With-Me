import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';

function useKey(key,cb){
    const callbackRef = useRef(cb);

    useEffect(()=>{
        callbackRef.current = cb;
    });

    useEffect(()=>{
        function handle(e){
            if(e.code === key){
                callbackRef.current(e);
            }
        }
        document.addEventListener('keypress',handle)
        return () => {
            document.removeEventListener('keypress',handle)
        }
    },[key])
}

const Inbox = ({currentUsername, toUser, setRoute, notifyError}) => {

    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [isCancelled, setIsCancelled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [sending, setSending] = useState(false);

    useEffect(() =>{
        if(!isCancelled){
            const fetchMessages = async () => {
                const results = await axios.get(`${process.env.REACT_APP_API_URL}/messages?toUser=${toUser}&fromUser=${currentUsername}`);
                setAllMessages(results.data.data.sort((a,b)=>{
                        return new Date(a.createdAt) - new Date(b.createdAt);
                }));
                setIsLoading(false)
            }
            fetchMessages();
        }
    })

    useEffect(() =>{
        setIsCancelled(false);
        return () => {
            setIsCancelled(true);
        }
    },[isCancelled])

    useKey('Enter', sendMessage)

    async function sendMessage() {
        if(!isCancelled && !sending){
            setSending(true);
            if(message.length > 1000){
                notifyError('message too large')
                setSending(false);
            }
            else{
                try{
                    let data ={
                        to: toUser,
                        from: currentUsername,
                        content: message,
                    }
                    const results = await axios.post(`${process.env.REACT_APP_API_URL}/messages`, data);
                    if(results.data.message === 'success'){
                        setMessage('');
                    setSending(false);
                }
                }
                catch(err) {
                    console.error(err);
                    notifyError('server error');
                    setSending(false);
                }
            }
        }
    }

    return (
        <div className="inbox flex flex-col">
            <div className=" bg-gray-300 w-full h-16 flex flex-row justify-between items-center px-5 text-2xl rounded-b-2xl">
                <div className='flex flex-row items-center '>
                    <div className="w-16 mr-5 rounded-full bg-purple-400">
                        <img src={`https://avatars.dicebear.com/api/croodles-neutral/${toUser}.svg`} alt="" />
                    </div>
                    <h1>{toUser}</h1>
                </div>
                <p className="sm:absolute  left-5 top-3 cursor-pointer z-50" onClick={()=>setRoute('contacts')} >&#10094; Back</p>
            </div>
            <div className="messages w-full h-full overflow-y-auto py-5">
                {isLoading ? 
                    <h1 className="text-white text-center text-2xl my-10">loading ...</h1> 
                    : 
                    allMessages.map(message=>(
                        <Message key={message._id} data={message} currentUsername={currentUsername} />
                    ))
                }
            </div>  
            <div className='justify-self-end h-20 p-2 sm:mb-2 mb-5'>
                <div className="w-full h-full flex bg-gray-300 rounded-2xl ">
                    <input 
                        type="text" 
                        className="w-full rounded-l-2xl px-5 outline-none"
                        value={message}
                        placeholder='Message ...'
                        onChange={(e)=>setMessage(e.target.value)}
                    />
                    <button className='py-2 px-5 border rounded-r-2xl' onClick={()=>sendMessage()} >Send</button>
                </div>
            </div>
        </div>
    )
}

export default Inbox
