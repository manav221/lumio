import React from 'react'

const UserMessage = ({ message }) => {
    return (
        <div className="flex justify-end">
            <div className="max-w-[50%] max-h-100 overflow-scroll hide-scroll whitespace-pre-wrap rounded-2xl rounded-br-sm bg-zinc-900 px-4 py-1.5 text-sm leading-6 text-white">
                {message.content}
            </div>
        </div>
    )
}

export default UserMessage