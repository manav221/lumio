import axiosInstance from '../../../app/config/axiosInstance'

export const userLogin = async (userCredentials) => {
    const response = await axiosInstance.post("/auth/login", userCredentials);
    return response.data;
}

export const userRegister = async (userCredentials) => {
    const response = await axiosInstance.post("/auth/register", userCredentials);
    return response.data;
}

export const getMe = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
}

export const logoutUser = async () => {
    const response = await axiosInstance.get("/auth/logout");
    return response.data;
}