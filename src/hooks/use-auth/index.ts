import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthState } from '@slices/user-slice';
import { useGetUserQuery } from '@api/user-api';


export const useAuthenticate = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('dtr-token');

    // Fetch user data only if the token exists
    const { data: userData, error, isLoading } = useGetUserQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if (token) {
            if (!isLoading && !error) {
                // Set auth state with user data
                dispatch(
                    setAuthState({ isAuthenticated: true, user: userData || null })
                );
            } else if (error) {
                // Optionally, handle the error, such as clearing the token or logging the user out
                dispatch(setAuthState({ isAuthenticated: false, user: null }));
            }
        } else {
            // No token, set auth state to unauthenticated
            dispatch(setAuthState({ isAuthenticated: false, user: null }));
        }
    }, [dispatch, token, userData, error, isLoading]);
};
