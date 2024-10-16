"use client"

import { useUploadDatasetImageMutation } from '@api/upload-api';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';




interface ImageUploaderProps {
    setImageId: (val: number) => void,
}

const DatasetImageUploader: React.FC<ImageUploaderProps> = ({ setImageId }) => {
    const [uploadedImage, setUploadedImage] = React.useState<File | null>(null);
    const [uploadDatasetImage, { isLoading }] = useUploadDatasetImageMutation();


    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (!uploadedFile) {
            return;
        }

        setUploadedImage(uploadedFile);

        try {
            const formData = new FormData();
            formData.append("file", uploadedFile);

            let response = await uploadDatasetImage({ file: formData }).unwrap();
            setImageId(response.id)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <label className="block font-semibold text-gray-900">
                Image Upload
            </label>
            {
                uploadedImage ?
                    <>
                        <div
                            id="FileUpload"
                            className="relative w-full h-60 inline-block items-center content-center cursor-pointer appearance-none rounded-2xl border-2 border-dashed border-primary dark:bg-meta-4 overflow-hidden"
                        >
                            <img
                                src={URL.createObjectURL(uploadedImage)} // Create a URL for the uploaded image
                                alt="Uploaded Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-gray-400 text-sm">Uploaded Image: {uploadedImage.name}</p>
                    </>

                    :
                    <div
                        id="FileUpload"
                        className="relative my-3 w-full h-60 inline-block items-center content-center cursor-pointer appearance-none rounded-2xl border-2 border-dashed border-primary py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            onChange={handleImageChange}
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                            {/* <IImageIcon /> */}
                            <p className="mt-1.5">Image Upload</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default DatasetImageUploader;
