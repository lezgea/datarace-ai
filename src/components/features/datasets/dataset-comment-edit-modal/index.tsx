import React from 'react';
import { Modal } from '@components/shared';
import { useTranslations } from 'next-intl';
import { useUpdateDatasetCommentMutation } from '@api/datasets-api';
import { toast } from 'react-toastify';


interface IDatasetCommentEditModalProps {
    visible: boolean,
    commentId: string | number | undefined,
    commentText: string,
    onClose: () => void,
}

export const DatasetCommentEditModal: React.FC<IDatasetCommentEditModalProps> = (props) => {
    let { visible, onClose } = props;

    return (
        <Modal
            visible={visible}
            content={<ModalContent {...props} />}
            onClose={onClose}
        />
    )
}

interface IModalContent {
    commentId: string | number | undefined,
    commentText: string,
    onClose: () => void,
}

const ModalContent: React.FC<IModalContent> = (props) => {
    let { commentId, commentText, onClose } = props;

    const t = useTranslations();

    const [newComment, setNewComment] = React.useState<string>(commentText);
    const [updateDatasetComment, { isLoading, error }] = useUpdateDatasetCommentMutation()


    const onUpdateComment = async () => {
        try {
            if (newComment.trim() !== "") {
                await updateDatasetComment({
                    commentId: commentId,
                    data: {
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
                <textarea
                    value={newComment}
                    placeholder={"What's on your mind ?"}
                    className={`w-full h-[200px] bg-gray-50 px-5 py-4 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    onClick={onUpdateComment}
                    className="h-[40px] font-regmed bg-primary text-md text-white px-6 py-1 rounded-lg ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none transition duration-200 ease-in-out transform"
                >
                    {t('updateComment')}
                </button>
            </div>
        </div>
    )
}
