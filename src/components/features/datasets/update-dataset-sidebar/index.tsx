import React from 'react';
import { useTranslations } from 'next-intl';
import { FormInput } from '@components/shared';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatasetImageUploader from '../dataset-image-uploader';
import { useCreateDatasetMutation, useGetDatasetInfoQuery, useUpdateDatasetMutation } from '@api/datasets-api';
import { toast } from 'react-toastify';
import { IDatasetCreateRequest } from '@api/types/dataset-types';
import { useUpdateUserMutation } from '@api/user-api';
import { useParams } from 'next/navigation';
import DatasetFileUploader from '../dataset-file-uploader';
import { DatasetFiles } from '../dataset-files';


interface IDatasetSidebarProps {
    visible: boolean;
    setSidebarOpen: (val: boolean) => void;
}

interface IFormInput extends IDatasetCreateRequest { }

export const UpdateDatasetSidebar: React.FC<IDatasetSidebarProps> = ({ visible, setSidebarOpen }) => {
    const t = useTranslations();
    const params = useParams();
    const { dataId } = params;
    const datasetId: string = Array.isArray(dataId) ? dataId[0] : dataId;

    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const [imageId, setImageId] = React.useState<number>(0);

    const { data: datasetInfo, error: dataInfoError, isLoading: dataInfoLoading, refetch } = useGetDatasetInfoQuery({ id: dataId as string }, { skip: !dataId });
    const [updateDataset, { isLoading, error }] = useUpdateDatasetMutation();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(t('titleIsRequired')),
        description: Yup.string().required(t('descriptionIsRequired'))
    });

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    const visibility = watch('visibility');

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await updateDataset({
                dataId: dataId as string,
                datasetImageId: imageId,
                ...data
            }).unwrap();
            toast.success('Dataset has been created');
            setSidebarOpen(false);
            reset();
            setImageId(0);
            setValue('visibility', 'PUBLIC');
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
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


    React.useEffect(() => {
        setValue('title', datasetInfo?.title || '');
        setValue('description', datasetInfo?.description || '');
        setValue('visibility', datasetInfo?.visibility);
    }, [datasetInfo])


    return (
        <div
            data-testid="sidebar-overlay"
            className={`fixed inset-0 z-20 pb-60 bg-[rgba(0,0,0,.5)] top-[65px] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`fixed overflow-scroll top-0 right-0  w-full md:w-[40%] h-full items-between bg-white shadow-xl py-20 transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}
                ref={sidebarRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="realtive px-5 text-start space-y-1 overflow-auto space-y-5">
                    <DatasetImageUploader setImageId={setImageId} image={datasetInfo?.imageUrl || ''} />

                    <form className="space-y-5 select-none" onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                            type='text'
                            name='title'
                            placeholder="Dataset Title"
                            register={register}
                            errors={errors}
                        />
                        <FormInput
                            isTextarea
                            name='description'
                            placeholder="Dataset Description"
                            register={register}
                            errors={errors}
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

                        <DatasetFiles
                            datasetId={datasetId}
                            isEditable={datasetInfo?.isEditable}
                            files={datasetInfo?.datasetFileDownloadDto}
                            refetch={refetch}
                        />

                        <div className="py-5 flex w-full justify-end border-t bg-white">
                            <button
                                type='submit'
                                className="flex w-full text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            >
                                Update Dataset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
