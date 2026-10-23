import { useDispatch, useSelector } from 'react-redux';
import { Astroid, PanelLeftClose, SquarePen, Trash } from 'lucide-react';
import { setActiveChat, setMessages } from '../chat.slice';
import useConversation from '../hooks/useConversation';

const SideBar = ({ chatsData, onClick, sideBar }) => {
    const { isSideBarOpen, setSidebar } = sideBar;
    const { user } = useSelector(store => store.auth);
    const { activeChatId } = useSelector(store => store.chat);
    const { streamTitleToken, titleStatus } = useConversation();
    const dispatch = useDispatch();

    const newChat = () => {
        dispatch(setActiveChat());
        dispatch(setMessages([]));
    }

    const [chats, handleDeleteChat] = chatsData;

    return (
        <aside
            hidden={!isSideBarOpen}
            className={`
          ${isSideBarOpen && "w-[70%] fixed inset-y-0 z-50 top-0 left-0 h-full"}
          sm:relative sm:max-w-67.5 shrink-0 flex flex-col border-r border-zinc-200 bg-[#f4f3ef]
          transition-all duration-300`}
        >
            <div className="flex items-center justify-between p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
                    <Astroid size={18} />
                </div>

                <button
                    onClick={() => setSidebar(false)}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-200"
                    aria-label="Close sidebar"
                >
                    <PanelLeftClose size={18} />
                </button>
            </div>

            <div className="px-3 pt-3">
                <button
                    onClick={newChat}
                    className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm font-medium shadow-sm transition hover:bg-zinc-50"
                >
                    <span className="text-xl leading-none">
                        <SquarePen size={15} />
                    </span>
                    New chat
                </button>
            </div>

            <div className="mt-8 px-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Recent chats
                </p>
                <div className="space-y-1">
                    {
                        (titleStatus || streamTitleToken) &&
                        <div className={`hover:bg-zinc-200/70 select-text py-1
                         px-2 rounded-lg line-clamp-1 text-sm ${titleStatus && "bg-zinc-200 shimmer py-3"}`}>
                            {streamTitleToken}
                        </div>
                    }
                    {
                        chats.map((chat, indx) => {
                            return <div
                                onClick={() => { onClick(chat.chatId) }}
                                key={indx}
                                role="button"
                                className={`hover:bg-zinc-200/70 select-text py-1 
                                px-2 rounded-lg line-clamp-1 text-sm flex items-center justify-between
                                group
                                ${chat.chatId === activeChatId && "bg-zinc-200"}`}
                            >
                                {chat.title}
                                <div
                                    onClick={() => { handleDeleteChat(chat.chatId) }}
                                    className='hidden group-hover:inline'>
                                    <Trash size={15} />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="mt-auto border-t border-zinc-200 p-3">
                <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-zinc-200/70">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-orange-300 to-rose-400 text-sm font-semibold text-white">
                        {user.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-zinc-500">Free plan</p>
                    </div>
                </button>
            </div>

        </aside>
    )
}

export default SideBar