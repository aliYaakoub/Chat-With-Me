import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({setIsLoggedIn, setRoute, notifySuccess, notifyError, setCurrentUsername}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCancelled, setIsCancelled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(e){
        e.preventDefault();
        if(!isCancelled){
            try{
                setIsLoading(true);
                const results = await axios.get(`${process.env.REACT_APP_API_URL}/users/login?username=${username}&password=${password}`);
                // console.log(results);
                if(results.data.message === 'success'){
                    notifySuccess('logged in')
                    setCurrentUsername(results.data.account.username)
                    setIsLoading(false);
                    setIsLoggedIn(true);
                }
                else{
                    notifyError(results.data.message);
                    setPassword('');
                    setIsLoading(false);
                }
            }
            catch(err){
                console.error(err);
                setIsLoading(false);
                notifyError('server error')
            }
        }
    }

    useEffect(()=>{
        setIsCancelled(false)
        return () => {
            setIsCancelled(true)
        }
    },[isCancelled])

    return (
        <div className="login-div rounded-lg text-white relative">
            <form onSubmit={(e)=>onSubmit(e)} className="form">
                <h1 className="text-2xl">{isLoading ? 'loading ...':'Please Login'}</h1>
                <div className="flex flex-col w-10/12 mx-auto">
                    <label htmlFor="username" className='text-xl mb-1' >Username : </label>
                    <input 
                        required 
                        type="text" 
                        id='username' 
                        name="username" 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value.trim())}
                        className="input text-xl p-2"
                        placeholder='Enter your username here ... '
                    />
                </div>
                <div className="flex flex-col w-10/12 mx-auto">
                    <label htmlFor="password" className='text-xl mb-1' >Password : </label>
                    <input 
                        required 
                        type="password" 
                        id='password' 
                        name="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value.trim())}
                        className="input text-xl p-2"
                        placeholder='Enter your password here ... '
                    />
                </div>
                <button className="w-10/12 border rounded-lg h-12 text-xl hover:bg-white hover:text-purple-400 transition-colors">Login</button>
            </form>
            <p className="absolute bottom-2 w-full text-center text-2xl cursor-pointer" onClick={()=>setRoute('register')}>Or Register</p>
        </div>
    )
}

export default Login
