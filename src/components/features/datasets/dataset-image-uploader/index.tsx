"use client"

import { useUploadDatasetImageMutation } from '@api/upload-api';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';




interface ImageUploaderProps {
    image?: string,
    setImageId: (val: number) => void,
}

const DatasetImageUploader: React.FC<ImageUploaderProps> = ({ image, setImageId }) => {
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
                (uploadedImage || image) ?
                    <>
                        <div
                            id="FileUpload"
                            className="relative w-full h-60 flex items-center justify-center content-center cursor-pointer appearance-none rounded-2xl border-2 border-dashed border-primary dark:bg-meta-4 overflow-hidden"
                        >
                            {
                                !!uploadedImage
                                    ?
                                    <img
                                        src={URL.createObjectURL(uploadedImage)} // Create a URL for the uploaded image
                                        alt="Uploaded Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    :
                                    <img
                                        src={image} // Create a URL for the uploaded image
                                        alt="Uploaded Preview"
                                        className="w-full h-full object-cover"
                                    />
                            }
                            <button
                                className="absolute z-2330 w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-gray-700 rounded-xl sm:w-auto hover:bg-dark shadow-neutral-300 focus:shadow-none animate-button"
                            >
                                Delete Image
                            </button>
                        </div>
                        {
                            uploadedImage &&
                            <p className="text-gray-400 text-sm">Uploaded Image: {uploadedImage.name}</p>
                        }
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