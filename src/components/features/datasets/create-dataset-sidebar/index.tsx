import Divider from '@components/shared/divider';
import { RootState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import DragAndDropSection from '../dataset-uploader';
import { useTranslations } from 'next-intl';
import DatasetUploader from '../dataset-uploader';
import { FormInput } from '@components/shared';
import { useRegisterUserMutation } from '@api/user-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


interface IDatasetSidebarProps {
    visible: boolean;
    setSidebarOpen: (val: boolean) => void;
}

interface IFormInput {
    title: string;
    description: string;
}

export const CreateDatasetSidebar: React.FC<IDatasetSidebarProps> = ({ visible, setSidebarOpen }) => {
    const t = useTranslations();
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const { loading: competitionLoading, competitionInfo } = useSelector((state: RootState) => state.competitions);

    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t('titleIsRequired')),
        description: Yup.string().required(t('descriptionIsRequired'))
    });


    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // try {
        //     await registerUser(data).unwrap();
        //     showEmailSent(true);
        // } catch (err: any) {
        //     console.error('Unknown error:', err);
        //     toast.error(err.data?.message || 'An unexpected error occurred');
        // }
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSidebarOpen]);


    return (
        <div
            data-testid="sidebar-overlay"
            className={`fixed inset-0 z-20 overflow-hidden bg-[rgba(0,0,0,.5)] top-[65px] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`fixed top-0 right-0 w-full md:w-[40%] h-full items-between bg-white shadow-xl py-20 transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}
                ref={sidebarRef}
                onClick={(e) => e.stopPropagation()} // Prevent event propagation
            >
                <div className="px-5 text-start space-y-1 overflow-auto space-y-5">
                    {/* <h2 className="text-2xl font-regmed text-center">Add Your Dataset Information</h2> */}
                    {/* <Divider /> */}

                    {/* <label>Image</label> */}
                    <div
                        className={`w-full h-[200px] p-6 border-dashed border-2 rounded-xl border-gray-300 bg-white`}
                        onDrop={() => { }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <div className="flex flex-col text-center h-[100%] items-center justify-center">
                            <div className="space-y-4">
                                <input
                                    type="file"
                                    className="hidden"
                                    id="file-upload"
                                    accept=".csv"
                                    onChange={() => { }}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-flex cursor-pointer w-auto text-center items-center px-10 py-2 text-white transition-all bg-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px focus:shadow-none"
                                >
                                    Upload Dataset Image
                                </label>
                                <p className="text-gray-500 text-sm">
                                    {t('acceptImageFileLimit')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                                console.log('Selected file:', files[0]);
                            }
                        }}
                    />


                    <form className="space-y-5 select-none" onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                            // label={`${t('title')}*`}
                            type='text'
                            name='title'
                            placeholder="Dataset Title"
                            register={register}
                            errors={errors}
                        />
                        <FormInput
                            isTextarea
                            // label={`${t('description')}*`}
                            name='description'
                            placeholder="Dataset Description"
                            register={register}
                            errors={errors}
                        />
                        {/* <button
                            type="submit"
                            className="w-full h-[50px] font-regmed bg-primary text-white py-2 rounded-xl ring-2 ring-primary hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none focus:bg-primaryDark transition duration-200 ease-in-out transform disabled:bg-gray-400 disabled:ring-gray-400 disabled:cursor-not-allowed"
                        >
                            {t('signUp')}
                        </button> */}
                    </form>

                    {
                        visible &&
                        <DatasetUploader onClose={() => setSidebarOpen(false)} />
                    }
                </div>
            </div>
        </div>
    );
};
