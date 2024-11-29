import { ExpandableInfoSection } from '@components/shared';
import { useTranslations } from 'next-intl';
import React from 'react';


interface IHelpSectionProps {
    title?: string,
    items?: [{ title: string, description: string }],
}

export const HelpSection: React.FC<IHelpSectionProps> = (props) => {
    let { title, items } = props;
    const t = useTranslations();

    return (
        <section className="py-10 space-y-2">
            {
                !!title &&
                <h2 className="text-2xl mb-5 font-regmed">&#8226; {title}</h2>
            }
            <ExpandableInfoSection
                title={t('faqTitle1')}
                description={t('faqDescription1')}
            />
            <ExpandableInfoSection
                title={t('faqTitle2')}
                description={t('faqDescription2')}
            />
            <ExpandableInfoSection
                title={t('faqTitle3')}
                description={t('faqDescription3')}
            />
            <ExpandableInfoSection
                title={t('faqTitle4')}
                description={t('faqDescription4')}
            />
            <ExpandableInfoSection
                title={t('faqTitle5')}
                description={t('faqDescription5')}
            />
            <ExpandableInfoSection
                title={t('faqTitle6')}
                description={t('faqDescription6')}
            />
            <ExpandableInfoSection
                title={t('faqTitle7')}
                description={t('faqDescription7')}
            />
            <ExpandableInfoSection
                title={t('faqTitle8')}
                description={t('faqDescription8')}
            />
            <ExpandableInfoSection
                title={t('faqTitle9')}
                description={t('faqDescription9')}
            />
            <ExpandableInfoSection
                title={t('faqTitle10')}
                description={t('faqDescription10')}
            />
        </section>
    )
}