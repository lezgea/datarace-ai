import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('dtr-token');

        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }

        setIsLoading(false);
    }, []);

    return { isLogged, isLoading };
};
