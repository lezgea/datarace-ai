import React from 'react';
import { toast } from 'react-toastify';
import { IDatasetFilesDto } from '@api/types/dataset-types';
import { useCreateDatasetCommentMutation, useDeleteDatasetMutation } from '@api/datasets-api';
import EmojiPicker from 'emoji-picker-react';


interface IDatasetCommentsProps {
    datasetId: number | string | undefined,
    isEditable?: boolean,
}

export const DatasetComments: React.FC<IDatasetCommentsProps> = ({ datasetId, isEditable }) => {
    // const [triggerGetFiles, { data: files, isLoading: datasetsLoading }] = useLazyGetOriginalFilesQuery();
    const [deleteDatasetFile] = useDeleteDatasetMutation();
    const [newComment, setNewComment] = React.useState<string>('');
    const [createDatasetComment, { isLoading, error }] = useCreateDatasetCommentMutation();


    const onCreateComment = async () => {
        try {
            await createDatasetComment({
                id: datasetId,
                data: {
                    text: newComment
                }
            }).unwrap();
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
    };


    const onDeleteFile = async (fileId: any) => {
        try {
            await deleteDatasetFile({ id: fileId });
            toast.success("File has been deteleted")
        } catch (err) {
            console.log(err);
            toast.error("Unable to delete this file")
        }
    }


    return (
        <section className="space-y-2 py-2 border-gray-200">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
                Comments
            </h2>
            <div className="space-y-2 flex flex-col items-end">
                <textarea
                    value={newComment}
                    placeholder={"What's on your mind ?"}
                    className={`w-full h-[100px] bg-gray-50 px-5 py-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onCreateComment();
                            setNewComment('');
                        }
                    }}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    onClick={onCreateComment}
                    className="h-[40px] font-regmed bg-primary text-md text-white px-6 py-1 rounded-lg ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none transition duration-200 ease-in-out transform"
                >
                    Comment
                </button>
                {/* <EmojiPicker
                // value={newComment}
                // onEmojiClick={(val) => setNewComment(val)}
                /> */}
            </div>
        </section>
    )
}