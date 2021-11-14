import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contacts from './Contacts';
import Inbox from './Inbox';

const Main = ({currentUsername, notifySuccess, notifyError, notifyInfo, setIsLoggedIn}) => {

    const [route, setRoute] = useState('contacts');
    const [toUser, setToUser] = useState('');
    const [lastMessage, setLastMessage] = useState('');

    // useEffect(() => {
    //   return async () => {
    //     await axios.post(`${process.env.REACT_APP_API_URL}/users/logout?username=${currentUsername}`)
    //   }
    // },[currentUsername])

    useEffect(() => window.addEventListener('beforeunload', async (e) => {
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/users/logout?username=${currentUsername}`)
     }), [currentUsername])

    return (
        <div className="w-full h-screen flex items-center relative  justify-center">
            {route === 'contacts' ? 
                <Contacts setIsLoggedIn={setIsLoggedIn} lastMessage={lastMessage} currentUsername={currentUsername} route={route} setRoute={setRoute} setToUser={setToUser} />
                :    
                <Inbox 
                    route={route} 
                    setRoute={setRoute} 
                    toUser={toUser} 
                    currentUsername={currentUsername}
                    notifyError={notifyError}
                    notifySuccess={notifySuccess}
                    notifyInfo={notifyInfo}
                    setLastMessage={setLastMessage}
                />
            }
        </div>
    )
}

export default Main
