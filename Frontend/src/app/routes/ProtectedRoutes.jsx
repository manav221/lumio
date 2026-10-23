import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { loading, user } = useSelector(store => store.auth);
    if (loading) {
        return <p>loading...</p>
    }
    if (!user) {
        return <Navigate to={"/login"} />
    }

    return <Outlet />
}

export default ProtectedRoutes