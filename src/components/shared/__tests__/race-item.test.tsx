import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RaceItem from '../race-item';
import { ArrowGreenIcon, BookmarkIcon } from "@assets/icons";
import Image from "next/image";
import Link from "next/link";


jest.mock('next/image', () => (props: any) => {
    const { priority, ...rest } = props;
    return <img {...rest} alt={props.alt} />
});
jest.mock('@assets/icons', () => ({
    ArrowGreenIcon: () => <svg data-testid="arrow-icon" />,
    BookmarkIcon: () => <svg data-testid="bookmark-icon" />,
}));

describe('RaceItem Component', () => {
    const props = {
        title: 'Test Race',
        description: 'This is a test description for the race.',
        img: '/path/to/image.jpg',
        price: '$50',
        expiry_date: '2024-12-31',
    };

    it('renders the RaceItem component with provided props', () => {
        render(<RaceItem {...props} />);

        expect(screen.getByText('Test Race')).toBeInTheDocument();
        expect(screen.getByText('This is a test description for the race.')).toBeInTheDocument();
        expect(screen.getByText('$50')).toBeInTheDocument();
        expect(screen.getByAltText('Test Race')).toHaveAttribute('src', '/path/to/image.jpg');
    });

    it('renders the "Ends in 2 days" message', () => {
        render(<RaceItem {...props} />);
        expect(screen.getByText('Ends in 2 days')).toBeInTheDocument();
    });

    it('renders the BookmarkIcon and ArrowGreenIcon', () => {
        render(<RaceItem {...props} />);

        expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
        expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
    });

    it('has a link that navigates to the correct URL', () => {
        render(<RaceItem {...props} />);
        const linkElement = screen.getByRole('link');

        expect(linkElement).toHaveAttribute('href', '/races/124325t');
    });

    it('applies hover and active styles correctly', () => {
        render(<RaceItem {...props} />);
        const arrowIconContainer = screen.getByTestId('arrow-icon').parentElement;

        expect(arrowIconContainer).toHaveClass('transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:border-primaryLight group-active:scale-100');
    });

    it('matches the snapshot', () => {
        const { asFragment } = render(<RaceItem {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
