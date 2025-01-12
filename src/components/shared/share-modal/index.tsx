"use client";

import React from 'react';
import { Modal } from '../modal';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TelegramIcon,
    TelegramShareButton,
    LinkedinIcon,
    LinkedinShareButton
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyIcon } from '@assets/icons';


interface IShareModalProps {
    visible: boolean,
    title: string,
    shareUrl: string,
    onClose: () => void,
    onSignUp?: () => void,
    onConfirm?: () => void,
}

export const ShareModal: React.FC<IShareModalProps> = (props) => {
    let { visible, title, shareUrl, onConfirm, onClose, onSignUp } = props;

    return (
        <Modal
            visible={visible}
            content={
                <ModalContent
                    title={title}
                    shareUrl={shareUrl}
                    onConfirm={onConfirm}
                    onClose={onClose}
                    onSignUp={onSignUp}
                />
            }
            onClose={onClose}
        />
    )
}

interface IModalContent {
    title: string,
    shareUrl: string,
    onConfirm?: () => void,
    onSignUp?: () => void,
    onClose: () => void,
}

const ModalContent: React.FC<IModalContent> = (props) => {
    const t = useTranslations();
    const lng = useLocale();
    const [copied, setCopied] = React.useState<boolean>(false);

    let { title, shareUrl, onConfirm, onClose, onSignUp } = props;
    const router = useRouter();

    React.useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 4000)
        }
    }, [copied])

    return (
        <div className="flex flex-col md:min-w-[500px] items-center justify-center p-10 text-center">
            <h2 className="text-3xl mx-3">Share this blog</h2>
            {/* <p className='font-light'>For this action authentification is required. Please login to continue</p> */}
            <div className='flex gap-3 py-5'>
                <WhatsappShareButton url={shareUrl} title={title}>
                    <WhatsappIcon size={50} round />
                </WhatsappShareButton>

                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={50} round />
                </FacebookShareButton>

                <TelegramShareButton url={shareUrl} title={title}>
                    <TelegramIcon size={50} round />
                </TelegramShareButton>

                <LinkedinShareButton url={shareUrl} title={title}>
                    <LinkedinIcon size={50} round />
                </LinkedinShareButton>
            </div>

            <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)}>
                <div className='w-full flex items-center relative'>
                    <input
                        disabled
                        placeholder={shareUrl}
                        className={`w-full h-[50px] px-5 py-2 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryLight transition duration-200 ease-in-out transform`}
                    />
                    <CopyIcon className='h-[25px] w-[25px] absolute right-3 fill-gray-500 hover:fill-primary cursor-pointer' />
                </div>
            </CopyToClipboard>
            {
                copied &&
                <div className='flex w-full items-center justify-center text-center bg-primaryExtra text-primary rounded-xl py-2 mt-3'>
                    Copied to Clipboard
                </div>
            }
        </div>
    )
}
