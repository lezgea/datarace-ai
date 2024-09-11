import { ExpandableInfoSection } from '@components/shared';
import React from 'react';


interface IAboutSectionProps {
    title?: string,
    description?: string,
}

export const AboutSection: React.FC<IAboutSectionProps> = (props) => {
    let { title, description } = props;

    return (
        <section className="py-5 space-y-2">
            {
                title &&
                <h2 className="text-2xl mb-5 font-regmed">&#8226; {title}</h2>
            }
            <p className="space-y-5 select-none font-light">{description}</p>
        </section>
    )
}