import socket, { initializeSocketConnection } from '../services/chat.socket'
import { clearError, setChats, setError, setLoading, setMessages, setActiveChat } from '../chat.slice'
import { deleteChat, getChats } from '../services/chat.api'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const useChat = () => {
    const dispatch = useDispatch();
    const { chats, activeChatId } = useSelector(store => store.chat);

    useEffect(() => {
        initializeSocketConnection();
        fetchChats();
    }, []);

    useEffect(() => {
        fetchChatMessages();
    }, [activeChatId]);

    const fetchChats = async () => {

        try {
            dispatch(setLoading(true));
            dispatch(clearError());

            const chatsData = await getChats();

            dispatch(setChats(chatsData.data.map(
                (chat) => ({ chatId: chat._id, title: chat.title })
            )
            ));
        } catch (err) {
            dispatch(setError(err));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const fetchChatMessages = () => {
        if (!activeChatId) return;

        socket.emit("chat_messages", activeChatId);
        socket.on("chat_messages", (data) => {
            dispatch(setMessages(data));
        })
    }

    const handleActiveChat = (chatId) => {
        dispatch(setActiveChat(chatId));
    }

    const handleDeleteChat = async (chatId) => {
        try {
            await deleteChat(chatId);
            dispatch(setChats(chats.filter(chat => chat.chatId !== chatId)));
            toast("Chat Deleted Successfully", { id: 1, duration: 1500,position:"top-center" });
        } catch (error) {

        }
    }

    return { chats, initializeSocketConnection, handleActiveChat, handleDeleteChat };
}

export default useChat