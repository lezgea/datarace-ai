import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../confirmation-modal';
import { useLocale, useTranslations } from 'next-intl';
import { ICompetitionComment } from '@api/types/competition-types';
import { useDeleteCompetitionCommentMutation } from '@api/competition-api';
import { CompetitionCommentEditModal } from '@components/features/races/competition-comment-edit-modal';
import { timeAgo } from '@utils/timeAgo';
import { CompetitionCommentReplyModal } from '@components/features';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { AuthModal } from '../auth-modal';


interface ICommmentProps extends ICompetitionComment {
    isReply?: boolean,
}


export const CompetitionComment: React.FC<ICommmentProps> = (props) => {
    let {
        id,
        text,
        userId,
        fullName,
        nickname,
        isEditable,
        createdAt,
        userImageUrl,
        isReply,
        competitionChildCommentDtos,
    } = props;

    let lng = useLocale();
    let t = useTranslations();

    const [replies, setReplies] = React.useState<any[]>([])
    const [allRepliesVisible, showAllReplies] = React.useState<boolean>(false)

    const { isAuthenticated } = useSelector((state: RootState) => state.user);

    const [authModal, setAuthModal] = React.useState<boolean>(false);
    const [askModal, setAskModal] = React.useState<boolean>(false);
    const [showReplyModal, setShowReplyModal] = React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
    const [deleteComment] = useDeleteCompetitionCommentMutation();

    const onDeleteComment = async () => {
        try {
            await deleteComment({ lang: lng, commentId: id });
        } catch (err) {
            console.log(err);
            toast.error("Unable to delete this comment")
        }
    }

    React.useEffect(() => {
        if (competitionChildCommentDtos?.length)
            setReplies([...competitionChildCommentDtos])
    }, [competitionChildCommentDtos?.length])


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
                        <div className="text-gray-800 break-words">{text}</div>
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

                <CompetitionCommentEditModal
                    visible={showEditModal}
                    commentId={id}
                    commentText={text}
                    onClose={() => setShowEditModal(false)}
                />
                <CompetitionCommentReplyModal
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
            <div className='w-full ml-10'>
                {
                    !!replies?.length && allRepliesVisible
                        ?
                        replies?.map(reply =>
                            <CompetitionComment isReply key={reply.id} {...reply} />
                        )
                        :
                        replies?.slice(0, 2)?.map(reply =>
                            <CompetitionComment isReply key={reply.id} {...reply} />
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
