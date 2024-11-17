import React from 'react';
import { toast } from 'react-toastify';
import { useCreateDatasetCommentMutation, useDeleteDatasetMutation, useLazyGetDatasetCommentsQuery } from '@api/datasets-api';
import EmojiPicker from 'emoji-picker-react';
import { DatasetComment } from '@components/shared';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import getImgFromBase64 from '@utils/base64toImg';
import { useTranslations } from 'next-intl';


interface IDatasetCommentsProps {
    datasetId: number | string | undefined,
    isEditable?: boolean,
}

export const DatasetComments: React.FC<IDatasetCommentsProps> = ({ datasetId, isEditable }) => {
    const [triggerGetComments, { data: comments, isLoading: commentsLoading }] = useLazyGetDatasetCommentsQuery();
    const [newComment, setNewComment] = React.useState<string>('');
    const [createDatasetComment, { isLoading, error }] = useCreateDatasetCommentMutation();
    const { user, isAuthenticated, loading: isUserLoading } = useSelector((state: RootState) => state.user);

    const t = useTranslations();

    const userImage = React.useMemo(
        () => (user?.profileImage ? getImgFromBase64(user.profileImage) : '/svg/user.svg'),
        [user?.profileImage]
    );


    const onCreateComment = async () => {
        try {
            if (newComment.trim() !== "") {
                await createDatasetComment({
                    id: datasetId,
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
        if (datasetId) {
            triggerGetComments({ id: datasetId });
        }
    }, [datasetId])


    return (
        <section className="space-y-2 border-gray-200">
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
                            <DatasetComment key={comment.id} {...comment} />
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
                            <button
                                onClick={onCreateComment}
                                className="h-[40px] font-regmed bg-primary text-md text-white px-6 py-1 rounded-lg ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none transition duration-200 ease-in-out transform"
                            >
                                {t('comment')}
                            </button>
                            {/* <EmojiPicker
                // value={newComment}
                // onEmojiClick={(val) => setNewComment(val)}
                /> */}
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}