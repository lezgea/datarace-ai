import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { UserProfile } from '../user-profile';
import { useLogoutUserMutation } from '@api/user-api';

// Mocking necessary hooks and modules
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@api/user-api', () => ({
    useLogoutUserMutation: jest.fn(),
}));

describe('UserProfile Component', () => {
    const mockRouterPush = jest.fn();
    const mockDispatch = jest.fn();
    const mockLogoutUser = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        (useLogoutUserMutation as jest.Mock).mockReturnValue([mockLogoutUser, { isLoading: false, isError: false }]);
    });

    it('should render the skeleton when loading', () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            user: null,
            isAuthenticated: false,
            loading: true,
        });

        const { asFragment } = render(<UserProfile />);

        expect(screen.getByTestId('user-profile-skeleton')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render user profile and dropdown when authenticated', () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            user: { fullName: 'John Doe', profileImage: null },
            isAuthenticated: true,
            loading: false,
        });

        const { asFragment } = render(<UserProfile />);

        const userName = screen.getByText('John Doe');
        expect(userName).toBeInTheDocument();
        const dropdownTrigger = screen.getByRole('img', { name: 'Avatar' });
        expect(dropdownTrigger).toBeInTheDocument();
        fireEvent.click(dropdownTrigger);
        const signOutButton = screen.getByText('Sign Out');
        expect(signOutButton).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

});