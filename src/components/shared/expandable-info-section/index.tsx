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
        <div className="border rounded-2xl px-5 py-4 space-y-5 select-none">
            <div className="flex cursor-pointer" onClick={() => setExpand(!expanded)}>
                <span className="w-full text-lg font-regmed">{title}</span>
                {expanded ? <MinusIcon /> : <PlusIcon />}
            </div>
            {expanded && <p className="font-light">{description}</p>}
        </div>
    )
}