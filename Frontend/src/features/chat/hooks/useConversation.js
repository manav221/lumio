import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat, setChats, setLoading, setMessages } from '../chat.slice';
import socket from '../services/chat.socket'
import { conversation } from '../services/chat.api'
import useVoiceInput from './useVoiceInput';

const useConversation = () => {
    const [userMessage, setUserMessage] = useState("");
    const { isRecord, handleVoiceInput } = useVoiceInput(setUserMessage);
    const [streamMessageToken, setStreamMessageToken] = useState(null);
    const [streamTitleToken, setStreamTitleToken] = useState(null);
    const [titleStatus, setTitleStatus] = useState(null);
    const [messageStatus, setMessageStatus] = useState(null);

    const dispatch = useDispatch();
    const { messages, chats, activeChatId } = useSelector(store => store.chat);


    // aviod stale messages and chats
    const chatsRef = useRef(chats);
    const messagesRef = useRef(messages);

    useEffect(() => {
        messagesRef.current = messages;
        chatsRef.current = chats;
    }, [messages, chats]);

    useEffect(() => {

        const handleToken = ({ token, type }) => {
            if (type === "title") {
                setTitleStatus(null);
                setStreamTitleToken(prev => prev + token);
            }
            if (type === "message") {
                setMessageStatus(null);
                setStreamMessageToken(prev => prev + token);
            }
        }

        const handleComplete = ({ data, type }) => {
            if (type === "title") {
                setStreamTitleToken(null);
                dispatch(setChats([{ chatId: null, title: data }, ...chatsRef.current]));
            }
            if (type === "message") {
                setStreamMessageToken(null);
                dispatch(setMessages([...messagesRef.current, { role: "ai", content: data }]));
            }
        }

        const handleStatus = ({ status, type }) => {
            if (type === "title") {
                setTitleStatus(status);
            } else if (type === "message") {
                setMessageStatus(status);
            }
        }

        socket.on("ai token", handleToken);
        socket.on("ai complete", handleComplete);
        socket.on("ai status", handleStatus);

        return () => {
            socket.off("ai token", handleToken);
            socket.off("ai complete", handleComplete);
            socket.off("ai status", handleStatus);
        }
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;
        dispatch(setMessages([...messages, { role: "user", content: userMessage }]));

        await sendMessage(userMessage, activeChatId);
    }

    const sendMessage = async (message, chatId) => {
        setUserMessage("");
        dispatch(setLoading(true));
        try {
            const { data } = await conversation({ message, chatId })

            if (data.chatTitle) {
                const updatedChats = chatsRef.current.map(chat => {
                    if (!chat.chatId) return { ...chat, chatId: data.chatId }
                    return chat;
                });
                dispatch(setChats(updatedChats));
                dispatch(setActiveChat(data.chatId));
            }
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoading(false));
        }

    }

    return {
        userMessage, setUserMessage, handleSubmit, streamMessageToken,
        streamTitleToken, titleStatus, messageStatus, isRecord, handleVoiceInput
    }
}

export default useConversation