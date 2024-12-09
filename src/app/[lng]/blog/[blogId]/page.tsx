"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useDeleteBlogMutation, useGetBlogInfoQuery } from '@api/blogs-api';
import { RelatedBlog } from '@components/features/blog';
import { ConfirmationModal, ShareModal } from '@components/shared';


const RaceDetails: React.FC = () => {
    const t = useTranslations();
    const lng = useLocale();
    const params = useParams();
    const router = useRouter();
    const { blogId } = params;
    const bId = Array.isArray(blogId) ? blogId[0] : blogId;

    const [shareModal, setShareModal] = React.useState<boolean>(false);
    const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
    const { data: blogInfo, error, isLoading, refetch } = useGetBlogInfoQuery({ id: bId as string }, { skip: !bId });
    const [deleteBlog] = useDeleteBlogMutation();


    const onDeleteBlog = async () => {
        try {
            await deleteBlog({ id: bId }).unwrap();
            setDeleteModal(false);
            router.back();
        } catch (err: any) {
            console.log('Error: ', err)
        }
    }


    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-[6rem] space-y-5">
                <div className="flex justify-between">
                    {/* Breadcrumb */}
                    <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                        <Link href="/" className="hover:text-primaryLight">{t('mainPage')}</Link>
                        <span className="text-lg">&gt;</span>
                        <Link href={`/${lng}/blog`} className="hover:text-primaryLight">{t('blog')}</Link>
                        <span className="text-lg">&gt;</span>
                        <span>{blogInfo?.title}</span>
                    </nav>

                    <div className='flex gap-3'>
                        {
                            blogInfo?.isEditable &&
                            <>
                                <button
                                    aria-label="Delete Dataset"
                                    className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-red rounded-lg sm:w-auto hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                                    onClick={() => setDeleteModal(true)}
                                >
                                    Delete
                                </button>
                                <Link href={`/${lng}/blog/update/${bId}`}>
                                    <button
                                        aria-label="Update Blog"
                                        className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-gray-700 rounded-lg sm:w-auto hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                                    >
                                        Edit Blog
                                    </button>
                                </Link>
                            </>
                        }
                        <button
                            aria-label="Share Blog"
                            className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            onClick={() => setShareModal(true)}
                        >
                            Share
                        </button>
                    </div>
                </div>

                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

                {/* Main Content */}
                <main id="#main-content" className="space-y-5">
                    <section className="relative border rounded-2xl">
                        <img src={blogInfo?.imageUrl || "/svg/dr_banner.svg"} alt="Blog Image" className="w-full h-[30rem] rounded-2xl object-cover" />
                        <h1 className="absolute w-full bottom-0 left-0 text-2xl text-white font-regmed px-7 py-2 backdrop-blur-xl bg-dark/30">
                            {blogInfo?.title}
                        </h1>
                    </section>

                    <section className="p-8 gap-8 rounded-2xl border border-gray-30">
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: blogInfo?.content || '' }} />
                    </section>

                    <section className="relative">
                        <RelatedBlog />
                    </section>
                </main>
            </div>
            <ShareModal
                title={blogInfo?.title || ''}
                shareUrl={`https://datarace.ai/${lng}/blog/${bId}`}
                visible={shareModal}
                onClose={() => setShareModal(false)}
            />
            <ConfirmationModal
                visible={deleteModal}
                onConfirm={onDeleteBlog}
                onClose={() => setDeleteModal(false)}
            />
        </div>
    );
};

export default RaceDetails;
