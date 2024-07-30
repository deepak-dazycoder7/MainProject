import { useAppSelector, useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../utils/hooks/useQuery';

const authHook = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const signedIn = useAppSelector((state) => state.auth.signedIn);
    const token = useAppSelector((state) => state.auth.token);

    const navigateToAuthenticatedEntry = () => {
        const redirectUrl = query.get('redirectUrl');
        navigate(redirectUrl ? redirectUrl : '/authenticated-entry');
    };

    return {
        authenticated: !!token && signedIn,
        navigateToAuthenticatedEntry,
    };
}

export default authHook;


// The authHook now only manages authentication state and navigation.