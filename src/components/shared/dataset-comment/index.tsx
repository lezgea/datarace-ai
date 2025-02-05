import { useDeleteDatasetCommentMutation } from '@api/datasets-api';
import { IDatasetComment } from '@api/types/dataset-types';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../confirmation-modal';
import { useLocale, useTranslations } from 'next-intl';
import { DatasetCommentEditModal, DatasetCommentReplyModal } from '@components/features';
import { timeAgo } from '@utils/timeAgo';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { AuthModal } from '../auth-modal';


interface ICommmentProps extends IDatasetComment {
    isReply?: boolean,
}


export const DatasetComment: React.FC<ICommmentProps> = (props) => {
    let {
        id,
        text,
        userId,
        fullName,
        nickname,
        isEditable,
        createdAt,
        userImageUrl,
        datasetChildCommentDtos,
        repliedCommentDto,
        isReply
    } = props;

    let t = useTranslations();
    let lng = useLocale();

    const [allRepliesVisible, showAllReplies] = React.useState<boolean>(false);
    const [replies, setReplies] = React.useState<any[]>([]);
    const { isAuthenticated } = useSelector((state: RootState) => state.user);

    const [authModal, setAuthModal] = React.useState<boolean>(false);
    const [askModal, setAskModal] = React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
    const [showReplyModal, setShowReplyModal] = React.useState<boolean>(false);
    const [deleteComment] = useDeleteDatasetCommentMutation();

    const onDeleteComment = async () => {
        try {
            await deleteComment({ commentId: id });
            toast.success("Comment has been deteleted!")
        } catch (err) {
            console.log(err);
            toast.error("Unable to delete this comment")
        }
    }

    React.useEffect(() => {
        if (datasetChildCommentDtos?.length)
            setReplies([...datasetChildCommentDtos])
    }, [datasetChildCommentDtos?.length])


    return (
        <>
            <div className={`inline-flex gap-2 ${isReply ? 'mb-1' : 'mb-3'}`}>
                <Link
                    href={isAuthenticated ? `/${lng}/profile/${userId}` : '#'}
                    onClick={() => isAuthenticated ? {} : setAuthModal(true)}
                    className="relative w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full overflow-hidden"
                >
                    <Image
                        src={userImageUrl || "/png/user.png"}
                        alt="Avatar"
                        fill={true}
                        className="object-cover"
                        priority={true}
                    />
                </Link>
                <div className="inline-flex flex-col min-w-[300px] max-w-[500px] md:max-w-[50%]">
                    <div className={`inline-flex flex-col ${isReply ? 'bg-[#E7EFEC]' : 'bg-[#F0F2F5]'} border ${isReply ? 'border-[#E7EFEC]' : 'border-[#F0F2F5]'} px-4 py-3 gap-1 rounded-3xl`}>
                        <Link href={isAuthenticated ? `/${lng}/profile/${userId}` : '#'} onClick={() => isAuthenticated ? {} : setAuthModal(true)}>
                            <strong className="font-medium hover:text-primary cursor-pointer">{fullName || nickname}</strong>
                        </Link>
                        <div className="text-gray-800 break-words">
                            {!!repliedCommentDto?.fullName && <span className='text-primary'>@{repliedCommentDto?.fullName?.split(' ')[0]} </span>}
                            {text}
                        </div>
                    </div>
                    <div className="flex gap-3 px-4 py-1">
                        <div className="text-sm text-gray-500 cursor-pointer mr-2">{timeAgo(createdAt)}</div>
                        <>
                            {
                                !isReply && isAuthenticated &&
                                <div
                                    onClick={() => setShowReplyModal(true)}
                                    className="text-sm text-gray-500 cursor-pointer font-regmed hover:text-primary"
                                >
                                    {t('reply')}
                                </div>
                            }
                            {
                                isEditable &&
                                <>
                                    <div
                                        onClick={() => setShowEditModal(true)}
                                        className="text-sm text-gray-500 cursor-pointer font-regmed hover:text-primary"
                                    >
                                        {t('edit')}
                                    </div>
                                    <div
                                        onClick={() => setAskModal(true)}
                                        className="text-sm text-gray-500 cursor-pointer font-regmed hover:text-primary"
                                    >
                                        {t('delete')}
                                    </div>
                                </>
                            }
                        </>
                    </div>
                </div>

                <DatasetCommentEditModal
                    visible={showEditModal}
                    commentId={id}
                    commentText={text}
                    onClose={() => setShowEditModal(false)}
                />
                <DatasetCommentReplyModal
                    visible={showReplyModal}
                    commentId={id}
                    commentText={text}
                    onClose={() => setShowReplyModal(false)}
                />
                <ConfirmationModal
                    visible={askModal}
                    onConfirm={onDeleteComment}
                    onClose={() => setAskModal(false)}
                />
                <AuthModal
                    visible={authModal}
                    onClose={() => setAuthModal(false)}
                />
            </div>

            {/*  COMMENT REPLIES */}
            <div className='ml-10'>
                {
                    !!replies?.length && allRepliesVisible
                        ?
                        replies?.map(reply =>
                            <DatasetComment isReply key={reply.id} {...reply} />
                        )
                        :
                        replies?.slice(0, 2)?.map(reply =>
                            <DatasetComment isReply key={reply.id} {...reply} />
                        )
                }
                {
                    !isReply && !!replies?.length &&
                    <button
                        onClick={() => showAllReplies(!allRepliesVisible)}
                        className='text-start text-gray-500 hover:text-primary hover:underline font-medium hover:text-primary min-w-[300px] py-2 ml-10 rounded-3xl mb-3'
                    >
                        {allRepliesVisible ? 'Hide Replies' : 'View More Replies'}
                    </button>
                }
            </div>
        </>

    )
}
