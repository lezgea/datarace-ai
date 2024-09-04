import { ExpandableInfoSection } from '@components/shared';
import React from 'react';


interface IAboutSectionProps {
    title: string,
    description?: string,
}

export const AboutSection: React.FC<IAboutSectionProps> = (props) => {
    let { title, description } = props;

    return (
        <section className="py-5 space-y-2">
            <h2 className="text-2xl mb-5 font-regmed">&#8226; {title}</h2>
            <p className="space-y-5 select-none font-light">
                Arcu dictumst ac imperdiet egestas scelerisque dui vitae turpis purus. Dui dui vel ultricies augue consectetur dignissim lectus senectus at. Placerat nulla pretium commodo lobortis nunc. Aliquam etiam pretium dictum mi arcu et a bibendum magna. Nec ac sed donec egestas nunc. Nisl vel lectus velit eu ac. Vestibulum justo faucibus arcu sodales cras placerat sagittis. Eros ut justo ullamcorper risus. Lectus feugiat ipsum neque viverra eget bibendum. Nisl et ipsum aenean pellentesque. Nunc quam urna mauris scelerisque malesuada aenean.
                Turpis sed pretium sit magna. Nulla feugiat est nisl purus eros. Sagittis tempor accumsan id vitae ut. Facilisis tortor sed lacus est gravida. Arcu dictumst ac imperdiet egestas scelerisque dui vitae turpis purus. Dui dui vel ultricies augue consectetur dignissim lectus senectus at. Placerat nulla pretium commodo lobortis nunc. Aliquam etiam pretium dictum mi arcu et a bibendum magna. Nec ac sed donec egestas nunc. Nisl vel lectus velit eu ac. Vestibulum justo faucibus arcu sodales cras placerat sagittis. Eros ut justo ullamcorper risus. Lectus feugiat ipsum neque viverra eget bibendum. Nisl et ipsum aenean pellentesque. Nunc quam urna mauris scelerisque malesuada aenean.
                Turpis sed pretium sit magna. Nulla feugiat est nisl purus eros. Sagittis tempor accumsan id vitae ut. Facilisis tortor sed lacus est gravida
            </p>
        </section>
    )
}