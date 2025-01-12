import React from 'react';
import { Modal } from '../modal';
import { useTranslations } from 'next-intl';
import Link from 'next/link';


interface IConfirmationModalProps {
    visible: boolean,
    hideButtons?: boolean,
    onClose: () => void,
    onConfirm: () => void,
}

export const TermsModal: React.FC<IConfirmationModalProps> = (props) => {
    let { visible, onConfirm, onClose } = props;

    return (
        <Modal
            visible={visible}
            content={
                <TermsModalContent {...props} />
            }
            onClose={onClose}
        />
    )
}

interface ITermsModalContent {
    hideButtons?: boolean,
    onConfirm: () => void,
    onClose: () => void,
}

const TermsModalContent: React.FC<ITermsModalContent> = (props) => {
    let { hideButtons, onConfirm, onClose } = props;

    const t = useTranslations();

    return (
        <div className="flex flex-col items-center space-y-5 text-center max-w-[800px] max-h-[800px] pt-5 pb-[100px] px-10 overflow-auto">
            <h2 className="text-2xl mx-3 font-medium">{t('privacyTitle').toUpperCase()}</h2>
            <div className="w-full flex-column items-start text-start space-y-2 font-thin">
                <p className="font-medium -ml-4">
                    <strong>1. </strong>
                    {t('pr1')}
                </p>
                <p>
                    <strong className="font-medium">1.1. </strong>
                    {t('pr11')}
                </p>
                <p>
                    <strong className="font-medium">1.2. </strong>
                    {t('pr12')}
                </p>
                <p>
                    <strong className="font-medium">1.3. </strong>
                    {t('pr13')}
                </p>
                <p>
                    <strong className="font-medium">1.4. </strong>
                    {t('pr14')}
                </p>
                <p>
                    <strong className="font-medium">1.5. </strong>
                    {t('pr15')}
                </p>
                <p>
                    <strong className="font-medium">1.6. </strong>
                    {t('pr16')}
                </p>
                <p>
                    <strong className="font-medium">1.7. </strong>
                    {t('pr17')}
                </p>
                <p>
                    <strong className="font-medium">1.8. </strong>
                    {t('pr18')}
                </p>
                <p className="font-medium -ml-4">
                    <strong className="font-medium">2. </strong>
                    {t('pr2')}
                </p>
                <p>
                    <strong className="font-medium">2.1. </strong>
                    {t('pr21')}
                </p>
                <p>
                    <strong className="font-medium">2.2. </strong>
                    {t('pr22')}
                </p>
                <p>
                    <strong className="font-medium">2.3. </strong>
                    {t('pr23')}
                </p>
                <p className="font-medium -ml-4">
                    <strong className="font-medium">3. </strong>
                    {t('pr3')}
                </p>
                <p>
                    <strong className="font-medium">3.1. </strong>
                    {t('pr31')}
                </p>
                <p>
                    <strong className="font-medium">3.2. </strong>
                    {t('pr32')}
                </p>
            </div>
            {
                hideButtons &&
                <div className="flex w-full space-x-3 absolute bg-white p-4 left-0 bottom-0 rounded-xl">
                    <button onClick={onClose} className="flex w-full text-center justify-center px-4 py-2 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        {t('close')}
                    </button>
                </div>
            }
            {
                !hideButtons &&
                <div className="flex w-full space-x-3 absolute bg-white p-4 left-0 bottom-0 rounded-xl">
                    <button onClick={onConfirm} className="flex w-full text-center justify-center px-4 py-2 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        {t('accept')}
                    </button>
                    <button onClick={onClose} className="flex w-full text-center justify-center px-4 py-2 text-primaryDark transition-all border border-primaryDark rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        {t('cancel')}
                    </button>
                </div>
            }
        </div>
    )
}
