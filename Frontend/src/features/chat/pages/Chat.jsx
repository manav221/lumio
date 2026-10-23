import { useState } from "react";

import useChat from "../hooks/useChat";
import SideBar from "../components/SideBar";
import ChatHeader from "../components/ChatHeader";
import MessageArea from "../components/MessageArea";
import MessageInputArea from "../components/MessageInputArea";

export default function Chat() {
  const [isSideBarOpen, setSidebar] = useState(true);
  const { chats, handleActiveChat, handleDeleteChat } = useChat();

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-[#faf9f6] text-zinc-900">

      {/* Sidebar */}
      <SideBar chatsData={[chats, handleDeleteChat]} onClick={handleActiveChat} sideBar={{ isSideBarOpen, setSidebar }} />

      {/* Main chat */}
      <section className="flex min-w-0 flex-1 flex-col">

        {/* header */}
        <ChatHeader sideBar={{ isSideBarOpen, setSidebar }} />

        {/* Messages area */}
        <MessageArea />

        {/* Input area */}
        <MessageInputArea />

      </section>
    </main>
  );
}