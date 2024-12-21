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

    const [askModal, setAskModal] = React.useState<boolean>(false);
    const [showReplyModal, setShowReplyModal] = React.useState<boolean>(false);
    const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
    const [deleteComment] = useDeleteCompetitionCommentMutation();

    const onDeleteComment = async () => {
        try {
            await deleteComment({ commentId: id });
            toast.success("Comment has been deteleted!")
        } catch (err) {
            console.log(err);
            toast.error("Unable to delete this comment")
        }
    }

    return (
        <>
            <div className={`inline-flex gap-2 ${isReply ? 'mb-1' : 'mb-3'}`}>
                <div className="relative w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full overflow-hidden">
                    <Image
                        src={userImageUrl || "/png/user.png"}
                        alt="Avatar"
                        fill={true}
                        className="object-cover"
                        priority={true}
                    />
                </div>
                <div className="inline-flex flex-col min-w-[300px] max-w-[500px] md:max-w-[50%]">
                    <div className={`inline-flex flex-col ${isReply ? 'bg-[#E7EFEC]' : 'bg-[#F0F2F5]'} border ${isReply ? 'border-[#E7EFEC]' : 'border-[#F0F2F5]'} px-4 py-3 gap-1 rounded-3xl`}>
                        <Link href={`/${lng}/profile/${userId}`}>
                            <strong className="font-medium hover:text-primary cursor-pointer">{fullName || nickname}</strong>
                        </Link>
                        <div className="text-gray-800 break-words">{text}</div>
                    </div>
                    <div className="flex gap-3 px-4 py-1">
                        <div className="text-sm text-gray-500 cursor-pointer mr-2">{timeAgo(createdAt)}</div>
                        <>
                            {
                                !isReply &&
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
            </div>

            {/*  COMMENT REPLIES */}
            <div className='ml-10'>
                {
                    !!competitionChildCommentDtos?.length &&
                    competitionChildCommentDtos?.map(reply =>
                        <CompetitionComment isReply key={reply.id} {...reply} />
                    )
                }
            </div>
        </>
    )
}
