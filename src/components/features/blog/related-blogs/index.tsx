"use client";

import { useGetRelatedBlogsQuery } from '@api/blogs-api';
import { AuthModal } from '@components/shared';
import BlogItem from '@components/shared/blog-item';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import { useParams } from 'next/navigation';
import React from 'react';


interface IRelatedBlogProps {
    lng?: string,
    t?: (val: string) => string,
}

export const RelatedBlog: React.FC<IRelatedBlogProps> = () => {

    const params = useParams();
    let { blogId } = params;

    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);

    const { data: blogsData, error, isLoading } = useGetRelatedBlogsQuery({
        data: { page: 0, count: 3 },
        id: blogId as string
    });


    if (isLoading) {
        return <CompetitionsSkeleton />;
    }


    if (!blogsData?.userDatasets?.length) return null;

    return (
        <>
            <h2 className="text-[1.7rem] leading-[2.5rem] md:text-[2.5rem] font-semibold mb-4">
                Related Blogs
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {blogsData?.userDatasets?.map((item) => (
                    <BlogItem key={item.id} {...item} />
                ))}
            </div>
            <AuthModal
                visible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};
