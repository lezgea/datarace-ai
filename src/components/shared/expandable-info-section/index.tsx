"use client";
import React from 'react';
import { MinusIcon, PlusIcon } from '@assets/icons';


interface IExpandableInfoSectionProps {
    title: string,
    description: string,
}

export const ExpandableInfoSection: React.FC<IExpandableInfoSectionProps> = (props) => {
    let { title, description } = props;
    const [expanded, setExpand] = React.useState<boolean>(false);

    return (
        <div className="border border-gray-100 rounded-2xl px-5 py-4 space-y-5 select-none bg-gray-50">
            <div className="flex cursor-pointer" onClick={() => setExpand(!expanded)}>
                <span className="w-full text-lg text-primary font-medium">{title}</span>
                {expanded ? <MinusIcon /> : <PlusIcon />}
            </div>
            {expanded && <p className="font-light">{description}</p>}
        </div>
    )
}