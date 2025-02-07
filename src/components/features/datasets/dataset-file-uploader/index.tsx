"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { CheckIcon, DocUpload, DownloadIcon, ZipIcon } from '@assets/icons';
import { useGetResultQuery, useLazyDownloadResultQuery, useLazySubmitResultQuery, useSaveResultMutation } from '@api/upload-api';
import { useGetCompetitionInfoQuery } from '@api/competition-api';
import { ConfirmationModal } from '@components/shared';
import { saveAs } from 'file-saver';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || '';

interface FileUploaderProps {
    competitionId?: number,
    onClose?: () => void,
}

const DatasetFileUploader: React.FC<FileUploaderProps> = () => {
    const t = useTranslations();
    const [askModal, showAskModal] = React.useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isFakeUploading, setIsFakeUploading] = useState(false);

    const [saveResult, { isLoading: isSaving }] = useSaveResultMutation();
    const { competitionInfo } = useSelector((state: RootState) => state.competitions);
    const { user } = useSelector((state: RootState) => state.user);
    const [triggerSubmitResult, { isLoading: isSubmitting }] = useLazySubmitResultQuery();
    const { data: resultData, isLoading: isResultLoading, refetch: refetchResult } = useGetResultQuery(
        { competitionId: competitionInfo?.id as number, userId: user?.id as number },
        { skip: !competitionInfo?.id }
    );
    const { refetch: refetchCompetitionInfo } = useGetCompetitionInfoQuery(
        { id: competitionInfo?.id as number },
        { skip: !competitionInfo?.id }
    );
    const [triggerDownloadResult, { isLoading: isDownloading }] = useLazyDownloadResultQuery();


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setUploadProgress(0);
            startFakeUpload();
        }
    };


    const startFakeUpload = () => {
        setIsFakeUploading(true);
        setUploadProgress(0);

        // Simulate the fake upload progress with smaller increments and faster updates
        const fakeInterval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(fakeInterval);
                    setIsFakeUploading(false);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 50);
    };


    const handleSave = async () => {
        if (!file) {
            toast.error("Please select a file to upload.", { position: "bottom-left" });
            return;
        }

        try {
            setIsUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            await saveResult({
                competitionId: competitionInfo?.id,
                file: formData,
            }).unwrap();
            toast.success("Solution has been saved successfully!", { position: "bottom-left" })
            handleFileRemove();
            refetchResult();
        } catch (error) {
            toast.error("Failed to save the file.", {
                position: "bottom-left",
            });
            console.error("Upload error: ", error);
        } finally {
            setIsUploading(false);
        }
    };


    const handleSubmit = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                await saveResult({
                    competitionId: competitionInfo?.id,
                    file: formData,
                }).unwrap();
            }
            await triggerSubmitResult({ competitionId: competitionInfo?.id as number });
            await refetchCompetitionInfo();
            handleFileRemove();
            // onClose();
        } catch (error) {
            toast.error("Failed to submit the file.", { position: "bottom-left", });
            console.error("Submit error: ", error);
        }
    };


    const handleDownload = async () => {
        try {
            const token = Cookies.get('dtr-token');
            const response = await fetch(BASE_URL + `/files/download/result/${resultData?.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/zip',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to download the file');
            }

            const blob = await response.blob();
            saveAs(blob, 'filename.zip');
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            try {
                const formData = new FormData();
                formData.append("file", uploadedFile);

                // await uploadOriginalFile({
                //     competitionId: competitionId,
                //     file: formData,
                // }).unwrap();
                toast.success("File has been added successfully!")
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

                // await uploadOriginalFile({
                //     competitionId: competitionId,
                //     file: formData,
                // }).unwrap();
                toast.success("File has been added successfully!");

            } catch (error) {
                toast.error("Failed to save the file.", {
                    position: "bottom-left",
                });
                console.error("Upload error: ", error);
            } finally {

            }
        }
    };


    const handleFileRemove = () => {
        setFile(null);
        setUploadProgress(0);
    };

    const onCloseSidebar = () => {
        handleFileRemove();
        // onClose();
    }

    let submitIsDisabled = !resultData?.id || isSaving || isSubmitting || isFakeUploading
    let saveIsDisabled = !file || isSaving || isSubmitting || isFakeUploading

    return (
        <div className="flex flex-col justify-center items-center mb-40">
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
                        accept=".csv"
                        onChange={handleFileUpload}
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
                                {t('upload')}
                            </label>
                            <span>{t('or')} {t('dragAndDropFile')}</span>
                        </div>

                        <p className="text-gray-400 text-md">
                            {t('acceptedFileType')} .csv ({t('fileLimit')} 5MB)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatasetFileUploader;
