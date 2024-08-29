"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@components/shared';


const NotFoundPage = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/');
    }, [router]);

    return <Loader />;
};

export default NotFoundPage;