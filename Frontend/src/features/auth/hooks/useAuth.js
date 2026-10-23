import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser, setError, clearError } from '../auth.slice';
import { userLogin, userRegister } from '../services/auth.api';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(store => store.auth);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const onLogin = async (userCredentials) => {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());

            const user = await userLogin(userCredentials);
            dispatch(setUser(user.user));
            navigate("/home");
        } catch (err) {
            dispatch(setError(err));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const onRegister = async (userCredentials) => {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());

            await userRegister(userCredentials);
        } catch (err) {
            dispatch(setError(err));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleChange = () => {
        dispatch(clearError());
    }

    return { register, handleSubmit, isSubmitting, onLogin, onRegister, loading, error, handleChange };
}

export default useAuth