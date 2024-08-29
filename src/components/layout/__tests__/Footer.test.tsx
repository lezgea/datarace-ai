import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Footer } from '../footer';
import { usePathname } from 'next/navigation';

// Mock the dynamic imports for the icons
jest.mock('@assets/icons', () => ({
    InstagramIcon: () => <svg data-testid="instagram-icon" />,
    TwitterIcon: () => <svg data-testid="twitter-icon" />,
    YoutubeIcon: () => <svg data-testid="youtube-icon" />,
    LinkedinIcon: () => <svg data-testid="linkedin-icon" />,
    LogoWhite: () => <svg data-testid="logo-white" />,
}));

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Footer component', () => {
    beforeEach(() => {
        // Reset the mock implementation before each test
        (usePathname as jest.Mock).mockReturnValue('/');
    });

    test('renders the footer with all sections and icons', () => {
        render(<Footer />);

        // Check that the logo is rendered
        expect(screen.getByTestId('logo-white')).toBeInTheDocument();

        // Check that the social media icons are rendered
        expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
        expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
        expect(screen.getByTestId('youtube-icon')).toBeInTheDocument();
        expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();

        // Check that the company links are rendered
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('FAQ')).toBeInTheDocument();
        expect(screen.getByText('Terms and privacy policy')).toBeInTheDocument();

        // Check that the races links are rendered
        expect(screen.getByText('Active races')).toBeInTheDocument();
        expect(screen.getByText('Courses')).toBeInTheDocument();

        // Check that the contact information links are rendered
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Address')).toBeInTheDocument();

        // Check that the text "DataRace" is rendered
        expect(screen.getByText('DataRace')).toBeInTheDocument();
    });

    test('does not render the footer on sign-in and sign-up routes', () => {
        // Mock the pathname to be "/sign-in"
        (usePathname as jest.Mock).mockReturnValue('/sign-in');
        const { container } = render(<Footer />);
        expect(container.firstChild).toBeNull();

        // Mock the pathname to be "/sign-up"
        (usePathname as jest.Mock).mockReturnValue('/sign-up');
        const { container: container2 } = render(<Footer />);
        expect(container2.firstChild).toBeNull();
    });

    test('renders the footer on non-sign-in/sign-up routes', () => {
        // Mock the pathname to be "/other-route"
        (usePathname as jest.Mock).mockReturnValue('/other-route');
        render(<Footer />);

        // Check that the footer is rendered
        expect(screen.getByTestId('logo-white')).toBeInTheDocument();
    });
});
