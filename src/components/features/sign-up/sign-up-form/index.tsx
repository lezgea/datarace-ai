"use client";

import { FormInput, Modal } from '@components/shared';
import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmailIcon, EyeClosedIcon, EyeIcon } from '@assets/icons';
import { useRegisterUserMutation } from '@api/user-api';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import { EmailSent } from '../email-sent';
import { useLocale, useTranslations } from 'next-intl';


interface IFormInput {
    email: string;
    password: string;
    confirmation: string;
}


export const SignUpForm: React.FC = () => {
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
        try {
            await registerUser(data).unwrap();
            showEmailSent(true);
        } catch (err: any) {
            console.error('Unknown error:', err);
            toast.error(err.data?.message || 'An unexpected error occurred');
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };


    if (emailSent) return <EmailSent />


    return (
        <div className="w-full mx-auto lg:max-w-md animate-right-svg">
            <div>
                <Link className="flex items-center lg:hidden justify-center cursor-pointer mb-[50px]" href="/">
                    <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} priority />
                </Link>
                <h2 className="text-2xl font-semi mb-4 lg:text-start text-center">{t('registerWithEmail')}</h2>
                <p className="mb-4 text-sm text-gray-600 lg:text-start text-center">{t('enterYourEmailPasswordForSignUp')}</p>
            </div>
            <form className="space-y-5 select-none" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label={`${t('email')}*`}
                    type='email'
                    name='email'
                    placeholder="example@company.com"
                    register={register}
                    errors={errors}
                    icon={<EmailIcon />}
                />
                <FormInput
                    label={`${t('password')}*`}
                    type={showPassword ? "text" : "password"}
                    name='password'
                    placeholder={t('enterPassword')}
                    register={register}
                    errors={errors}
                    onClickIcon={togglePasswordVisibility}
                    icon={showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                />
                <FormInput
                    label={`${t('confirmPassword')}*`}
                    type={showPassword ? "text" : "password"}
                    name='confirmation'
                    placeholder={t('enterPassword')}
                    register={register}
                    errors={errors}
                    onClickIcon={togglePasswordVisibility}
                    icon={showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                />
                <div className="flex items-center pb-4 pt-1 select-none">
                    <label className="inline-flex items-center cursor-pointer">
                        {/* Hidden native checkbox */}
                        <input
                            type="checkbox"
                            className="hidden peer"
                            onChange={() => acceptTerms(!terms)}
                        />
                        {/* Custom checkbox */}
                        <span className="w-6 h-6 rounded-lg border-2 border-gray-300 flex items-center justify-center bg-white peer-checked:bg-blue-400 peer-checked:border-transparent transition-colors duration-200">
                            {/* Checkmark Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-white hidden peer-checked:block"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </label>
                    <div className="ml-2 text-gray-700 hover:text-primary underline cursor-pointer" onClick={() => setTermsModal(true)}>{t('iAcceptTermsConditions')}</div>
                </div>
                <button
                    disabled={!terms}
                    type="submit"
                    className="w-full h-[50px] font-regmed bg-primary text-white py-2 rounded-xl ring-2 ring-primary hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none focus:bg-primaryDark transition duration-200 ease-in-out transform disabled:bg-gray-400 disabled:ring-gray-400 disabled:cursor-not-allowed"
                >
                    {t('signUp')}
                </button>
                <div className="text-center my-4">{t('or')}</div>
                <Link
                    href="https://beta.datarace.ai/oauth2/authorization/google"
                    type="button"
                    className="w-full h-[50px] bg-none text-primaryLight py-2 rounded-xl hover:bg-black ring-2 ring-primaryLight hover:ring-black hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:outline-none hover:-tranneutral-y-px focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-center space-x-2 transition duration-200 ease-in-out transform animate-button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                    <span className="font-regmed">{t('registerWithGoogle')}</span>
                </Link>
            </form>
            <p className="mt-6 text-center font-light">
                {t('haveAnAccount')} <a href={`/${lng}/sign-in`} className="!text-gray-700 font-semi hover:!text-primaryLight transition duration-200 ease-in-out transform">{t('signIn')}</a>
            </p>

            <Modal
                visible={termsModal}
                content={<TermsModalContent onConfirm={() => acceptTerms(true)} onClose={() => setTermsModal(false)} />}
                onClose={() => setTermsModal(false)}
            />
        </div>
    )
}

interface ITermsModalContent {
    onConfirm: () => void,
    onClose: () => void,
}


const TermsModalContent: React.FC<ITermsModalContent> = (props) => {
    let { onConfirm, onClose } = props;

    const t = useTranslations();

    return (
        <div className="flex flex-col items-center p-6 space-y-5 text-center max-w-[800px] max-h-[800px] pt-10 pb-[100px] px-10 overflow-auto">
            <h2 className="text-2xl mx-3">MƏXFİLİYIN TƏMİN EDİLMƏSİ</h2>
            <div className="w-full flex-column items-start text-start space-y-3 font-light">
                <p>
                    <strong className="font-medium">1.</strong> Məxfilik qaydası
                </p>
                <p>
                    <strong className="font-medium">1.1.</strong> Bu Məxfilik qaydası “Elektron hərrac Portalı”ndan (bundan sonra - Portal) “İstifadəyə
                    dair razılaşma”nın ayrılmaz tərkib hissəsidir.
                </p>
                <p>
                    <strong className="font-medium">1.2.</strong>   Bu   Məxfilik   qaydası   İstifadəçinin   şəxsi   məlumatlarının   alınması,   saxlanılması,
                    işlənilməsi, istifadəsi, açılması və müdafiəsi qaydasını müəyyən edir.
                </p>
                <p>
                    <strong className="font-medium">1.3.</strong> İstifadəçinin şəxsi məlumatları - İstifadəçinin Portaldan istifadə prosesində təqdim etdiyi
                    və Portaldan istifadə prosesində avtomatik olaraq ötürülən və ya avtomatik olaraq əldə
                    edilən informasiyaların məcmusudur;
                </p>
                <p>
                    <strong className="font-medium">1.4.</strong> İstifadəçilərin şəxsi məlumatları Portalın məlumat bazasında yerləşir və saxlanılır.
                </p>
                <p>
                    <strong className="font-medium">1.5.</strong> İstifadəçilərə aid şəxsi məlumatlar bazasının sərəncamçısı Portaldır.
                </p>
                <p>
                    <strong className="font-medium">1.6.</strong> İstifadəçi qeydiyyat zamanı, Portaldan istifadə prosesində, müvafiq məlumatları, o cümlədən şəxsi məlumatları verir. Məlumatların toplanması Portalın İstifadəçiləri arasında sorğularının keçirilməsi, qanunvericilklə nəzərdə tutulan digər hallarda da həyata keçirilə bilər.
                </p>
                <p>
                    <strong className="font-medium">1.7.</strong> İstifadəçi Portala şəxsi məlumatlarını və istənilən başqa məlumatları könüllü olaraq verir (yerləşdirir). Həmin məlumatların Portal tərəfindən başqa İstifadəçilərə və (və ya) üçüncü şəxslərə ötürülməsi yalnız istifadəçinin razılığı ilə və ya qanunla nəzərdə tutulan hallarda ola bilər.
                </p>
                <p>
                    <strong className="font-medium">1.8.</strong> Şəxsi məlumatların işlənməsi həmin məlumatlarala bağlı istənilən hərəkətlərdən (onların toplanması, qeydiyyatı, saxlanması, uyğunlaşdırılması, dəyişdirilməsi, yenilənməsi, istifadəsi və yayılması, ləğv edilməsi) ibarətdir.
                </p>
                <p>
                    <strong className="font-medium">1.9.</strong> Portalın topladığı şəxsi məlumatlar habelə bu məlumatların işlənməsi hərracla bağlı həyata keçirilən fəaliyyət və istifadəçilərə göstərdiyi xidmətlərlə bağlıdır.
                </p>
                <p>
                    <strong className="font-medium">1.10.</strong> Portaldan istifadə prosesində İstifadəçilər tərəfindən verilmiş məlumatlar və şəxsi məlumatlar satılmır, istifadəyə və icarəyə verilmir.
                </p>
                <p>
                    <strong className="font-medium">1.11.</strong> İstifadəçi Portaldan istifadə prosesində verdiyi şəxsi və başqa məlumatları istənilən vaxt qismən dəyişdirmək, silmək və ya ona başqa üsulla düzəliş etmək imkanına malikdir.
                </p>
                <p>
                    <strong className="font-medium">1.12.</strong> İstifadəçi Portala verdiyi (daxil etdiyi) istənilən məlumatların dəqiqliyi və düzgünlüyü üçün məsuliyyət daşıyır.
                </p>
                <p>
                    <strong className="font-medium">1.13.</strong> Portal, istifadəçinin şəxsi məlumatlarının üçüncü şəxslərin icazəsiz girişindən müdafiəsi üçün bütün səmərəli tədbirləri görür.
                </p>
                <p>
                    <strong className="font-medium">1.14.</strong> Portal tərəfindən toplanmış və işlənmiş bütün şəxsi məlumatlar bir və ya bir neçə qorunan şəbəkədən kənarda giriş olmayan serverdə saxlanılır. Portal istifadəçilərin şəxsi və başqa məlumatlarına giriş və onlardan istifadə səlahiyyəti olan bütün əməkdaşları bu məlumatların üçüncü şəxslərə yayılmaması haqqında razılaşma imzalamışlar.
                </p>
                <p>
                    <strong className="font-medium">1.15.</strong> Portalın istifadəçisi şəxsi məlumatlarının Portaldan silinməsinə dair ərizə göndərə bilər. Belə bir ərizə olduqda, həmin İstifadəçi haqqında toplanan bütün şəxsi məlumatlar silinəcək.
                </p>
                <p className="text-red">
                    <strong className="font-medium">1.16.</strong> Portal informasiyanın saxlanılması üçün cookies fayllarından, veb-mayaklardan və başqa oxşar texnologiyalardan istifadə edə bilər. Bu fayllar veb-saytın və onun əlavələrinin istifadəsini yüngülləşdirmək məqsədi ilə, Portalın xidmətlərinin keyfiyyətinin artırılması məqsədi ilə (həmçinin təhlükəsizlik), həmçinin reklam məqsədi ilə istifadə olunur.
                </p>
                <p>
                    <strong className="font-medium">1.17.</strong> Portalda olan texniki xarakterli informasiya, məsələn, ip-ünvanlar, Servis tərəfindən şəbəkə avadanlığının xidməti üçün, həmçinin statistik və başqa informasiyanın ümumiləşdirilməsi üçün istifadə olunur.
                </p>
                <p>
                    <strong className="font-medium">1.18.</strong> Portala göstərilən xidmətlərin istifadəçinin fərdi ehtiyaclarına və maraqlarına uyğun olmaqla yüksək keyfiyyətini təmin etmək məqsədi ilə Portal istifadəçinin sistemə son girişinin məlumatlarını saxlayır.
                </p>
                <p>
                    <strong className="font-medium">2.</strong> Məxfilik qaydasına dəyişikliklərin daxil etməsi
                </p>
                <p>
                    <strong className="font-medium">2.1.</strong> Portal Məxfilik qaydasına dəyişikliklər edə və onları yeniləyə bilər.
                </p>
                <p>
                    <strong className="font-medium">2.2.</strong> Əgər İstifadəçi daxil edilmiş dəyişikliklərlə razı deyilsə, o Portaldan istifadəni dayandıra bilər. Əgər İstifadəçi Portaldan istifadə etməyə davam edirsə, o, dəyişiklilərlə razılaşmış sayılır və bütün dəyişiklikləri və Məxfilik qaydasının yeni redaksiyasını bütövlükdə qəbul etmiş hesab edilir.
                </p>
            </div>
            <div className="flex w-full space-x-3 absolute bg-white p-4 bottom-0">
                <button onClick={onConfirm} className="flex w-full text-center justify-center px-4 py-2 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                    {t('accept')}
                </button>
                <button onClick={onClose} className="flex w-full text-center justify-center px-4 py-2 text-primaryDark transition-all border border-primaryDark rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                    {t('cancel')}
                </button>
            </div>
        </div>
    )
}