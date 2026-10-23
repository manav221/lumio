import axios from "axios";
import toast from 'react-hot-toast';

const CONFIG = {
    baseURL: "http://localhost:3000/api",
    silentEndpoints: ["/auth/refresh", "/auth/me"]
}

const axiosInstance = axios.create({
    baseURL: CONFIG.baseURL,
    timeout: CONFIG.timeout,
    withCredentials: true,
})

// Fallback code and messages
const CODE_BY_STATUS = {
    0: "NETWORK_ERROR",
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    422: "VALIDATION_ERROR",
    429: "TOO_MANY_REQUESTS",
}

const MESSAGE_BY_STATUS = {
    0: "Network error. Check your connection.",
    400: "Invalid request.",
    401: "Your session has expired. Please log in again.",
    403: "You don't have permission for that.",
    404: "The requested resource was not found.",
    422: "Please correct the highlighted fields.",
    429: "Too many requests. Please try again later."
}

const resolveCode = (status) => CODE_BY_STATUS[status] ||
    (status >= 500 ? "SERVER_ERROR" : "UNKNOWN_ERROR");

const resolveMessage = (status) => MESSAGE_BY_STATUS[status] ||
    (status >= 500 ? "Something went wrong. Please try again" : "Request failed");

// request interceptor will be add

let onUnauthorized = null
export const setUnauthorizedHandler = (fn) => {
    onUnauthorized = fn;
}

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err.response?.status ?? 0;
        const data = err.response?.data;
        const url = err.config?.url ?? "";

        if (status === 401) {
            onUnauthorized?.();
        }

        const isSilent = CONFIG.silentEndpoints.some((u) => url.includes(u));
        const isTransient = status === 0 || status === 429 || status >= 500;

        let message = data?.message || resolveMessage(status);

        if (isTransient && status !== 401 && !isSilent) {

            if (status === 429) {
                let retryAfter = err.response?.headers?.["retry-after"];
                retryAfter = Number(retryAfter);
                if (Number.isFinite(retryAfter) && retryAfter > 0) {
                    message = `Too many request. Try after ${retryAfter}s`;
                } else {
                    message = "Too many request. Try again later";
                }
            }

            toast.error(message, { id: `http-${status}` });
        }

        return Promise.reject({
            success: false,
            code: data?.code || resolveCode(status),
            message,
            details: data?.details || null
        })
    }
)

export default axiosInstance;