"use client"

import React from 'react';
import { SignOutIcon, WarningIcon } from '@assets/icons';
import { FormEditInput } from '@components/shared/form-edit-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDeleteUserMutation, useLogoutUserMutation, useUpdateUserMutation } from '@api/user-api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@slices/user-slice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { ConfirmationModal } from '@components/shared';



interface IFormInput {
    fullName: string,
    email: string,
    nickname?: string,
    phoneNumber?: string,
    profileFileId?: number | string,
}

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Fullname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    nickname: Yup.string(),
    phoneNumber: Yup.string(),
});


export const AccountSettings: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [logoutModal, setLogoutModal] = React.useState<boolean>(false);
    const [deleteModal, setDeleteModal] = React.useState<boolean>(false);

    const selectAuthData = createSelector(
        (state: RootState) => state.user.user,
        (state: RootState) => state.user.isAuthenticated,
        (state: RootState) => state.user.loading,
        (user, isAuthenticated, loading) => ({ user, isAuthenticated, loading })
    );

    const { user } = useSelector(selectAuthData);

    const [logoutUser] = useLogoutUserMutation();
    const [updateUser, { isLoading: updateLoading, isError: updateError, data }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: deleteLoading, isError: deleteError }] = useDeleteUserMutation();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    React.useEffect(() => {
        if (user) {
            // Set default values when user data is available
            setValue('profileFileId', user.profileFileId || 1);
            setValue('fullName', user.fullName || '');
            setValue('email', user.email || '');
            setValue('nickname', user.nickname || '');
            setValue('phoneNumber', user.phoneNumber || '');
        }
    }, [user, setValue]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await updateUser({ id: user?.id || '', data: data }).unwrap();
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser({ id: user?.id || '' }).unwrap();
            router.push('/');
        } catch (error) {
            console.error('Account deletion failed', error);
        }
    };

    const onCancel = () => {
        if (user) {
            setValue('fullName', user.fullName || '');
            setValue('email', user.email || '');
            setValue('nickname', user.nickname || '');
            setValue('phoneNumber', user.phoneNumber || '');
        }
    }


    return (
        <div>
            <div className="space-y-5">
                <div className="flex items-center border border-gray-300 px-5 py-3 rounded-2xl space-x-5">
                    <WarningIcon className="w-10 h-10" />
                    <div className="w-full font-medium">Verify your account with your phone number</div>
                    <button className="inline-flex min-w-[150px] text-center font-medium items-center justify-center px-6 py-3 text-primaryLight transition-all dark:bg-white dark:text-gray-800 rounded-xl sm:w-auto hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 dark:shadow-neutral-700 focus:shadow-none">
                        Verify now
                    </button>
                </div>
                <form className="space-y-4 w-full sm:w-80" onSubmit={handleSubmit(onSubmit)}>
                    <FormEditInput
                        label='Fullname'
                        type='string'
                        name='fullName'
                        placeholder="Jon Doe"
                        register={register}
                        errors={errors}
                    />
                    <FormEditInput
                        label='Username'
                        type='text'
                        name='nickname'
                        placeholder="@nickname"
                        register={register}
                        errors={errors}
                    />
                    <div className="space-y-2">
                        <FormEditInput
                            label='Contact'
                            type='email'
                            name='email'
                            placeholder="email@example.com"
                            register={register}
                            errors={errors}
                        />
                        <FormEditInput
                            type='string'
                            name='phoneNumber'
                            placeholder="phone"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="flex w-full space-x-3 py-4">
                        <button type="submit" className="flex w-full text-center justify-center px-4 py-2 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                            Save
                        </button>
                        <button type="button" onClick={onCancel} className="flex w-full text-center justify-center px-4 py-2 text-primaryDark transition-all border border-primaryDark rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="w-full">
                    <div className="flex space-x-3 mb-2">
                        <div className="h-[25px] w-[2px] bg-red" />
                        <span className="text-lg font-medium">Delete your account</span>
                    </div>
                    <p className="text-sm mb-4">Canceling account deletion can be changed within 30 days.</p>
                    <button type="button" onClick={() => setDeleteModal(true)} className="mb-10 flex w-full sm:w-40 text-center justify-center px-4 py-2 text-red transition-all border border-red rounded-lg hover:bg-red hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        Delete
                    </button>
                    <button onClick={() => setLogoutModal(true)} className="flex w-full sm:w-40 text-center justify-center px-4 py-2 text-gray-500 transition-all bg-gray-100 rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            <ConfirmationModal
                visible={logoutModal}
                onConfirm={handleLogout}
                onClose={() => setLogoutModal(false)}
            />
            <ConfirmationModal
                visible={deleteModal}
                onConfirm={handleDeleteAccount}
                onClose={() => setDeleteModal(false)}
            />
        </div>
    );
};
