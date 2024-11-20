import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import getImgFromBase64 from '@utils/base64toImg';
import { useTranslations } from 'next-intl';
import { useCreateCompetitionCommentMutation, useLazyGetCompetitionCommentsQuery } from '@api/competition-api';
import { CompetitionComment } from '@components/shared/competition-comment';
import dynamic from 'next/dynamic';
import { EmojiClickData } from 'emoji-picker-react';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface ICompetitionCommentsProps {
    competitionId: number | string | undefined,
    isEditable?: boolean,
}

export const CompetitionComments: React.FC<ICompetitionCommentsProps> = ({ competitionId, isEditable }) => {
    const [triggerGetComments, { data: comments, isLoading: commentsLoading }] = useLazyGetCompetitionCommentsQuery();
    const [newComment, setNewComment] = React.useState<string>('');
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState<boolean>(false);
    const [createCompetitionComment, { isLoading, error }] = useCreateCompetitionCommentMutation();
    const { user, isAuthenticated, loading: isUserLoading } = useSelector((state: RootState) => state.user);
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
                await createCompetitionComment({
                    id: competitionId,
                    data: {
                        text: newComment
                    }
                }).unwrap();
                setNewComment('');
            }
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
    };

    React.useEffect(() => {
        if (competitionId) {
            triggerGetComments({ id: competitionId });
        }
    }, [competitionId])

    useEffect(() => {
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
        <section className="space-y-2 py-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
                Comments
            </h2>
            <div className="flex flex-col py-3">
                <div className="w-full inline-flex flex-col">
                    {/* {
                        !comments?.length &&
                        <div className="flex flex-col items-center justify-center w-full h-[12vh] gap-10">
                            <p className="text-gray-400 ">{t('noComments')}</p>
                        </div>
                    } */}
                    {
                        comments?.map((comment) =>
                            <CompetitionComment key={comment.id} {...comment} />
                        )
                    }
                </div>

                {
                    isAuthenticated &&
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
                        <div className="flex w-full space-y-3 flex-col items-end">
                            <textarea
                                value={newComment}
                                placeholder={"What's on your mind ?"}
                                className={`w-full h-[100px] bg-gray-50 px-5 py-4 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        onCreateComment();
                                    }
                                }}
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
                }
            </div>
        </section>
    )
}