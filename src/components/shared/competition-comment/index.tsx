import { useDeleteDatasetCommentMutation } from '@api/datasets-api';
import { IDatasetComment } from '@api/types/dataset-types';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../confirmation-modal';
import { useTranslations } from 'next-intl';


interface ICommmentProps extends IDatasetComment { }


export const CompetitionComment: React.FC<ICommmentProps> = (props) => {
    let { id, text, fullName, nickname, isEditable, userImageUrl } = props;

    const t = useTranslations();

    const [askModal, setAskModal] = React.useState<boolean>(false);
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

    return (
        <div className="inline-flex gap-2 mb-3">
            <div className="relative w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full overflow-hidden">
                <Image
                    src={userImageUrl || "/png/user.png"}
                    alt="Avatar"
                    fill={true}
                    className="object-cover"
                    priority={true}
                />
            </div>
            <div className="inline-flex flex-col max-w-[300px] md:max-w-[50%]">
                <div className="inline-flex flex-col bg-[#F0F2F5] border border-[#F1F3F5] px-4 py-3 gap-1 rounded-3xl">
                    <strong className="font-medium">{fullName || nickname}</strong>
                    <div className="text-gray-800 break-words">{text}</div>
                </div>
                <div className="flex gap-3 px-4 py-1">
                    {
                        isEditable &&
                        <>
                            <div
                                onClick={() => { }}
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
                </div>
            </div>

            <ConfirmationModal
                visible={askModal}
                onConfirm={onDeleteComment}
                onClose={() => setAskModal(false)}
            />
        </div>
    )
}
