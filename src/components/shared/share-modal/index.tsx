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
    TwitterShareButton,
    TwitterIcon,
} from 'react-share';


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

    let { title, shareUrl, onConfirm, onClose, onSignUp } = props;
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-3xl mx-3 mb-2">Share this blog</h2>
            {/* <p className='font-light'>For this action authentification is required. Please login to continue</p> */}
            <div className='flex gap-5 pt-5'>
                <WhatsappShareButton url={shareUrl} title={title}>
                    <WhatsappIcon size={50} round />
                </WhatsappShareButton>

                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={50} round />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={50} round />
                </TwitterShareButton>
            </div>
        </div>
    )
}
