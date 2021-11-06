import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = ({setRoute, notifyInfo, notifySuccess, notifyError}) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCancelled, setIsCancelled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(e){
        e.preventDefault();
        if(!isCancelled){
            if(name.length < 5 ){ notifyError('name must be at least 5 characters') } 
            else if(name.length > 50 ){ notifyError('name too large') } 
            else if(username.length < 5 ){ notifyError('username must be at least 5 characters') } 
            else if(username.length > 50 ){ notifyError('username too large') } 
            else if(password.length < 5 ){ notifyError('password must be at least 5 characters') } 
            else if(password.length > 50 ){ notifyError('password too large') } 
            else {
                let data = {
                    name: name,
                    username: username,
                    password: password,
                }
                try{
                    setIsLoading(true);
                    const results = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, data);
                    console.log(results);
                    if(results.data.message === 'success'){
                        notifyInfo('registered')
                        setIsLoading(false);
                        setRoute('login');
                    }
                    else{
                        notifyError(results.data.message);
                        setPassword('')
                        setIsLoading(false);
                    }
                }
                catch(err){
                    console.error(err);
                    notifyError('error while registering');
                    setIsLoading(false);
                }
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
        <div className="register-div rounded-lg text-white relative">
            <form onSubmit={(e)=>onSubmit(e)} className="form">
                <h1 className="text-2xl">{isLoading ? 'Loading ...' : 'Please Register'}</h1>
                <div className="flex flex-col w-10/12 mx-auto">
                    <label htmlFor="name" className='text-xl mb-1' >name : </label>
                    <input 
                        required
                        type="text" 
                        id='name' 
                        name="name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value.trim())}
                        className="input text-xl p-2"
                        placeholder='Enter your name here ... '
                    />
                </div>
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
                        placeholder='Create a unique username .'
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
                        placeholder='Create a password .'
                    />
                </div>
                <button className="w-10/12 border rounded-lg h-12 text-xl hover:bg-white hover:text-purple-400 transition-colors">Login</button>
            </form>
        </div>
    )
}

export default Register
