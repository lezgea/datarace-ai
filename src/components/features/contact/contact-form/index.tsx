"use client";

import { FormInput, Modal } from '@components/shared';
import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '@api/user-api';
import { toast } from 'react-toastify';
// import { EmailSent } from '../email-sent';
import { useLocale, useTranslations } from 'next-intl';


interface IFormInput {
    email: string;
    password: string;
    confirmation: string;
}


export const ContactForm: React.FC = () => {
    const lng = useLocale();
    const t = useTranslations();

    const [terms, acceptTerms] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [emailSent, showEmailSent] = React.useState<boolean>(false);
    const [termsModal, setTermsModal] = React.useState<boolean>(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('invalidEmail'))
            .required(t('emailIsRequired')),
        password: Yup.string()
            .required(t('passwordIsRequired'))
            .min(3, t('atLeast3Characters')),
        confirmation: Yup.string()
            .required(t('passwordConfirmationIsRequired'))
            .oneOf([Yup.ref('password')], t('passwordMustMatch')),
    });


    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    // RTK Query mutation hook
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // try {
        //     await registerUser(data).unwrap();
        //     showEmailSent(true);
        // } catch (err: any) {
        //     console.error('Unknown error:', err);
        //     toast.error(err.data?.message || 'An unexpected error occurred');
        // }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };


    // if (emailSent) return <EmailSent />


    return (
        <div className="w-full mx-auto animate-right-svg">
            <form className="space-y-5 select-none" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-5">
                    <FormInput
                        label={`${t('nameAndSurname')}*`}
                        type='email'
                        name='email'
                        placeholder="Jhon Doe"
                        register={register}
                        errors={errors}
                    />
                    <FormInput
                        label={`${t('emailAddress')}*`}
                        type='email'
                        name='email'
                        placeholder="example@company.com"
                        register={register}
                        errors={errors}
                    />
                </div>
                <FormInput
                    label={`${t('subject')}*`}
                    type="text"
                    name='confirmation'
                    placeholder={t('subject')}
                    register={register}
                    errors={errors}
                />
                <FormInput
                    isTextarea={true}
                    label={`${t('message')}*`}
                    name='confirmation'
                    placeholder={t('message')}
                    register={register}
                    errors={errors}
                />
                <button
                    type="submit"
                    className="w-full h-[50px] font-regmed bg-primary text-white py-2 rounded-lg ring-2 ring-primary hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none focus:bg-primaryDark transition duration-200 ease-in-out transform disabled:bg-gray-400 disabled:ring-gray-400 disabled:cursor-not-allowed"
                >
                    {t('submit')}
                </button>
            </form>
        </div>
    )
}
