"use client"

import React from 'react';
import { Modal } from '@components/shared';
import { useTranslations } from 'next-intl';
import { useCreateDatasetCommentMutation, useUpdateDatasetCommentMutation } from '@api/datasets-api';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';


interface IDatasetCommentReplyModalProps {
    visible: boolean,
    commentId: string | number | undefined,
    commentText: string,
    onClose: () => void,
}

export const DatasetCommentReplyModal: React.FC<IDatasetCommentReplyModalProps> = (props) => {
    let { visible, onClose } = props;

    return (
        <Modal
            visible={visible}
            content={<ModalContent {...props} />}
            onClose={onClose}
        />
    )
}


interface IModalContent extends IDatasetCommentReplyModalProps { }

const ModalContent: React.FC<IModalContent> = (props) => {
    let { commentId, commentText, onClose } = props;

    const t = useTranslations();
    const { dataId } = useParams();
    const datasetId = dataId as string;
    const commId = commentId as string;

    const [newComment, setNewComment] = React.useState<string>('');
    const [createDatasetComment] = useCreateDatasetCommentMutation();


    const onReplyComment = async () => {
        try {
            if (newComment.trim() !== "") {
                await createDatasetComment({
                    id: datasetId || '',
                    data: {
                        repliedComment: {
                            commentId: commId
                        },
                        text: newComment
                    }
                }).unwrap();
                setNewComment('');
                onClose();
            }
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
    };


    return (
        <div className="flex flex-col min-w-[80vw] md:min-w-[50vw] items-center justify-center p-6 space-y-5 text-center">
            <div className="flex w-full space-y-3 flex-col items-end">
                <div>{commentText}</div>
                <textarea
                    value={newComment}
                    placeholder={"What's on your mind ?"}
                    className={`w-full h-[200px] bg-gray-50 px-5 py-4 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onReplyComment();
                        }
                    }}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    onClick={onReplyComment}
                    className="h-[40px] font-regmed bg-primary text-md text-white px-6 py-1 rounded-lg ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none transition duration-200 ease-in-out transform"
                >
                    {t('replyComment')}
                </button>
                {/* <EmojiPicker
                // value={newComment}
                // onEmojiClick={(val) => setNewComment(val)}
                /> */}
            </div>
        </div>
    )
}