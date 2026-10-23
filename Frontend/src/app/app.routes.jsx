import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import AuthLayout from './layouts/auth.layout';
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Chat from '../features/chat/pages/Chat';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "/home",
        element: <ProtectedRoutes />,
        children: [
            {
                path:"",
                element: <Chat />
            }
        ]
    }
])

export default router