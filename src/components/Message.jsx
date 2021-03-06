import React from 'react'

const Message = ({data, currentUsername}) => {
    return (
        <div className={data.from === currentUsername ? 'w-full flex my-1 flex-row justify-end text-white px-2' : 'w-full flex my-1 flex-row justify-start text-black px-2'}>
            <p className={data.from === currentUsername ?'msg text-justify text-xl w-auto bg-purple-400 px-2 py-1 rounded ml-20':'msg text-justify text-xl w-auto bg-gray-300 mr-20 px-2 py-1 rounded'}>{data.content}</p>
        </div>
    )
}

export default Message
