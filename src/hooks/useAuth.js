import { useSelector } from 'react-redux'


const useAuth = () => {
    const auth = useSelector(state => state.auth);

    if (!auth.accessToken || (!auth.user?.id)) {
        return false;
    }
    return true;
}
export default useAuth;