import React, { useState, useEffect } from 'react'

const ContactCard = ({data, setRoute, setToUser}) => {

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
        <div onClick={()=>onCardClick()} className="m-2 p-2 flex flex-row rounded border cursor-pointer hover:bg-white h-20 items-center hover:text-black transition-colors">
            <div className="w-16 mr-5 rounded-full bg-purple-400">
                <img src={`https://avatars.dicebear.com/api/croodles-neutral/${data.username}.svg`} alt="" />
            </div>
            <h1 className="text-xl">{data.username}</h1>
        </div>
    )
}

export default ContactCard