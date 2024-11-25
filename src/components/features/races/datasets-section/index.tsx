"use client";

import React from 'react';
import Cookies from 'js-cookie';
import { useLocale, useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/navigation';
import { RootState } from '@store/store';
import { useLazyGetDatasetQuery } from '@api/upload-api';
import { AuthModal, CompetitionInfoSectionSkeleton, NoData } from '@components/shared';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || '';


export const DatasetsSection: React.FC = () => {
    const lng = useLocale();
    const router = useRouter();

    const [isClient, setIsClient] = React.useState<boolean>(false);
    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const { loading: competitionLoading, competitionInfo } = useSelector((state: RootState) => state.competitions);
    const [triggerGetDataset, { data: dataSet, error, isLoading }] = useLazyGetDatasetQuery();


    const handleDownload = async (fileName: string, dataFileId: number, fileType: string) => {
        if (isAuthenticated) {
            try {
                const token = Cookies.get('dtr-token');
                const response = await fetch(BASE_URL + `/files/download/data/${dataFileId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'text/csv', // Update to the appropriate content type for CSV
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to download the file');
                }

                const blob = await response.blob();
                saveAs(blob, `${fileName}.${fileType}`); // Change the file extension to .csv
            } catch (error) {
                console.error('Error downloading the file:', error);
            }
        } else {
            setShowAuthModal(true);
        }
    };


    React.useEffect(() => {
        triggerGetDataset({
            competitionId: competitionInfo?.id
        }).then((res) => { });
    }, [currentPage, triggerGetDataset, competitionInfo?.id]);


    React.useEffect(() => {
        setCurrentPage(0);
    }, []);


    React.useEffect(() => {
        setIsClient(true);  // This ensures the code runs only on the client side
    }, []);


    if (!isClient) return null; // Avoid rendering on the server to prevent mismatch


    if (!competitionLoading && !isLoading && !dataSet?.length) {
        return <NoData />
    }

    return (
        <React.Suspense fallback={<CompetitionInfoSectionSkeleton />}>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-600 rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <thead className="text-gray-600">
                        <tr>
                            <th className="py-3 px-6 text-left font-semibold">Id</th>
                            <th className="py-3 px-6 text-left font-semibold">Filename</th>
                            <th className="py-3 px-6 text-left font-semibold"></th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {dataSet?.map((row, index) => (
                            <tr
                                key={row.dataFileId}
                                className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                            >
                                <td className="py-3 px-6">{row.dataFileId}</td>
                                <td className="w-full py-3 px-6">{row.fileName}</td>
                                <td
                                    className="py-3 px-6 text-primary hover:text-primaryLight cursor-pointer"
                                    onClick={() => handleDownload(row.fileName, row.dataFileId, row.extension)}
                                >
                                    Download
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AuthModal
                visible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSignUp={() => router.push(`/${lng}/sign-up`)}
                onConfirm={() => router.push(`/${lng}/sign-in`)}
            />
        </React.Suspense>
    )
}
