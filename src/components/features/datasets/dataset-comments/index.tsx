"use client";

import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateDatasetCommentMutation, useLazyGetDatasetCommentsQuery } from '@api/datasets-api';
import { EmojiClickData } from 'emoji-picker-react';
import { DatasetComment } from '@components/shared';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import getImgFromBase64 from '@utils/base64toImg';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';


const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface IDatasetCommentsProps {
    datasetId: number | string | undefined,
    isEditable?: boolean,
}

export const DatasetComments: React.FC<IDatasetCommentsProps> = ({ datasetId, isEditable }) => {
    const [triggerGetComments, { data: comments }] = useLazyGetDatasetCommentsQuery();
    const [newComment, setNewComment] = useState<string>('');
    const [allCommentsVisible, showAllComments] = React.useState<boolean>(false)
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState<boolean>(false);
    const [createDatasetComment] = useCreateDatasetCommentMutation();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
    const pickerRef = useRef<HTMLDivElement>(null);

    const t = useTranslations();

    const userImage = React.useMemo(
        () => (user?.profileImage ? getImgFromBase64(user.profileImage) : '/svg/user.svg'),
        [user?.profileImage]
    );

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setNewComment((prevComment) => `${prevComment}${emojiData.emoji}`);
    };

    const onCreateComment = async () => {
        try {
            if (newComment.trim() !== "") {
                await createDatasetComment({
                    id: datasetId,
                    data: { text: newComment }
                }).unwrap();
                setNewComment('');
            }
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
    };


    React.useEffect(() => {
        if (datasetId) {
            triggerGetComments({ id: datasetId });
        }
    }, [datasetId]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsEmojiPickerVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <section className="relative space-y-2 border-gray-200">
            {
                (!!comments?.length || isAuthenticated) &&
                <h2 className="text-2xl font-semibold text-black dark:text-white">
                    {t('comments')}
                </h2>
            }
            <div className="flex flex-col py-3">
                <div className="w-full inline-flex flex-col">
                    {
                        allCommentsVisible
                            ?
                            comments?.map((comment) => (
                                <DatasetComment key={comment.id} {...comment} />
                            ))
                            :
                            comments?.slice(0, 3).map((comment) => (
                                <DatasetComment key={comment.id} {...comment} />
                            ))
                    }
                    <button
                        onClick={() => showAllComments(!allCommentsVisible)}
                        className='text-start text-gray-500 hover:text-primary hover:underline font-medium hover:text-primary min-w-[300px] py-2 ml-10 rounded-3xl mb-3'
                    >
                        {allCommentsVisible ? 'Hide Comments' : 'View More Comments'}
                    </button>
                </div>

                {isAuthenticated && (
                    <div className="flex w-full gap-2">
                        <div className="relative w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full overflow-hidden">
                            <Image
                                src={userImage || "/png/user.png"}
                                alt="Avatar"
                                fill={true}
                                className="object-cover"
                                priority={true}
                            />
                        </div>
                        <div className="flex w-full space-y-3 flex-col items-end relative">
                            <textarea
                                value={newComment}
                                placeholder={t('whatsOnYourMind')}
                                className={`w-full h-[100px] bg-gray-50 px-5 py-4 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="flex gap-3">
                                <div className="h-[40px] w-[40px] flex items-center justify-center bg-gray-200 hover:bg-gray-300 focus:outline-none transition rounded-full">
                                    <button
                                        onClick={() => setIsEmojiPickerVisible((prev) => !prev)}
                                        className="text-2xl"
                                        aria-label="Open Emoji Picker"
                                    >
                                        😊
                                    </button>
                                </div>
                                <button
                                    onClick={onCreateComment}
                                    className="h-[40px] font-regmed bg-primary text-md text-white px-6 py-1 rounded-lg ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark hover:shadow-lg hover:shadow-neutral-300 focus:outline-none focus:ring-2 focus:ring-primaryDark transition duration-200 ease-in-out transform"
                                >
                                    {t('comment')}
                                </button>
                            </div>

                            {isEmojiPickerVisible && (
                                <div
                                    ref={pickerRef}
                                    className="absolute bottom-[-10px] right-0 translate-y-full z-50"
                                >
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
