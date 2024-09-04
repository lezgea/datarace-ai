import { ExpandableInfoSection } from '@components/shared';
import React from 'react';


interface IHelpSectionProps {
    title: string,
    items?: [{ title: string, description: string }],
}

export const HelpSection: React.FC<IHelpSectionProps> = (props) => {
    let { title, items } = props;

    return (
        <section className="py-5 space-y-2">
            <h2 className="text-2xl mb-5 font-regmed">&#8226; {title}</h2>
            {
                [...Array(4)].map((item, index) =>
                    <ExpandableInfoSection
                        key={index}
                        title="I need help about my account"
                        description="Arcu dictumst ac imperdiet egestas scelerisque dui vitae turpis purus. Dui dui vel ultricies augue consectetur dignissim lectus senectus at. Placerat nulla pretium commodo lobortis nunc. Aliquam etiam pretium dictum mi arcu et a bibendum magna. Nec ac sed donec egestas nunc. Nisl vel lectus velit eu ac. Vestibulum justo faucibus arcu sodales cras placerat sagittis. Eros ut justo ullamcorper risus. Lectus feugiat ipsum neque viverra eget bibendum. Nisl et ipsum aenean pellentesque. Nunc quam urna mauris scelerisque malesuada aenean."
                    />
                )
            }
        </section>
    )
}