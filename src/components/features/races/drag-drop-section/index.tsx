"use client"

import React, { useState } from 'react';
import { useUploadResultMutation } from '@api/upload-api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { CheckIcon, ZipIcon } from '@assets/icons';

interface FileUploaderProps {
    competitionId?: number | null,
    onClose: () => void,
}

const FileUploader: React.FC<FileUploaderProps> = ({ competitionId, onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isFakeUploading, setIsFakeUploading] = useState(false);

    const [uploadResult, { isLoading }] = useUploadResultMutation();
    const { competitionInfo } = useSelector((state: RootState) => state.competitions);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setUploadProgress(0);
            startFakeUpload();
        }
    };


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setUploadProgress(0);
            startFakeUpload(); // Start fake upload on drop
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


    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file to upload.");
            return;
        }

        try {
            setIsUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            await uploadResult({
                competitionId: competitionInfo?.id,
                file: formData,
            }).unwrap();

            toast.success("Solution has been uploaded successfully!", {
                position: "bottom-left",
            });

            handleFileRemove();
            onClose();
        } catch (error) {
            toast.error("Failed to upload the file.", {
                position: "bottom-left",
            });
            console.error("Upload error: ", error);
        } finally {
            setIsUploading(false);
        }
    };


    const handleFileRemove = () => {
        setFile(null);
        setUploadProgress(0);
    };

    const onCloseSidebar = () => {
        handleFileRemove();
        onClose();
    }

    let submitIsDisabled = isUploading || isFakeUploading || !file


    return (
        <div className="flex flex-col justify-center items-center h-[300px] space-y-2 mb-40 pt-20">
            <div className="w-full space-y-2">
                {
                    file &&
                    <div className="flex items-center space-x-3">
                        <ZipIcon className="w-7 h-7" />
                        <div className="w-full">
                            <p className="text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500 w-full">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                        {(uploadProgress == 100) && <CheckIcon className="w-10 h-10" />}
                    </div>
                }
                {
                    (isUploading || isFakeUploading) &&
                    <div className="relative w-full h-1 bg-gray-200 rounded-full">
                        <div
                            className="absolute top-0 h-full bg-primary rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                }
            </div>

            {/* )} */}
            <div
                className={`w-full h-full p-6 border-dashed border-2 rounded-xl ${isFakeUploading || isUploading ? 'border-primaryLight bg-primaryExtra' : 'border-gray-300 bg-white'
                    }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className="flex flex-col text-center h-[100%] items-center justify-center">
                    {file && (uploadProgress == 100) ? (
                        <>
                            <p className="text-primaryLight mb-4">{file.name} uploaded successfully!</p>
                            <button
                                onClick={handleFileRemove}
                                className="mb-10 inline-flex w-full sm:w-40 text-center justify-center px-4 py-2 text-white bg-red transition-all border border-red rounded-lg hover:bg-red hover:text-white shadow-neutral-300 hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px focus:shadow-none"
                            >
                                Remove File
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-gray-500">Drag and drop files here</p>
                            <p className="text-gray-500 text-lg">OR</p>
                            <input
                                type="file"
                                className="hidden"
                                id="file-upload"
                                accept=".zip"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="inline-flex cursor-pointer w-auto text-center items-center px-10 py-2 text-white transition-all bg-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px focus:shadow-none"
                            >
                                Browse Files
                            </label>
                            <p className="text-gray-500 text-sm">
                                Accepted file type .zip (File limit 50MB)
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white absolute w-full bottom-0 shadow-[0px_-2px_10px_0px_rgba(0,0,0,0.10)]">
                <div className="flex space-x-3 p-5">
                    <button onClick={handleUpload} disabled={submitIsDisabled} className={`inline-flex w-auto text-center items-center px-10 py-2 text-white transition-all ${submitIsDisabled ? 'bg-gray-500' : 'bg-primary hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none'} rounded-lg sm:w-auto animate-button`}>
                        {isUploading ? "Uploading..." : "Submit"}
                    </button>
                    <button onClick={onCloseSidebar} className="inline-flex w-auto text-center items-center px-10 py-2 text-primary transition-all border border-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none animate-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
