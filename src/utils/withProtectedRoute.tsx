import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthenticate } from 'hooks/use-auth';
import { Loader } from '@components/shared';
import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';


const withProtectedRoute = (WrappedComponent: React.ComponentType) => {
    const ProtectedRoute = (props: any) => {
        const router = useRouter();
        const lng = useLocale();
        let isAuthenticated = Cookies.get('dtr-token')

        useAuthenticate(); // This will dispatch and set the auth state

        React.useEffect(() => {
            if (!isAuthenticated) {
                router.push(`/${lng}/sign-in`);
            }
        }, [isAuthenticated, router]);

        // if (!isAuthenticated) {
        //     return <Loader />
        // }

        return <WrappedComponent {...props} />;
    };

    return ProtectedRoute;
};

export default withProtectedRoute;
