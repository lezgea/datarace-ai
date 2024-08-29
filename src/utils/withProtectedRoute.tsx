import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useAuthenticate } from 'hooks/use-auth';
import { RootState } from '@store/store';
import { Loader } from '@components/shared';


const withProtectedRoute = (WrappedComponent: React.ComponentType) => {
    const ProtectedRoute = (props: any) => {
        const router = useRouter();
        const { isAuthenticated } = useSelector((state: RootState) => state.user);
        useAuthenticate(); // This will dispatch and set the auth state

        React.useEffect(() => {
            if (!isAuthenticated) {
                router.push('/sign-in');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return <Loader />
        }

        return <WrappedComponent {...props} />;
    };

    return ProtectedRoute;
};

export default withProtectedRoute;
