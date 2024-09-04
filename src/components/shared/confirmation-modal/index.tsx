import React from 'react';
import { Modal } from '../modal';


interface IConfirmationModalProps {
    visible: boolean,
    onClose: () => void,
    onConfirm: () => void,
}

export const ConfirmationModal: React.FC<IConfirmationModalProps> = (props) => {
    let { visible, onConfirm, onClose } = props;

    return (
        <Modal
            visible={visible}
            content={
                <ModalContent
                    onConfirm={onConfirm}
                    onClose={onClose}
                />
            }
            onClose={onClose}
        />
    )
}

interface IModalContent {
    onConfirm: () => void,
    onClose: () => void,
}

const ModalContent: React.FC<IModalContent> = (props) => {
    let { onConfirm, onClose } = props;

    return (
        <div className="flex flex-col max-w-[400px] items-center justify-center p-6 space-y-5 text-center">
            <h2 className="text-3xl mx-3">Are you sure ?</h2>
            <p>This action cannot be undone. Are you sure you want to confirm this action?</p>
            <div className="flex space-x-3">
                <button
                    onClick={onConfirm}
                    className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                    aria-label="Join the Race"
                >
                    Confirm
                </button>
                <button
                    onClick={onClose}
                    className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-gray-800 rounded-lg hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                    aria-label="Join the Race"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
