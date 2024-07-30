// import { apiSignIn, apiSignOut, apiSignUp } from '../../views/auth/auth.service';
// import {  setAuth, clearAuth, useAppSelector, useAppDispatch } from '../../store';
// import { setUser } from '@/views/user/user.slice';
// import { useNavigate } from 'react-router-dom';
// import { SignInCredential, SignUpCredential } from '../../views/auth/auth.type';
// import useQuery from '../../utils/hooks/useQuery';

// type Status = 'success' | 'failed';

// function authHook() {
//     const dispatch = useAppDispatch();
//     const query = useQuery();
//     const navigate = useNavigate();

//     const signedIn = useAppSelector((state) => state.auth.signedIn);
//     const token = useAppSelector((state) => state.auth.token);

//     const signIn = async (
//         values: SignInCredential
//     ): Promise<
//         | {
//               status: Status;
//               message: string;
//           }
//         | undefined
//     > => {
//         try {
//             const resp = await apiSignIn(values);
//             if (resp.data) {
//                 const { token } = resp.data;
//                 dispatch(setAuth(token));
//                 if (resp.data.user) {
//                     dispatch(
//                         setUser(
//                             resp.data.user || {
//                                 avatar: '',
//                                 userName: 'Anonymous',
//                                 authority: ['USER'],
//                                 email: '',
//                             }
//                         )
//                     );
//                 }
//                 const redirectUrl = query.get('redirectUrl');
//                 navigate(
//                     redirectUrl ? redirectUrl : '/authenticated-entry'
//                 );
//                 return {
//                     status: 'success',
//                     message: '',
//                 };
//             }
//         } catch (errors: any) {
//             return {
//                 status: 'failed',
//                 message: errors?.response?.data?.message || errors.toString(),
//             };
//         }
//     };

//     const signUp = async (values: SignUpCredential) => {
//         try {
//             const resp = await apiSignUp(values);
//             if (resp.data) {
//                 const { token } = resp.data;
//                 dispatch(setAuth(token));
//                 if (resp.data.user) {
//                     dispatch(
//                         setUser(
//                             resp.data.user || {
//                                 avatar: '',
//                                 userName: 'Anonymous',
//                                 authority: ['USER'],
//                                 email: '',
//                             }
//                         )
//                     );
//                 }
//                 const redirectUrl = query.get('redirectUrl');
//                 navigate(
//                     redirectUrl ? redirectUrl : '/authenticated-entry'
//                 );
//                 return {
//                     status: 'success',
//                     message: '',
//                 };
//             }
//         } catch (errors: any) {
//             return {
//                 status: 'failed',
//                 message: errors?.response?.data?.message || errors.toString(),
//             };
//         }
//     };

//     const handleSignOut = () => {
//         dispatch(clearAuth());
//         dispatch(
//             setUser({
//                 avatar: '',
//                 userName: '',
//                 email: '',
//                 authority: [],
//             })
//         );
//         navigate('/unauthenticated-entry');
//     };

//     const signOut = async () => {
//         await apiSignOut();
//         handleSignOut();
//     };

//     return {
//         authenticated: !!token && signedIn,
//         signIn,
//         signUp,
//         signOut,
//     };
// }

// export default authHook;


import { apiSignOut } from '../../views/auth/auth.service';
import { setAuth, clearAuth, useAppSelector, useAppDispatch } from '../../store';
import { setUser } from '@/views/user/user.slice';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../utils/hooks/useQuery';

function authHook() {
    const dispatch = useAppDispatch();
    const query = useQuery();
    const navigate = useNavigate();

    const signedIn = useAppSelector((state) => state.auth.signedIn);
    const token = useAppSelector((state) => state.auth.token);
    const handleSignOut = () => {
        dispatch(clearAuth());
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: [],
            })
        );
        navigate('/unauthenticated-entry');
    };

    const signOut = async () => {
        await apiSignOut();
        handleSignOut();
    };

    const navigateToAuthenticatedEntry = () => {
        const redirectUrl = query.get('redirectUrl');
        navigate(redirectUrl ? redirectUrl : '/authenticated-entry');
    };

    return {
        authenticated: !!token && signedIn,
        navigateToAuthenticatedEntry,
        signOut,
    };
}

export default authHook;
