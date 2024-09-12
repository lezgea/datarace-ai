"use client";

import React from 'react';
import { CompetitionInfoRightSkeleton, Modal } from '@components/shared';
import { CertificateIcon, CheckFilledIcon, CoinsIcon, RaceFlag } from '@assets/icons';
import { RacesSidebar } from '../races-sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useJoinCompetitionMutation } from '@api/competition-api';
import { toast } from 'react-toastify';


interface IRightContentProps {
    raceId: number | string,
}

export const RigthContent: React.FC<IRightContentProps> = (props) => {
    let { raceId } = props;

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [selectedOption, setSelectedOption] = React.useState<string>('option1');
    const [isSidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

    const { loading: competitionLoading, competitionInfo } = useSelector((state: RootState) => state.competitions);
    const [joinCompetition, { data, isError, isLoading }] = useJoinCompetitionMutation();

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const onJoinTheRace = async () => {
        try {
            await joinCompetition({ id: raceId }).unwrap();
            setShowModal(false);
        } catch (error: any) {
            if (error.data) {
                toast.error(error.data?.message || 'Failed to join competition', { position: "bottom-left" });
            } else if (error.error) {
                toast.error(error.error || 'Failed to join competition', { position: "bottom-left" });
            } else {
                toast.error('Failed to join competition', { position: "bottom-left" });
            }
            setShowModal(false);
        }
    }

    if (competitionLoading) return <CompetitionInfoRightSkeleton />

    return (
        <div>
            <div className="space-y-7">
                {/* Prize */}
                <div className="space-y-2 mb-auto">
                    <div className="flex space-x-3 mb-5">
                        <div className="h-[30px] w-[2px] bg-primaryLight" />
                        <span className="text-xl font-medium">Prize</span>
                    </div>
                    <div className="inline-flex items-center border border-primaryLight bg-primaryExtra rounded-xl px-6 py-4 space-x-3">
                        <CoinsIcon />
                        <p className="text-xl font-regmed text-primary">{competitionInfo?.currencySymbol} {competitionInfo?.awardAmount}</p>
                    </div>
                    <div className="inline-flex items-center border border-primaryLight bg-primaryExtra rounded-xl px-6 py-4 space-x-3">
                        <CertificateIcon />
                        <p className="text-md text-primary">Award points & Medals</p>
                    </div>
                </div>

                {/* Tags */}
                {/* <div className="space-y-2">
                    <div className="flex space-x-3 mb-5">
                        <div className="h-[30px] w-[2px] bg-primaryLight" />
                        <span className="text-xl font-medium">Tags</span>
                    </div>
                    <div className="space-y-2">
                        <div className="inline-block text-sm px-4 py-2 text-[1rem] rounded-full border border-dark space-x-2 mr-2">
                            <span className="text-primaryLight">#</span>
                            <span>Languages</span>
                        </div>
                        <div className="inline-block text-sm px-4 py-2 text-[1rem] rounded-full border border-dark space-x-2 mr-2">
                            <span className="text-primaryLight">#</span>
                            <span>Learn</span>
                        </div>
                        <div className="inline-block text-sm px-4 py-2 text-[1rem] rounded-full border border-dark space-x-2 mr-2">
                            <span className="text-primaryLight">#</span>
                            <span>Log loss</span>
                        </div>
                    </div>
                </div> */}

                {/* Table of Content */}
                {/* <div className="flex flex-col space-y-3">
                    <div className="flex space-x-3 mb-3">
                        <div className="h-[30px] w-[2px] bg-primaryLight" />
                        <span className="text-xl font-medium">Table of content</span>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            className="h-4 w-4 text-primary"
                            name="option"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2 text-gray-700">Description</span>
                    </label>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            className="h-4 w-4 text-primary"
                            name="option"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2 text-gray-700">Evaluation</span>
                    </label>

                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="radio"
                            className="h-4 w-4 text-primary"
                            name="option"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2 text-gray-700">FAQ</span>
                    </label>
                </div> */}

                {/* Join Button */
                    // competitionInfo?.joinAvailable &&
                    // <button
                    //     onClick={() => setShowModal(true)}
                    //     className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                    //     aria-label="Join the Race"
                    // >
                    //     Join the Race
                    // </button>
                }
                {/* Upload Soulution Button */
                    // competitionInfo?.uploadAvailable &&
                    // <button
                    //     onClick={() => setSidebarOpen(true)}
                    //     className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                    //     aria-label="Join the Race"
                    // >
                    //     Upload the Solution
                    // </button>
                }
                {/* Submittion Notification for submitted users */
                    // !competitionInfo?.joinAvailable &&
                    // !competitionInfo?.uploadAvailable &&
                    <div className="flex align-center justify-center space-x-3 pt-10">
                        <CheckFilledIcon className="w-10 h-10" />
                        <span className="text-sm text-gray-500">You have already submitted your solution for this competition</span>
                    </div>
                }
            </div>
            <Modal
                visible={showModal}
                content={<ModalContent onConfirm={onJoinTheRace} />}
                onClose={() => setShowModal(false)}
            />
            <RacesSidebar
                visible={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
        </div>
    )
}


interface IModalContent {
    onConfirm: () => void,
}

const ModalContent: React.FC<IModalContent> = (props) => {
    let { onConfirm } = props;

    return (
        <div className="flex flex-col max-w-[400px] items-center justify-center p-6 space-y-5 text-center">
            <RaceFlag />
            <h2 className="text-3xl mx-3">You’re going to join the race</h2>
            <p>To join the race you have to read the conditions and accept them.</p>
            <button
                onClick={onConfirm}
                className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                aria-label="Join the Race"
            >
                Continue
            </button>
        </div>
    )
}