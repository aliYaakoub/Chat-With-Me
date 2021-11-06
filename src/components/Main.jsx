import React, { useState } from 'react';
import Contacts from './Contacts';
import Inbox from './Inbox';

const Main = ({currentUsername, notifySuccess, notifyError, notifyInfo}) => {

    const [route, setRoute] = useState('contacts');
    const [toUser, setToUser] = useState('');
    const [lastMessage, setLastMessage] = useState('')

    return (
        <div className="w-full h-screen flex items-center relative  justify-center">
            {route === 'contacts' ? 
                <Contacts lastMessage={lastMessage} currentUsername={currentUsername} route={route} setRoute={setRoute} setToUser={setToUser} />
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
