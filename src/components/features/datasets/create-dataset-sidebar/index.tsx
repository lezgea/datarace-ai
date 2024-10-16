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


interface IDatasetSidebarProps {
    visible: boolean;
    setSidebarOpen: (val: boolean) => void;
}

interface IFormInput extends IDatasetCreateRequest { }

export const CreateDatasetSidebar: React.FC<IDatasetSidebarProps> = ({ visible, setSidebarOpen }) => {
    const t = useTranslations();
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const [imageId, setImageId] = React.useState<number>(0);

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

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await createDataset({
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
        setValue('visibility', 'PUBLIC')
    }, [])


    return (
        <div
            data-testid="sidebar-overlay"
            className={`fixed inset-0 z-20 overflow-hidden bg-[rgba(0,0,0,.5)] top-[65px] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`fixed top-0 right-0 w-full md:w-[40%] h-full items-between bg-white shadow-xl py-20 transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}
                ref={sidebarRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-5 text-start space-y-1 overflow-auto space-y-5">
                    <DatasetImageUploader setImageId={setImageId} />

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

                        <div className="absolute px-4 py-3 left-0 bottom-0 w-full border-t">
                            <button
                                type='submit'
                                className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            >
                                Create Dataset
                            </button>
                        </div>
                    </form>

                    {
                        // visible &&
                        // <DatasetUploader onClose={() => setSidebarOpen(false)} />
                    }
                </div>
            </div>
        </div>
    );
};
