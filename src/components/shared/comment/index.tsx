import { IDatasetComment } from '@api/types/dataset-types';
import Image from 'next/image';
import React from 'react';


interface ICommmentProps extends IDatasetComment { }


export const Comment: React.FC<ICommmentProps> = (props) => {
    let { text, fullName, nickname, userImageUrl } = props;

    return (
        <div className="inline-flex gap-2">
            <div className="relative w-[35px] h-[35px] min-w-[35px] min-h-[35px] rounded-full overflow-hidden">
                <Image
                    src={userImageUrl || "/png/user.png"}
                    alt="Avatar"
                    fill={true}
                    className="object-cover"
                    priority={true}
                />
            </div>
            <div className="inline-flex flex-col bg-[#F0F2F5] border border-[#F1F3F5] px-4 py-3 gap-1 rounded-3xl max-w-[300px] md:max-w-[50%]">
                <strong className="font-medium">{fullName || nickname}</strong>
                <div className="text-gray-800 break-words">{text}</div>
            </div>
        </div>
    )
}
