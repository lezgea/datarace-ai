import React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthState } from '@slices/user-slice';
import { useGetUserQuery } from '@api/user-api';


export const useAuthenticate = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);
    const token = Cookies.get('dtr-token');

    const { data: userData, error, isLoading, refetch } = useGetUserQuery(undefined, {
        skip: !token,
    });

    React.useEffect(() => {
        if (token) {
            if (!isLoading && !error) {
                dispatch(
                    setAuthState({ isAuthenticated: true, user: userData || null })
                );
                setLoading(false);
            } else if (error) {
                dispatch(setAuthState({ isAuthenticated: false, user: null }));
                setLoading(false);
            }
        } else {
            dispatch(setAuthState({ isAuthenticated: false, user: null }));
            setLoading(false);
        }
    }, [dispatch, token, userData, error, isLoading]);

    React.useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token, refetch]);

    return loading;
};
