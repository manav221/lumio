import React from 'react'
import { PanelLeftOpen, MessageCircleDashed } from 'lucide-react';

const ChatHeader = ({ sideBar }) => {
    const { isSideBarOpen, setSidebar } = sideBar;

    return (
        <header className="w-full sticky top-3 p-1 px-2 flex items-center justify-between">
            <button
                onClick={() => { setSidebar(true) }}
                className={`${isSideBarOpen ? "opacity-0" : "opacity-100"} rounded-lg p-2 text-zinc-500 hover:bg-zinc-200`}>
                <PanelLeftOpen size={18} />
            </button>

            <button className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-200 ">
                <MessageCircleDashed size={18} />
            </button>
        </header>
    )
}

export default ChatHeader