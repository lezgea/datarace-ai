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
            <ExpandableInfoSection
                title="What is Datarace?"
                description="Datarace is a platform specifically focused on artificial intelligence competitions. It is designed to bring together data scientists and AI enthusiasts to engage in and excel at AI-driven challenges."
            />
            <ExpandableInfoSection
                title="Who can participate in Datarace competitions?"
                description="Datarace is open to all AI enthusiasts, students, and professionals. Whether you're just starting in AI or have years of experience, you can join the competitions and showcase your skills."
            />
            <ExpandableInfoSection
                title="How do I join a Datarace competition?"
                description="To join a competition on Datarace, simply create an account on our platform, browse the available challenges, and register for the ones you're interested in. Detailed instructions and guidelines are provided for each competition to help you get started."
            />
            <ExpandableInfoSection
                title="What kind of AI challenges are hosted on Datarace?"
                description="Datarace hosts a diverse range of AI challenges, including predictive analytics, machine learning model development, and other data-driven problems. Each challenge is designed to test and enhance different aspects of AI expertise."
            />
            <ExpandableInfoSection
                title="Are there any fees to participate in the competitions?"
                description="Participation in Datarace competitions is generally free."
            />
            <ExpandableInfoSection
                title="What are the prizes for winning a competition?"
                description="Datarace offers attractive prizes for top performers in its competitions. Prizes may include cash or other valuable incentives. Details about the prizes for each competition are provided in the competition description."
            />
            <ExpandableInfoSection
                title="Can I participate in multiple competitions at the same time?"
                description="Yes, you can participate in multiple competitions simultaneously on Datarace. We encourage you to explore different challenges and apply your skills across various areas of AI."
            />
            <ExpandableInfoSection
                title="Do I need to be an AI expert to compete on Datarace?"
                description="No, you do not need to be an AI expert to compete on Datarace. Our competitions are designed for a range of skill levels, from beginners to advanced practitioners. We provide resources and support to help you improve and succeed."
            />
            <ExpandableInfoSection
                title="How are the winners of competitions selected?"
                description="Winners of Datarace competitions are selected based on the performance and accuracy of their solutions. Each competition has specific evaluation criteria and judging processes, which are outlined in the competition rules."
            />
            <ExpandableInfoSection
                title="What resources or support does Datarace provide to help participants?"
                description="Datarace offers a variety of resources and support to help participants, including access to datasets, tutorials, and community forums. Participants can also connect with mentors for advice and collaboration."
            />
        </section>
    )
}