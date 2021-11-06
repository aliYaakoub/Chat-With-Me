import React, { useState, useEffect } from 'react'

const ContactCard = ({data, setRoute, setToUser, lastMessage}) => {

    const [isCancelled, setIsCancelled] = useState(true);

    function onCardClick () {
        if(!isCancelled) {
            setToUser(data.username)
            setRoute('inbox');
        }
    }

    useEffect(() => {
        setIsCancelled(false);
        return () => {
            setIsCancelled(true);
        }
    },[isCancelled])

    return (
        <div onClick={()=>onCardClick()} className="m-2 p-2 rounded border cursor-pointer hover:bg-white h-16 hover:text-black transition-colors">
            <h1>{data.username}</h1>
            <p>{lastMessage}</p>
        </div>
    )
}

export default ContactCard