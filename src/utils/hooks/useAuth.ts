import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";
import { useAppSelector } from "@/store";


const useAuth = () => {
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

// The authHook now only manages authentication state and navigation.

export default useAuth;
