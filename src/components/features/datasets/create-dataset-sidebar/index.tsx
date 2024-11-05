import React from 'react';
import { useTranslations } from 'next-intl';
import { FormInput } from '@components/shared';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatasetImageUploader from '../dataset-image-uploader';
import { useCreateDatasetMutation } from '@api/datasets-api';
import { toast } from 'react-toastify';
import { IDatasetCreateRequest } from '@api/types/dataset-types';
import TextEditor from '@components/shared/text-editor';


interface IDatasetSidebarProps {
    visible: boolean;
    setSidebarOpen: (val: boolean) => void;
}

interface IFormInput extends IDatasetCreateRequest { }

export const CreateDatasetSidebar: React.FC<IDatasetSidebarProps> = ({ visible, setSidebarOpen }) => {
    const t = useTranslations();
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const [imageId, setImageId] = React.useState<number | null>(0);

    const [createDataset, { isLoading, error }] = useCreateDatasetMutation();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t('titleIsRequired')),
        description: Yup.string().required(t('descriptionIsRequired'))
    });

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    const visibility = watch('visibility');

    const onResetData = () => {
        reset();
        setImageId(0);
        setValue('visibility', 'PUBLIC');
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await createDataset({
                datasetImageId: imageId,
                ...data
            }).unwrap();
            toast.success('Dataset has been created');
            setSidebarOpen(false);
            onResetData();
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
    };

    const onCancel = () => {
        setSidebarOpen(false);
        onResetData();
    }


    React.useEffect(() => {
        setValue('visibility', 'PUBLIC')
    }, [])


    return (
        <div
            data-testid="sidebar-overlay"
            className={`fixed inset-0 z-20 overflow-hidden bg-[rgba(0,0,0,.5)] top-[65px] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`fixed overflow-scroll top-0 right-0 w-full lg:w-[50%] h-full items-between bg-white shadow-xl pt-20 transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}
                ref={sidebarRef}
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-5 pb-20 text-start space-y-1 overflow-auto space-y-5">
                        <DatasetImageUploader setImageId={setImageId} />

                        <div className="space-y-5 select-none">
                            <FormInput
                                type='text'
                                name='title'
                                placeholder="Dataset Title"
                                register={register}
                                errors={errors}
                            />
                            <TextEditor
                                name='description'
                                initialValue=' '
                                register={register}
                                setValue={setValue}
                            />
                            <div id="visibility" className='flex gap-3'>
                                <div
                                    className={`flex items-center text-center px-4 py-2 rounded-xl cursor-pointer ${visibility === 'PRIVATE' ? 'bg-primary text-white' : 'text-primary border border-primary'}`}
                                    onClick={() => setValue('visibility', 'PRIVATE')}
                                >
                                    PRIVATE
                                </div>
                                <div
                                    className={`flex items-center text-center px-4 py-2 rounded-xl cursor-pointer ${visibility === 'PUBLIC' ? 'bg-primary text-white' : 'text-primary border border-primary'}`}
                                    onClick={() => setValue('visibility', 'PUBLIC')}
                                >
                                    PUBLIC
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-3 px-5 flex w-full gap-3 border-t">
                        <button
                            type='submit'
                            className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                        >
                            Create Dataset
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex w-full sm:w-40 text-center items-center justify-center px-4 py-2 text-gray-500 transition-all bg-gray-100 rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
