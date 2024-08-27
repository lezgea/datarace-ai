import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthState } from '@slices/user-slice';
import { useGetUserQuery } from '@api/user-api';


export const useAuthenticate = () => {
    const dispatch = useDispatch();

    const token = Cookies.get('dtr-token');

    const { data: userData, error, isLoading } = useGetUserQuery(undefined, {
        skip: !token, // skips the query if the user is not logged in 
    });

    useEffect(() => {
        if (token) {
            // Optionally, fetch user data here or dispatch an action to fetch it
            dispatch(
                setAuthState({ isAuthenticated: true, user: userData || null })
            );
        } else {
            dispatch(setAuthState({ isAuthenticated: false, user: null }));
        }
    }, [dispatch, token]);
};

