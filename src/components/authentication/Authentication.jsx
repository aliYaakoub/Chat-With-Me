import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const Authentication = ({setIsLoggedIn, notifySuccess, notifyError, notifyInfo, setCurrentUsername}) => {

    const [route, setRoute] = useState('login');

    return (
        <div className='w-full min-h-screen flex items-center justify-center border'>
            {route === 'login' ? 
                <Login 
                    setCurrentUsername={setCurrentUsername}
                    notifySuccess={notifySuccess} 
                    notifyInfo={notifyInfo} 
                    notifyError={notifyError} 
                    setIsLoggedIn={setIsLoggedIn} 
                    setRoute={setRoute} 
                /> 
                : 
                <Register 
                    notifySuccess={notifySuccess} 
                    notifyInfo={notifyInfo} 
                    notifyError={notifyError}
                    setRoute={setRoute} 
                />
            }
        </div>
    )
}

export default Authentication
