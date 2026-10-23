import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
        messages: [],
        activeChatId: null,
        loading: false,
        isNewChat: false,
        error: null
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setActiveChat: (state, action) => {
            state.activeChatId = action.payload;
        }
    }
})

export const {
    setChats, setLoading, setError,
    clearError, setActiveChat, setMessages
} = chatSlice.actions;

export default chatSlice.reducer;