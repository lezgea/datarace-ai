import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../footer';
import { usePathname } from 'next/navigation';

// Mock the dynamic imports
jest.mock('next/dynamic', () => () => (props: any) => <div>{props.children}</div>);

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Footer Component', () => {
    it('should render the footer when the pathname is not in hideHeaderRoutes', () => {
        (usePathname as jest.Mock).mockReturnValue('/some-route');

        render(<Footer />);

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        expect(screen.getByText('DataRace')).toBeInTheDocument();
    });

    it('should not render the footer when the pathname is in hideHeaderRoutes', () => {
        (usePathname as jest.Mock).mockReturnValue('/sign-in');

        render(<Footer />);

        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('should render the company links', () => {
        (usePathname as jest.Mock).mockReturnValue('/some-route');

        render(<Footer />);

        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('FAQ')).toBeInTheDocument();
        expect(screen.getByText('Terms and privacy policy')).toBeInTheDocument();
    });

    it('should render the social media icons', () => {
        (usePathname as jest.Mock).mockReturnValue('/some-route');

        render(<Footer />);

        expect(screen.getByLabelText('Instagram page')).toBeInTheDocument();
        expect(screen.getByLabelText('Twitter page')).toBeInTheDocument();
        expect(screen.getByLabelText('YouTube page')).toBeInTheDocument();
        expect(screen.getByLabelText('LinkedIn page')).toBeInTheDocument();
    });
});
