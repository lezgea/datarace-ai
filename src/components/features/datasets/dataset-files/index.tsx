import React from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';
import { DocUpload, TrashIcon } from '@assets/icons';
import { useUploadDatasetFileMutation } from '@api/upload-api';
import { IDatasetFilesDto } from '@api/types/dataset-types';
import { useDeleteDatasetMutation } from '@api/datasets-api';
import { AuthModal } from '@components/shared';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';


const BASE_URL = 'https://beta.datarace.ai/v1';

interface IOriginalFilesProps {
    datasetId: number | string | undefined,
    isEditable?: boolean,
    files?: IDatasetFilesDto[],
    refetch: () => void,
}

export const DatasetFiles: React.FC<IOriginalFilesProps> = ({ files, datasetId, isEditable, refetch }) => {
    let lng = useLocale();
    const router = useRouter();
    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);

    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const [uploadDatasetFile] = useUploadDatasetFileMutation();
    const [deleteDatasetFile] = useDeleteDatasetMutation();


    const handleDownload = async (fileName: string, datasetFileId: number | undefined, fileType: string) => {
        try {
            const token = Cookies.get('dtr-token');
            const response = await fetch(BASE_URL + `/files/download/dataset/${datasetFileId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'text/csv',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download the file');
            }

            const blob = await response.blob();
            saveAs(blob, `${fileName}.${fileType}`);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    const handleOriginalFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            try {
                const formData = new FormData();
                formData.append("file", uploadedFile);

                await uploadDatasetFile({
                    datasetId: datasetId,
                    file: formData,
                }).unwrap();
                toast.success("File has been uploaded successfully!");
                await refetch();
            } catch (error) {
                toast.error("Failed to save the file.", {
                    position: "bottom-left",
                });
                console.error("Upload error: ", error);
            } finally {

            }
        }
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            try {
                const formData = new FormData();
                formData.append("file", droppedFile);

                await uploadDatasetFile({
                    datasetId: datasetId,
                    file: formData,
                }).unwrap();
                toast.success("Solution has been saved successfully!", { position: "bottom-left" });

            } catch (error) {
                toast.error("Failed to save the file.", {
                    position: "bottom-left",
                });
                console.error("Upload error: ", error);
            } finally {

            }
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
            {
                !!files?.length &&
                <>
                    <h2 className="text-2xl font-semibold text-black dark:text-white">
                        Files
                    </h2>
                    <div className="overflow-x-auto border rounded-2xl bg-white">
                        <table className="min-w-full border border-gray-600 rounded-lg overflow-hidden">
                            {/* Table Header */}
                            <thead className="text-gray-600">
                                <tr>
                                    <th className="py-3 px-6 text-left font-semibold">Id</th>
                                    <th className="py-3 px-6 text-left font-semibold">Filename</th>
                                    <th className="py-3 px-6 text-left font-semibold">Type</th>
                                    <th className="py-3 px-6 text-left font-semibold"></th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {files?.map((row: any, index: number) => (
                                    <tr
                                        key={row.id}
                                        className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            }`}
                                    >
                                        <td className="py-3 px-6">{row.id}</td>
                                        <td className="w-full py-3 px-6">{row.fileName}</td>
                                        <td className="w-full py-3 px-6">{row.fileType}</td>
                                        <td className="py-3 px-6 text-primary hover:text-primaryLight cursor-pointer" >
                                            <div className='flex space-x-6'>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => isAuthenticated ? handleDownload(row.fileName, row.id, row.fileType) : setShowAuthModal(true)}
                                                >
                                                    Download
                                                </div>
                                                {
                                                    isEditable &&
                                                    <div onClick={() => onDeleteFile(row.id)}>
                                                        <TrashIcon />
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <AuthModal
                        visible={showAuthModal}
                        onClose={() => setShowAuthModal(false)}
                        onSignUp={() => router.push(`/${lng}/sign-up`)}
                        onConfirm={() => router.push(`/${lng}/sign-in`)}
                    />
                </>
            }

            {
                isEditable &&
                <div
                    className={`w-full h-full p-6 border rounded-2xl border-gray-200 bg-white hover:border-bluePrimary cursor-pointer`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <div className="flex text-start h-[100%] items-center gap-4">
                        <input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            accept=".xls,.docx,.txt,.csv"
                            onChange={handleOriginalFileUpload}
                        />
                        <label htmlFor="file-upload" className='p-3 bg-bluePrimaryLight rounded-xl cursor-pointer'>
                            <DocUpload />
                        </label>
                        <div>
                            <div className="flex gap-2 font-medium">
                                <label
                                    htmlFor="file-upload"
                                    className="inline-flex cursor-pointer w-auto text-center text-bluePrimary items-center transition-all underline rounded-lg sm:w-auto"
                                >
                                    Upload
                                </label>
                                <span>or drag and drop file here</span>
                            </div>

                            <p className="text-gray-400 text-md">
                                Accepted file types are xls, docx, txt, or csv (File limit 50MB)
                            </p>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}