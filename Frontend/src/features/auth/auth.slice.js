import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true,
        error: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { setLoading, setUser, setError, clearError,logout } = authSlice.actions;
export default authSlice.reducer;