"use client"

import { SignOutIcon, WarningIcon } from '@assets/icons';
import { FormEditInput } from '@components/shared/form-edit-input';
import React, { useState } from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogoutUserMutation, useUpdateUserMutation } from '@api/user-api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@slices/user-slice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';


interface IAccountSettingsProps {

}

interface IFormInput {
    fullname: string;
    username: string;
}

const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string().email('Invalid email').required('Email is required'),
});


export const AccountSettings: React.FC<IAccountSettingsProps> = (props) => {
    let { } = props

    const dispatch = useDispatch();
    const router = useRouter();

    const selectAuthData = createSelector(
        (state: RootState) => state.user.user,
        (state: RootState) => state.user.isAuthenticated,
        (state: RootState) => state.user.loading,
        (user, isAuthenticated, loading) => ({ user, isAuthenticated, loading })
    );

    const { user, isAuthenticated, loading: isUserLoading } = useSelector(selectAuthData);

    const [logoutUser, { isLoading, isError, error }] = useLogoutUserMutation();
    const [updateUser, { isLoading: updatLoading, isError: updateError, data }] = useUpdateUserMutation();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    React.useEffect(() => {
        if (user) {
            // Set default values when user data is available
            setValue('fullname', user.fullName || '');
            setValue('username', user.username || '');
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

    const onCancel = () => {
        if (user) {
            setValue('fullname', user.fullName || '');
            setValue('username', user.username || '');
        }
    }


    return (
        <div className="space-y-10">
            <div className="flex items-center border border-gray-300 px-5 py-3 rounded-2xl space-x-5">
                <WarningIcon className="w-10 h-10" />
                <div className="w-full font-medium">Verify your account with your phone number</div>
                <button className="inline-flex min-w-[150px] text-center font-medium items-center justify-center px-6 py-3 text-primaryLight transition-all dark:bg-white dark:text-gray-800 rounded-xl sm:w-auto hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 dark:shadow-neutral-700 focus:shadow-none">
                    Verify now
                </button>
            </div>
            <form className="space-y-5 w-80" onSubmit={handleSubmit(onSubmit)}>
                <FormEditInput
                    label='Fullname'
                    type='fullname'
                    name='fullname'
                    placeholder="Jon Doe"
                    register={register}
                    errors={errors}
                />
                <FormEditInput
                    label='Username'
                    type='username'
                    name='username'
                    placeholder="@username"
                    register={register}
                    errors={errors}
                />
                <div className="flex w-full space-x-3 py-4">
                    <button type="submit" className="flex w-full text-center justify-center px-4 py-2 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        Save
                    </button>
                    <button type="button" onClick={onCancel} className="flex w-full text-center justify-center px-4 py-2 text-white transition-all bg-gray-800 rounded-lg hover:bg-dark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        Cancel
                    </button>
                </div>
                <button onClick={handleLogout} className="flex w-40 space-x-2 text-center items-center px-4 py-2 text-gray-900 transition-all rounded-lg sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                    <span>Sign Out</span>
                    <SignOutIcon />
                </button>
            </form>
        </div>
    );
};
