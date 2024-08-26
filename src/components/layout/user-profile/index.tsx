import { UserProfileSkeleton } from '@components/shared';
import { Dropdown } from '@components/shared/dropdown';
import { useAuth } from 'hooks/use-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface IUserProfileProps {
    name: string,
    image: string,
}

const DROPDOWN_MENU: { route: string; label: string }[] = [
    { route: '/profile', label: 'Profile' },
    { route: '/races', label: 'Races' },
];


export const UserProfile: React.FC<IUserProfileProps> = (props) => {
    let { name, image } = props;
    const { isLogged, isLoading } = useAuth();


    if (isLoading) return <UserProfileSkeleton />

    // shows Sign In button if user is not logged in
    if (!isLogged && !isLoading)
        return (
            <Link href="/sign-in">
                <button type="button" className="inline-flex w-auto text-center items-center px-5 py-2 text-white transition-all bg-primary dark:bg-white dark:text-gray-800 rounded-lg shadow-md shadow-neutral-300 sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                    Sign In
                </button>
            </Link>
        );


    return (
        <Dropdown
            width={80}
            items={DROPDOWN_MENU}
            button={
                <button className="flex w-full text-sm text-medium text-center justify-center px-5 py-2 text-gray-500 transition-all bg-gray-100 dark:bg-white dark:text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none focus:bg-blue-500">
                    Sign Out
                </button>
            }
        >
            <div className="flex items-center cursor-pointer group select-none">
                <div className="font-regmed mr-3 group-hover:text-blue-400 transition-all duration-200 ease-in-out">{name}</div>
                <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden border border-bg-gray-200">
                    <Image
                        src={image}
                        alt="Avatar"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </Dropdown>

    );
}


