import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Header } from '../header';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Header Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the header on non-authentication routes', () => {
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<Header />);

        expect(screen.getByAltText('Logo')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Courses')).toBeInTheDocument();
        expect(screen.getByText('Community')).toBeInTheDocument();
        expect(screen.getByText('FAQ')).toBeInTheDocument();
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    it('should hide the header on sign-in route', () => {
        (usePathname as jest.Mock).mockReturnValue('/sign-in');

        render(<Header />);

        expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
        expect(screen.queryByText('About Us')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    });

    it('should hide the header on sign-up route', () => {
        (usePathname as jest.Mock).mockReturnValue('/sign-up');

        render(<Header />);

        expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
        expect(screen.queryByText('About Us')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    });

    it('should render the Sign In button correctly', () => {
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<Header />);

        const signInButton = screen.getByText('Sign In');
        expect(signInButton).toBeInTheDocument();
    });
});
