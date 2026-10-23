import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './app/app.routes'
import { getMe, logoutUser } from './features/auth/services/auth.api'
import { useDispatch } from 'react-redux'
import { setLoading, setUser, logout, setError } from './features/auth/auth.slice'
import { setUnauthorizedHandler } from './app/config/axiosInstance'

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    setUnauthorizedHandler(
      async () => {
        dispatch(logout());
        await logoutUser();
        router.navigate("/login");
      }
    );

    async function handleGetMe() {
      try {
        const response = await getMe();
        dispatch(setUser(response.user));
        router.navigate("/home");
      } catch (err) {
        dispatch(setError(err));
      } finally {
        dispatch(setLoading(false));
      }
    }

    handleGetMe();

  }, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App